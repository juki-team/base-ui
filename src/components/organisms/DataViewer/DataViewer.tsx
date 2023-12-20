import { consoleWarn, DataViewMode, Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { classNames, showOfDateDisplayType } from '../../../helpers';
import { useJukiRouter, useJukiUI, useT } from '../../../hooks';
import { RequestFilterType, RequestSortType } from '../../../types';
import { OptionType } from '../../molecules';
import {
  FILTER_DATE,
  FILTER_DATE_AUTO,
  FILTER_DATE_RANGE,
  FILTER_DATE_RANGE_AUTO,
  FILTER_SELECT,
  FILTER_SELECT_AUTO,
  FILTER_TEXT,
  FILTER_TEXT_AUTO,
} from './constants';
import { DisplayDataViewer } from './DisplayDataViewer';
import { DataViewerProps, FilterValuesType, TableHeadersType } from './types';
import {
  getPageKey,
  getPageSizeKey,
  isFilterDateAutoOffline,
  isFilterDateOffline,
  isFilterDateOnline,
  isFilterDateRangeAutoOffline,
  isFilterDateRangeOffline,
  isFilterDateRangeOnline,
  isFilterSelectAutoOffline,
  isFilterSelectOffline,
  isFilterSelectOnline,
  isFilterTextAutoOffline,
  isFilterTextOffline,
  isFilterTextOnline,
  isSortOffline,
  isSortOnline,
} from './utils';

const DEFAULT_PICKER_TYPE = 'year-month-day-hours-minutes-seconds';

function getTextWidth(text: string, font: string) {
  // re-use canvas object for better performance
  // @ts-ignore
  const canvas: HTMLCanvasElement = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 0;
}

export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => {
  
  const {
    cards,
    cardsView = true,
    className = '',
    data,
    extraNodes,
    headers,
    initialViewMode: _initialViewMode,
    name = '',
    request,
    rows,
    rowsView = true,
    setLoaderStatusRef,
    refreshRef,
    pagination,
    getRecordKey,
    getPageQueryParam = getPageKey,
    getPageSizeQueryParam = getPageSizeKey,
    getSortQueryParam = (name) => name ? name + '.sort' : 'sort',
    getFilterQueryParam = (name) => name ? name + '.filter' : 'filter',
    getViewModeQueryParam = (name) => name ? name + '.viewMode' : 'viewMode',
    getShowFilterDrawerQueryParam = (name) => name ? name + '.showFilterDrawer' : 'showFilterDrawer',
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    extraNodesFloating,
    preferredDataViewMode,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  
  const { searchParams, deleteSearchParams, setSearchParams } = useJukiRouter();
  
  const { t } = useT();
  
  const withPagination = !!pagination;
  
  const pageKey = getPageQueryParam(name);
  const pageSizeKey = getPageSizeQueryParam(name);
  const sortKey = getSortQueryParam(name);
  const filterKey = getFilterQueryParam(name);
  const viewModeKey = getViewModeQueryParam(name);
  const showFilterDrawerKey = getShowFilterDrawerQueryParam(name);
  const [ refreshCount, setRefreshCount ] = useState(0);
  const [ loaderStatus, setLoaderStatus ] = useState<Status>(Status.NONE);
  const searchSorts = searchParams.get(sortKey) || '';
  const searchFilter = useMemo(() => searchParams.getAll(filterKey), [ filterKey, searchParams ]);
  const [ dataTable, setDataTable ] = useState(data);
  const prevSearchSorts = useRef<string>();
  const prevSearchFilter = useRef<string[]>();
  const prevRefreshCount = useRef<number>();
  const prevPage = useRef<number>();
  const prevPageSize = useRef<number>();
  const firstRender = useRef(true);
  const [ pageSizeOptions, setPageSizeOptions ] = useState(pagination?.pageSizeOptions || [
    32,
    64,
    128,
    256,
    512,
    1024,
  ]);
  const initialViewMode = _initialViewMode
    || (preferredDataViewMode === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS);
  
  useEffect(() => {
    if (pagination?.pageSizeOptions && JSON.stringify(pagination.pageSizeOptions) !== JSON.stringify(pageSizeOptions)) {
      setPageSizeOptions(pagination?.pageSizeOptions);
    }
  }, [ pageSizeOptions, pagination?.pageSizeOptions ]);
  const page = useMemo(() => +(searchParams.get(pageKey) || 1), [ pageKey, searchParams ]);
  const pageSize = useMemo(() => +(searchParams.get(pageSizeKey) || 0) || pageSizeOptions[0], [
    pageSizeKey,
    pageSizeOptions,
    searchParams,
  ]);
  const jumpToPage = useCallback((page: number) => {
    setSearchParams({ name: pageKey, value: page + '' });
  }, [ pageKey, setSearchParams ]);
  
  const onPageSizeChange = useCallback((pageSize: number) => {
    setSearchParams({ name: pageSizeKey, value: pageSize + '' });
  }, [ pageSizeKey, setSearchParams ]);
  
  useEffect(() => {
    if (withPagination) {
      if (!searchParams.get(pageKey) || !searchParams.get(pageSizeKey)) {
        setSearchParams(
          { name: pageKey, value: '1', replace: true },
          { name: pageSizeKey, value: pageSizeOptions[0] + '', replace: true },
        );
      }
    }
  }, [ setSearchParams, pageKey, pageSizeKey, pageSizeOptions, searchParams, withPagination ]);
  
  const _refLoader = useRef(loaderStatus);
  _refLoader.current = loaderStatus;
  useEffect(() => {
    setLoaderStatusRef?.((status) => {
      if (typeof status === 'function') {
        setLoaderStatus(status(_refLoader.current));
      } else {
        setLoaderStatus(status);
      }
    });
  }, [ setLoaderStatusRef ]);
  useEffect(() => refreshRef?.(() => setRefreshCount(prevRefreshCount => prevRefreshCount + 1)), [ refreshRef ]);
  useEffect(() => {
    const sort: RequestSortType = {};
    const headSort = headers.find(({ index }) => index === searchSorts || '-' + index === searchSorts);
    if (headSort?.sort) {
      sort[headSort.index] = headSort.index === searchSorts ? 1 : -1;
    }
    const filter: RequestFilterType = {};
    for (let i = 0; i < Math.min(searchFilter.length, headers.length); i++) {
      if (searchFilter[i]) {
        filter[headers[i].index] = searchFilter[i];
      }
    }
    if (firstRender.current) { // First render
      request?.({
        sort,
        filter,
        setLoaderStatus,
        pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
      });
      firstRender.current = false;
    } else if (prevSearchSorts.current !== searchSorts) { // Search change
      const head = headers.find(({ index }) => index === searchSorts || '-' + index === searchSorts);
      const prevHead = headers.find(({ index }) => index === prevSearchSorts.current
        || '-' + index === prevSearchSorts.current);
      if (isSortOnline(head?.sort) || isSortOnline(prevHead?.sort)) {
        request?.({
          sort,
          filter,
          setLoaderStatus,
          pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
        });
      }
    } else if (JSON.stringify(prevSearchFilter.current) !== JSON.stringify(searchFilter)) { // Filter change
      let fixedSearchFilter = [ ...searchFilter ];
      if (!fixedSearchFilter.length) {
        fixedSearchFilter = new Array(headers.length).fill('');
      }
      for (let i = 0; i < Math.min(fixedSearchFilter.length, headers.length); i++) {
        if (
          (fixedSearchFilter[i] || prevSearchFilter.current?.[i]) &&
          fixedSearchFilter[i] !== prevSearchFilter.current?.[i] &&
          (isFilterTextOnline(headers[i].filter) ||
            isFilterSelectOnline(headers[i].filter) ||
            isFilterDateOnline(headers[i].filter) ||
            isFilterDateRangeOnline(headers[i].filter)
          )
        ) {
          request?.({
            sort,
            filter,
            setLoaderStatus,
            pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
          });
        }
      }
    } else if (withPagination && prevPage.current !== page) {
      request?.({
        sort,
        filter,
        setLoaderStatus,
        pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
      });
    } else if (withPagination && prevPageSize.current !== pageSize) {
      request?.({
        sort,
        filter,
        setLoaderStatus,
        pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
      });
    } else if (prevRefreshCount.current !== refreshCount) {
      request?.({
        sort,
        filter,
        setLoaderStatus,
        pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
      });
    }
  }, [ request, searchSorts, headers, refreshCount, searchFilter, withPagination, page, pageSize ]);
  
  useEffect(() => { // Offline filter & Offline sort
    let newData = [ ...data ];
    // if (prevSearchSorts.current !== searchSorts || JSON.stringify(prevSearchFilter.current) !== JSON.stringify(searchFilter)) { // to sort when reload data too
    // Offline filter
    for (let i = 0; i < headers.length; i++) {
      if (searchFilter[i]) {
        const head = headers[i];
        if (isFilterTextOffline(head?.filter)) {
          newData = newData.filter(head.filter.callbackFn({ columnIndex: head.index, text: searchFilter[i] }));
        } else if (isFilterTextAutoOffline(head?.filter)) {
          const regExp = new RegExp(searchFilter[i], 'gi');
          newData = newData.filter(datum => {
            if (isFilterTextAutoOffline(head?.filter)) {
              const value = head.filter.getValue ? head.filter.getValue({ record: datum }) : datum[head.index];
              return !!(value?.match?.(regExp));
            }
            return false;
          });
        } else if (isFilterSelectOffline(head?.filter)) {
          const selectedOptions = searchFilter[i].split(',').map(search => {
            if (isFilterSelectOffline(head?.filter)) {
              return head.filter.options.find(({ value }) => value === search);
            }
            return undefined;
          }).filter(option => !!option) as OptionType<string>[];
          newData = newData.filter(
            head.filter.callbackFn({ columnIndex: head.index, selectedOptions }),
          );
        } else if (isFilterSelectAutoOffline(head?.filter)) {
          const selectedOptions = searchFilter[i].split(',').map(search => {
            if (isFilterSelectAutoOffline(head?.filter)) {
              return head.filter.options.find(({ value }) => value === search);
            }
            return undefined;
          }).filter(option => !!option) as OptionType<string>[];
          newData = newData.filter(datum => {
            if (isFilterSelectAutoOffline(head?.filter)) {
              const value = head.filter.getValue
                ? head.filter.getValue({ record: datum })
                : datum[head.index] as any;
              return !!selectedOptions.find(option => option.value === value);
            }
            return false;
          });
        } else if (isFilterDateOffline(head?.filter)) {
          newData = newData.filter(head.filter.callbackFn({
            columnIndex: head.index,
            selectedDate: new Date(+searchFilter[i]),
          }));
        } else if (isFilterDateAutoOffline(head?.filter)) {
          const {
            showYears,
            showMonths,
            showDays,
            showHours,
            showMinutes,
            showSeconds,
            showMilliseconds,
          } = showOfDateDisplayType(head.filter.pickerType || DEFAULT_PICKER_TYPE);
          if (searchFilter[i] && new Date(+searchFilter[i])?.isValidDate()) {
            const searchDate = new Date(+searchFilter[i]);
            newData = newData.filter(datum => {
              if (isFilterDateAutoOffline(head?.filter)) {
                const value = head.filter.getValue ? head.filter.getValue({ record: datum }) : datum[head.index];
                if (value?.isValidDate?.()) {
                  if (showMilliseconds) {
                    return searchDate.isSameMillisecond(datum[head.index]);
                  } else if (showSeconds) {
                    return searchDate.isSameSecond(datum[head.index]);
                  } else if (showMinutes) {
                    return searchDate.isSameMinute(datum[head.index]);
                  } else if (showHours) {
                    return searchDate.isSameHour(datum[head.index]);
                  } else if (showDays) {
                    return searchDate.isSameDay(datum[head.index]);
                  } else if (showMonths) {
                    return searchDate.isSameMonth(datum[head.index]);
                  } else if (showYears) {
                    return searchDate.isSameYear(datum[head.index]);
                  }
                } else {
                  consoleWarn('datum no filtered', { datum, searchDate, index: head.index, head });
                }
              }
              return true;
            });
          } else {
            consoleWarn('data no filtered, filter not a valid time date', { search: searchFilter[i], searchFilter });
          }
        } else if (isFilterDateRangeOffline(head?.filter)) {
          const [ start, end ] = searchFilter[i]?.split(',');
          if (start && new Date(+start).isValidDate() && end && new Date(+end).isValidDate()) {
            newData = newData.filter(head.filter.callbackFn({
              columnIndex: head.index,
              startSelectedDate: new Date(+start),
              endSelectedDate: new Date(+end),
            }));
          } else {
            consoleWarn('data no filtered, filter not a valid range times date', {
              search: searchFilter[i],
              searchFilter,
            });
          }
        } else if (isFilterDateRangeAutoOffline(head?.filter)) {
          const [ start, end ] = searchFilter[i]?.split(',');
          if (start && new Date(+start).isValidDate() && end && new Date(+end).isValidDate()) {
            const startSelectedDate = new Date(+start);
            const endSelectedDate = new Date(+end);
            const {
              showMonths,
              showDays,
              showHours,
              showMinutes,
              showSeconds,
              showMilliseconds,
            } = showOfDateDisplayType(head.filter.pickerType || DEFAULT_PICKER_TYPE);
            newData = newData.filter(datum => {
              if (isFilterDateRangeAutoOffline(head?.filter)) {
                const date = head.filter.getValue ? head.filter.getValue({ record: datum }) : datum[head.index];
                if (date?.isValidDate?.()) {
                  let isWithin = startSelectedDate.getFullYear() <= date.getFullYear() &&
                    date.getFullYear() <= endSelectedDate.getFullYear();
                  if (showMonths) {
                    isWithin = isWithin && date.isWithinInterval({
                      start: startSelectedDate.startOfMonth(),
                      end: endSelectedDate.endOfMonth(),
                    });
                  }
                  if (showDays) {
                    isWithin = isWithin && date.isWithinInterval({
                      start: startSelectedDate.startOfDay(),
                      end: endSelectedDate.endOfDay(),
                    });
                  }
                  if (showHours) {
                    isWithin = isWithin && date.isWithinInterval({
                      start: startSelectedDate.startOfHour(),
                      end: endSelectedDate.endOfHour(),
                    });
                  }
                  if (showMinutes) {
                    isWithin = isWithin && date.isWithinInterval({
                      start: startSelectedDate.startOfMinute(),
                      end: endSelectedDate.endOfMinute(),
                    });
                  }
                  if (showSeconds) {
                    isWithin = isWithin && date.isWithinInterval({
                      start: startSelectedDate.startOfSecond(),
                      end: endSelectedDate.endOfSecond(),
                    });
                  }
                  if (showMilliseconds) {
                    isWithin = date.isWithinInterval({ start: startSelectedDate, end: endSelectedDate });
                  }
                  return isWithin;
                } else {
                  consoleWarn('datum no filtered', {
                    datum,
                    startSelectedDate,
                    endSelectedDate,
                    index: head.index,
                    head,
                  });
                }
              }
              return true;
            });
          } else {
            consoleWarn('data no filtered, filter not a valid range times date', {
              search: searchFilter[i],
              searchFilter,
            });
          }
        }
      }
    }
    
    // Offline sort
    for (const searchSort of searchSorts.split(',')) {
      const head = headers.find(({ index }) => index === searchSort || '-' + index === searchSort);
      if (head?.sort && isSortOffline(head?.sort)) {
        if (head.index === searchSort) {
          newData.sort(head.sort.compareFn({ columnIndex: head.index }));
        } else if ('-' + head.index === searchSort) {
          newData.sort((a, b) => {
            if (isSortOffline(head?.sort)) {
              return head.sort.compareFn({ columnIndex: head.index })(a, b) * -1;
            }
            return 0;
          });
        }
      }
    }
    // }
    setDataTable(newData);
  }, [ data, headers, searchFilter, searchSorts ]);
  
  useEffect(() => {
    if (searchSorts !== prevSearchSorts.current) {
      prevSearchSorts.current = searchSorts;
    }
  }, [ searchSorts ]);
  useEffect(() => {
    if (JSON.stringify(searchFilter) !== JSON.stringify(prevSearchFilter.current)) {
      prevSearchFilter.current = searchFilter;
    }
  }, [ searchFilter ]);
  useEffect(() => {
    if (refreshCount !== prevRefreshCount.current) {
      prevRefreshCount.current = refreshCount;
    }
  }, [ refreshCount ]);
  useEffect(() => {
    if (page !== prevPage.current) {
      prevPage.current = page;
    }
  }, [ page ]);
  useEffect(() => {
    if (pageSize !== prevPageSize.current) {
      prevPageSize.current = pageSize;
    }
  }, [ pageSize ]);
  
  const isSomethingFiltered = (newSearchFilter: string[]) => !!newSearchFilter.filter(search => !!search
    && (Array.isArray(search) ? search.length : true)).length;
  
  const tableHeaders = useMemo(() => {
    
    const onResetFilter = (index: number) => () => {
      const newSearchFilter = [ ...searchFilter ];
      newSearchFilter[index] = '';
      if (isSomethingFiltered(newSearchFilter)) {
        setSearchParams({ name: filterKey, value: newSearchFilter });
      } else {
        deleteSearchParams({ name: filterKey });
      }
    };
    
    const onFilter = (index: number, newFilter: string | string[]) => {
      const newSearchFilter = searchFilter.length ? [ ...searchFilter ] : new Array(headers.length).fill('');
      if (JSON.stringify(newSearchFilter[index]) !== JSON.stringify(newFilter)) {
        newSearchFilter[index] = newFilter;
        if (isSomethingFiltered(newSearchFilter)) {
          setSearchParams({ name: filterKey, value: newSearchFilter });
        } else {
          deleteSearchParams({ name: filterKey });
        }
      }
    };
    
    return headers.map(({ sort, filter, ...props }, index) => {
      const newHead: TableHeadersType<T> = { ...props };
      // let iconsWidth = filter ? 34 : 0;
      let iconsWidth = filter ? (26 + 2) : 0; // size of icon // 2px separation
      if (sort) { // online or offline
        // iconsWidth += iconsWidth ? (34 + 4) : 34; // size of icon // 4px separation
        iconsWidth += 26 + 2; // size of icon // 2px separation
        const up = props.index;
        const down = '-' + props.index;
        newHead.sort = {
          order: searchSorts.split(',').includes(up) ? 1 : searchSorts.split(',').includes(down) ? -1 : 0,
          onSort: () => {
            const newSort = newHead.sort?.order === 1 ? down : newHead.sort?.order === -1 ? '' : up;
            if (newSort) {
              setSearchParams({ name: sortKey, value: newSort });
            } else {
              deleteSearchParams({ name: sortKey });
            }
          },
          online: isSortOnline(sort),
        };
      }
      
      if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
        newHead.filter = {
          type: FILTER_TEXT,
          onFilter: ({ text }) => onFilter(index, text),
          onReset: onResetFilter(index),
          text: searchFilter[index] || '',
          online: isFilterTextOnline(filter),
        };
      } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
        newHead.filter = {
          type: FILTER_SELECT,
          onFilter: ({ selectedOptions }) => {
            onFilter(
              index,
              selectedOptions
                .filter(({ value }) => !!filter.options.find(option => option.value === value))
                .map(({ value }) => value),
            );
          },
          onReset: onResetFilter(index),
          options: filter.options,
          selectedOptions: searchFilter[index] ? searchFilter[index].split(',').map(value => ({
            value,
            label: '',
          })) : [],
          online: isFilterSelectOnline(filter),
        };
      } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
        const selectedDate = searchFilter[index]
        && new Date(+searchFilter[index]).isValidDate() ? new Date(+searchFilter[index]) : null;
        newHead.filter = {
          type: FILTER_DATE,
          pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
          onFilter: ({ selectedDate }) => onFilter(index, selectedDate.getTime() + ''),
          isDisabled: filter.isDisabled || (() => ({})),
          onReset: onResetFilter(index),
          selectedDate,
          baseDate: selectedDate || filter.baseDate || new Date(),
          online: isFilterDateOnline(filter),
        };
      } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
        const [ start, end ] = searchFilter[index] ? searchFilter[index]?.split(',') : [];
        const startSelectedDate = start && new Date(+start).isValidDate() ? new Date(+start) : null;
        const endSelectedDate = end && new Date(+end).isValidDate() ? new Date(+end) : null;
        newHead.filter = {
          type: FILTER_DATE_RANGE,
          pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
          onFilter: ({
                       startSelectedDate,
                       endSelectedDate,
                     }) => onFilter(index, startSelectedDate.getTime() + ',' + endSelectedDate.getTime()),
          onReset: onResetFilter(index),
          isDisabled: filter.isDisabled || (() => ({})),
          startSelectedDate,
          endSelectedDate,
          baseStartDate: startSelectedDate || filter.baseStartDate || new Date(),
          baseEndDate: endSelectedDate || filter.baseEndDate || new Date(),
          online: isFilterDateRangeOnline(filter),
        };
      }
      
      const head = props.head || props.index;
      if (typeof head === 'string') {
        const width = Math.ceil(getTextWidth(t(head), '600 16px / 16px Inter, sans-serif'));
        // newHead.minWidth = Math.max(props.minWidth || 0, iconsWidth + width + 36 /* padding head cell */);
        newHead.minWidth = Math.max(props.minWidth || 0, iconsWidth + width + 8 /* padding head cell */ + 4 /* extra padding */);
      }
      
      return newHead;
    });
  }, [ deleteSearchParams, filterKey, headers, searchFilter, searchSorts, setSearchParams, sortKey, t ]);
  
  const onAllFilters = useCallback((values: FilterValuesType) => {
    const newSearchFilter = searchFilter.length ? [ ...searchFilter ] : new Array(headers.length).fill('');
    headers.forEach(({ filter, index: columnIndex }, index) => {
      if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
        newSearchFilter[index] = values[columnIndex] || '';
      } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
        newSearchFilter[index] = (values[columnIndex] as OptionType<any>[]
          || []).filter(({ value }) => !!filter.options.find(option => option.value === value))
          .map(({ value }) => value);
      } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
        if (values[columnIndex] instanceof Date) {
          newSearchFilter[index] = (values[columnIndex] as Date).getTime();
        } else {
          newSearchFilter[index] = '';
        }
      } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
        const [ start, end ] = values[columnIndex] ? values[columnIndex] as [ Date, Date ] : [ null, null ];
        if (start?.isValidDate() && end?.isValidDate()) {
          newSearchFilter[index] = start.getTime() + ',' + end.getTime();
        } else {
          newSearchFilter[index] = '';
        }
      }
    });
    if (isSomethingFiltered(newSearchFilter)) {
      setSearchParams({ name: filterKey, value: newSearchFilter });
    } else {
      deleteSearchParams({ name: filterKey });
    }
  }, [ deleteSearchParams, filterKey, headers, searchFilter, setSearchParams ]);
  
  const viewMode: DataViewMode = searchParams.get(viewModeKey) ? (searchParams.get(viewModeKey)
    ?.toUpperCase() === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS) : initialViewMode;
  const setViewMode = useCallback((viewMode: DataViewMode, replace?: boolean) => {
    setSearchParams({ name: viewModeKey, value: viewMode.toLowerCase(), replace });
  }, [ setSearchParams, viewModeKey ]);
  
  useEffect(() => {
    if (viewMode === DataViewMode.CARDS && !cardsView && rowsView) {
      setViewMode(DataViewMode.ROWS, true);
    } else if (viewMode === DataViewMode.ROWS && !rowsView && cardsView) {
      setViewMode(DataViewMode.CARDS, true);
    }
  }, [ viewPortSize, viewMode, cardsView, rowsView, viewModeKey, setViewMode ]);
  
  const oldViewPortSizeRef = useRef('');
  useEffect(() => {
    if (oldViewPortSizeRef.current !== viewPortSize
      && viewMode === DataViewMode.ROWS
      && cardsView
      && viewPortSize === 'sm') {
      setViewMode(DataViewMode.CARDS, true);
    }
    oldViewPortSizeRef.current = viewPortSize;
  }, [ viewPortSize, viewMode, cardsView, rowsView, viewModeKey, setViewMode ]);
  
  useEffect(() => { // Fixing filters
    if (searchFilter.length && searchFilter.length !== tableHeaders.length) {
      deleteSearchParams({ name: filterKey, replace: true });
    }
  }, [ deleteSearchParams, filterKey, tableHeaders, searchFilter ]);
  
  console.log('DataViewer', { tableHeaders, headers });
  return (
    <div className={classNames(className, 'jk-data-viewer-layout', { 'with-pagination': withPagination })}>
      <DisplayDataViewer<T>
        viewPortSize={viewPortSize}
        cards={cards}
        data={dataTable}
        extraNodes={extraNodes}
        extraNodesFloating={extraNodesFloating}
        headers={tableHeaders}
        loading={loaderStatus === Status.LOADING}
        onAllFilters={onAllFilters}
        onReload={request ? () => setRefreshCount(prevState => prevState + 1) : undefined}
        rows={rows}
        showFilterDrawerKey={showFilterDrawerKey}
        rowsView={rowsView}
        cardsView={cardsView}
        setViewMode={setViewMode}
        viewMode={viewMode}
        getRecordKey={getRecordKey}
        getRecordStyle={getRecordStyle}
        getRecordClassName={getRecordClassName}
        onRecordClick={onRecordClick}
        paginationData={{
          pagination,
          pageSizeOptions,
          page,
          pageSize,
          jumpToPage,
          onPageSizeChange,
        }}
      />
      {/*{withPagination && (*/}
      {/*  <Pagination*/}
      {/*    loading={loaderStatus === Status.LOADING}*/}
      {/*    pageSizeOptions={pageSizeOptions}*/}
      {/*    total={pagination.total}*/}
      {/*    page={page}*/}
      {/*    pageSize={pageSize}*/}
      {/*    jumpToPage={jumpToPage}*/}
      {/*    onPageSizeChange={onPageSizeChange}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};
