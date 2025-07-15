import { consoleWarn, DataViewMode, isStringJson, ProfileSetting, SEPARATOR_TOKEN, Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EMPTY_ARRAY } from '../../../constants';
import { classNames, showOfDateDisplayType } from '../../../helpers';
import { useStableRef } from '../../../hooks';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { RequestFilterType, RequestSortType } from '../../../types';
import { OptionType } from '../../molecules/types';
import { DisplayDataViewer } from './commons/DisplayDataViewer';
import {
  fixHeaders,
  getFilterKey,
  getPageKey,
  getPageSizeKey,
  getShowFilterDrawerKey,
  getSortKey,
  getViewModeKey,
  getVisiblesKey,
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
} from './commons/utils';
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
import { DataViewerProps, DataViewerTableHeadersType, FilterValuesType } from './types';

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

const join = (array: (string | null | Date)[]) => {
  return array.join(SEPARATOR_TOKEN);
};

const split = (text: string) => {
  return text.split(SEPARATOR_TOKEN);
};

const isSomethingFiltered = (newSearchFilter: RequestFilterType) => (
  !!Object.values(newSearchFilter).filter(search => !!search && (Array.isArray(search) ? search.length : true)).length
);

export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => {
  
  const {
    cards,
    cardsView = true,
    className = '',
    data,
    extraNodes: initialExtraNodes,
    headers,
    initialViewMode: _initialViewMode,
    name = '',
    request,
    rows,
    rowsView = true,
    setLoaderStatusRef,
    reloadRef,
    totalData: initialTotalData,
    pageSizeOptions: initialPageSizeOptions,
    getRecordKey,
    getPageQueryParam = getPageKey,
    getPageSizeQueryParam = getPageSizeKey,
    getSortQueryParam = getSortKey,
    getFilterQueryParam = getFilterKey,
    getViewModeQueryParam = getViewModeKey,
    getShowFilterDrawerQueryParam = getShowFilterDrawerKey,
    getVisiblesQueryParam = getVisiblesKey,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    onRecordHover,
    onRecordRender,
    extraNodesFloating,
    setDataTableRef: _setDataTableRef,
    initializing: initialInitializing = false,
    downloads,
    groups,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const preferredDataViewMode = useUserStore(state => state.user.settings[ProfileSetting.DATA_VIEW_MODE]);
  const searchParams = useRouterStore(state => state.searchParams);
  const t = useI18nStore(state => state.i18n.t);
  
  const withPagination = !!initialPageSizeOptions;
  
  const showFilterDrawerKey = getShowFilterDrawerQueryParam(name);
  
  const [ reloadCount, setReloadCount ] = useState(0);
  const [ loaderStatus, setLoaderStatus ] = useState<Status>(Status.LOADING);
  const [ _initializing, setInitializing ] = useState(true);
  useEffect(() => {
    if (loaderStatus !== Status.LOADING) {
      setInitializing(false);
    }
  }, [ loaderStatus ]);
  const initializing = _initializing || initialInitializing;
  
  const sortKey = getSortQueryParam(name);
  const iniSort = searchParams.get(sortKey);
  const [ searchSorts, setSort, deleteSort ] = useSessionStorage(sortKey, iniSort);
  const searchSortsRef = useStableRef(searchSorts);
  
  const visiblesKey = getVisiblesQueryParam(name);
  const [ searchVisibles, setVisibles ] = useSessionStorage(
    visiblesKey,
    searchParams.get(visiblesKey),
    headers.map(({ index }) => index).join(SEPARATOR_TOKEN),
  );
  const filterKey = getFilterQueryParam(name);
  const iniFilters = searchParams.get(filterKey) || '';
  const [ _searchFilter, setFilter, deleteFilter ] = useSessionStorage(filterKey, isStringJson(iniFilters) ? iniFilters : null);
  const filters = useMemo(() => {
    const initialFilters = isStringJson(_searchFilter) ? JSON.parse(_searchFilter) : {};
    const result: RequestFilterType = {};
    for (const head of headers) {
      result[head.index] = initialFilters[head.index];
    }
    return result;
  }, [ _searchFilter, headers ]);
  
  const filtersRef = useStableRef(filters);
  
  const [ dataTable, setDataTable ] = useState(data);
  
  const prevRefreshCount = useRef<number>(undefined);
  const prevPage = useRef<number>(undefined);
  const prevPageSize = useRef<number>(undefined);
  const prevSearchSorts = useRef<string>(undefined);
  const prevSearchFilter = useRef<RequestFilterType>(undefined);
  
  const firstRender = useRef(true);
  
  const pageKey = getPageQueryParam(name);
  const pageSizeKey = getPageSizeQueryParam(name);
  const initialPageSizeOptionsString = JSON.stringify(initialPageSizeOptions ?? [ 25, 50, 100 ]);
  const pageSizeOptions = useMemo(() => JSON.parse(initialPageSizeOptionsString), [ initialPageSizeOptionsString ]);
  const [ _page, jumpToPage ] = useSessionStorage(pageKey, searchParams.get(pageKey));
  const page = +_page || 1;
  const [ _pageSize, onPageSizeChange ] = useSessionStorage(pageSizeKey, searchParams.get(pageSizeKey));
  const pageSize = +_pageSize || pageSizeOptions[0];
  
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
  useEffect(() => reloadRef?.(() => setReloadCount(prevState => prevState + 1)), [ reloadRef ]);
  
  const requestProps = useMemo(() => {
    const sort: RequestSortType = {};
    const headSort = headers.find(({ index }) => index === searchSorts || '-' + index === searchSorts);
    if (headSort?.sort) {
      sort[headSort.index] = headSort.index === searchSorts ? 1 : -1;
    }
    return {
      sort,
      filter: filters,
      setLoaderStatus,
      pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
    };
  }, [ headers, searchSorts, filters, setLoaderStatus, withPagination, page, pageSize ]);
  
  useEffect(() => {
    if (firstRender.current) { // First render
      request?.(requestProps);
      firstRender.current = false;
    } else if (prevSearchSorts.current !== searchSorts) { // Search change
      const head = headers.find(({ index }) => index === searchSorts || '-' + index === searchSorts);
      const prevHead = headers.find(({ index }) => index === prevSearchSorts.current || '-' + index === prevSearchSorts.current);
      if (isSortOnline(head?.sort) || isSortOnline(prevHead?.sort)) {
        request?.(requestProps);
      }
      prevSearchSorts.current = searchSorts;
    } else if (JSON.stringify(prevSearchFilter.current) !== JSON.stringify(filters)) { // Filter change
      let withChanges = false;
      for (const head of headers) {
        if (
          (filters[head.index] || prevSearchFilter.current?.[head.index]) &&
          filters[head.index] !== prevSearchFilter.current?.[head.index] &&
          (isFilterTextOnline(head.filter) ||
            isFilterSelectOnline(head.filter) ||
            isFilterDateOnline(head.filter) ||
            isFilterDateRangeOnline(head.filter)
          )
        ) {
          withChanges = true;
        }
      }
      if (withChanges) {
        request?.(requestProps);
      }
      prevSearchFilter.current = filters;
    } else if (withPagination && prevPage.current !== page) {
      request?.(requestProps);
      prevPage.current = page;
    } else if (withPagination && prevPageSize.current !== pageSize) {
      request?.(requestProps);
      prevPageSize.current = pageSize;
    } else if (prevRefreshCount.current !== reloadCount) {
      request?.(requestProps);
      prevRefreshCount.current = reloadCount;
    }
  }, [ request, searchSorts, headers, reloadCount, filters, withPagination, page, pageSize, requestProps ]);
  const setDataTableRef = useRef<(data: T[]) => void>(undefined);
  setDataTableRef.current = _setDataTableRef;
  useEffect(() => { // Offline filter & Offline sort
    let newData = [ ...data ];
    // if (prevSearchSorts.current !== searchSorts || JSON.stringify(prevSearchFilter.current) !== JSON.stringify(searchFilter)) { // to sort when reload data too
    // Offline filter
    for (const head of headers) {
      const filterIndex = head.index;
      if (filters[filterIndex]) {
        if (isFilterTextOffline(head?.filter)) {
          newData = newData.filter(head.filter.callbackFn({ columnIndex: head.index, text: filters[filterIndex] }));
        } else if (isFilterTextAutoOffline(head?.filter)) {
          const regExp = new RegExp(filters[filterIndex], 'gi');
          newData = newData.filter(datum => {
            if (isFilterTextAutoOffline(head?.filter)) {
              const value = head.filter.getValue ? head.filter.getValue({ record: datum }) : datum[head.index];
              return !!(value?.match?.(regExp));
            }
            return false;
          });
        } else if (isFilterSelectOffline(head?.filter)) {
          const selectedOptions = split(filters[filterIndex]).map(search => {
            if (isFilterSelectOffline(head?.filter)) {
              return head.filter.options.find(({ value }) => value === search);
            }
            return undefined;
          }).filter(option => !!option) as OptionType<string>[];
          newData = newData.filter(
            head.filter.callbackFn({ columnIndex: head.index, selectedOptions }),
          );
        } else if (isFilterSelectAutoOffline(head?.filter)) {
          const selectedOptions = split(filters[filterIndex]).map(search => {
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
            selectedDate: new Date(+filters[filterIndex]),
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
          if (filters[filterIndex] && new Date(+filters[filterIndex])?.isValidDate()) {
            const searchDate = new Date(+filters[filterIndex]);
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
            consoleWarn('data no filtered, filter not a valid time date', {
              search: filters[filterIndex],
              searchFilter: filters,
            });
          }
        } else if (isFilterDateRangeOffline(head?.filter)) {
          const [ start, end ] = split(filters[filterIndex]);
          if (start && new Date(+start).isValidDate() && end && new Date(+end).isValidDate()) {
            newData = newData.filter(head.filter.callbackFn({
              columnIndex: head.index,
              startSelectedDate: new Date(+start),
              endSelectedDate: new Date(+end),
            }));
          } else {
            consoleWarn('data no filtered, filter not a valid range times date', {
              search: filters[filterIndex],
              searchFilter: filters,
            });
          }
        } else if (isFilterDateRangeAutoOffline(head?.filter)) {
          const [ start, end ] = split(filters[filterIndex]);
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
              search: filters[filterIndex],
              searchFilter: filters,
            });
          }
        }
      }
    }
    
    // Offline sort
    for (const searchSort of split(searchSorts)) {
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
    setDataTableRef.current?.(newData);
  }, [ data, headers, filters, searchSorts ]);
  
  const [ tableHeaders, setTableHeaders ] = useState<DataViewerTableHeadersType<T>[]>(headers.map(head => ({
    ...head,
    width: 0,
    accumulatedWidth: 0,
  }) as DataViewerTableHeadersType<T>));
  useEffect(() => {
    const onResetFilter = (filterIndex: string) => () => {
      const newSearchFilter: RequestFilterType = { ...filtersRef.current };
      newSearchFilter[filterIndex] = '';
      if (isSomethingFiltered(newSearchFilter)) {
        setFilter(JSON.stringify(newSearchFilter));
      } else {
        deleteFilter();
      }
    };
    
    const onFilter = (filterIndex: string, newFilter: string) => {
      const newSearchFilter = { ...filtersRef.current };
      if (JSON.stringify(newSearchFilter[filterIndex]) !== JSON.stringify(newFilter)) {
        newSearchFilter[filterIndex] = newFilter;
        if (isSomethingFiltered(newSearchFilter)) {
          setFilter(JSON.stringify(newSearchFilter));
        } else {
          deleteFilter();
        }
      }
    };
    
    setTableHeaders(fixHeaders(headers.map(({ sort, filter, ...props }, index) => {
      const getVisible = () => split(searchVisibles).includes(props.index);
      const newHead: DataViewerTableHeadersType<T> = {
        ...props,
        minWidth: props.minWidth ?? 0,
        width: 0,
        accumulatedWidth: 0,
        headIndex: index,
        visible: {
          getVisible,
          onToggle() {
            const isVisible = getVisible();
            if (isVisible) {
              setVisibles(split(searchVisibles).filter(i => i !== props.index).join(SEPARATOR_TOKEN));
            } else {
              setVisibles([ ...split(searchVisibles), props.index ].join(SEPARATOR_TOKEN));
            }
          },
        },
      };
      const headIndex = props.index;
      // let iconsWidth = filter ? 34 : 0;
      let iconsWidth = filter ? (26 + 2) : 0; // size of icon // 2px separation
      if (sort) { // online or offline
        // iconsWidth += iconsWidth ? (34 + 4) : 34; // size of icon // 4px separation
        iconsWidth += 26 + 2; // size of icon // 2px separation
        const up = props.index;
        const down = '-' + props.index;
        const getOrder = () => split(searchSortsRef.current).includes(up) ? 1 : split(searchSortsRef.current).includes(down) ? -1 : 0;
        newHead.sort = {
          getOrder,
          onSort: () => {
            const newSort = getOrder() === 1 ? down : getOrder() === -1 ? '' : up;
            if (newSort) {
              setSort(newSort);
            } else {
              deleteSort();
            }
          },
          online: isSortOnline(sort),
        };
      }
      if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
        newHead.filter = {
          type: FILTER_TEXT,
          onFilter: ({ text }) => onFilter(headIndex, text),
          onReset: onResetFilter(headIndex),
          getFilter: () => filtersRef.current[headIndex] || '',
          // text: string
          online: isFilterTextOnline(filter),
        };
      } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
        newHead.filter = {
          type: FILTER_SELECT,
          onFilter: ({ selectedOptions }) => {
            onFilter(
              headIndex,
              join(selectedOptions
                .filter(({ value }) => !!filter.options.find(option => option.value === value))
                .map(({ value }) => value)),
            );
          },
          onReset: onResetFilter(headIndex),
          options: filter.options,
          getFilter: () => filtersRef.current[headIndex] ? split(filtersRef.current[headIndex]).map(value => ({
            value,
            label: '',
          })) : [],
          // selectedOptions: [
          online: isFilterSelectOnline(filter),
        };
      } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
        
        newHead.filter = {
          type: FILTER_DATE,
          pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
          onFilter: ({ selectedDate }) => onFilter(headIndex, selectedDate.getTime() + ''),
          isDisabled: filter.isDisabled || (() => ({})),
          onReset: onResetFilter(headIndex),
          getFilter: () => {
            return filtersRef.current[headIndex]
            && new Date(+filtersRef.current[headIndex]).isValidDate() ? new Date(+filtersRef.current[headIndex]) : null;
          },
          // selectedDate,
          baseDate: /* TODO: newHead.filter?.getFilter() as Date ||*/ filter.baseDate || new Date(),
          online: isFilterDateOnline(filter),
        };
      } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
        newHead.filter = {
          type: FILTER_DATE_RANGE,
          pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
          onFilter: ({
                       startSelectedDate,
                       endSelectedDate,
                     }) => onFilter(headIndex, join([ startSelectedDate.getTime() + '', endSelectedDate.getTime() + '' ])),
          onReset: onResetFilter(headIndex),
          isDisabled: filter.isDisabled || (() => ({})),
          getFilter: () => {
            const [ start, end ] = filtersRef.current[headIndex] ? split(filtersRef.current[headIndex]) : [];
            const startSelectedDate = start && new Date(+start).isValidDate() ? new Date(+start) : null;
            const endSelectedDate = end && new Date(+end).isValidDate() ? new Date(+end) : null;
            return [ startSelectedDate, endSelectedDate ];
          },
          baseStartDate: /* TODO: newHead.filter?.getFilter()?.[0] as Date ||*/ filter.baseStartDate || new Date(),
          baseEndDate: /* TODO: newHead.filter?.getFilter()?.[1] as Date  ||*/ filter.baseEndDate || new Date(),
          online: isFilterDateRangeOnline(filter),
        };
      }
      
      const head = props.head || props.index;
      if (typeof head === 'string') {
        const width = Math.ceil(getTextWidth(t(head.toUpperCase()), '400 14px / 14px Inter, sans-serif')) + 4;
        // newHead.minWidth = Math.max(props.minWidth || 0, iconsWidth + width + 36 /* padding head cell */);
        newHead.minWidth = Math.max(
          props.minWidth || 0,
          iconsWidth + width + 8 * 2 /* padding head cell left - right */ + 4, /* extra padding */
        );
      }
      
      return newHead;
    })));
  }, [ deleteFilter, deleteSort, headers, setFilter, setSort, t, searchVisibles /*to trigger render of headers*/ ]);
  
  const onAllFilters = useCallback((values: FilterValuesType) => {
    const newSearchFilter = { ...filters };
    headers.forEach(({ filter, index: columnIndex }) => {
      const value = values[columnIndex];
      if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
        newSearchFilter[columnIndex] = value as string;
      } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
        newSearchFilter[columnIndex] = join((values[columnIndex] as OptionType<any>[]
          || []).filter(({ value }) => !!filter.options.find(option => option.value === value))
          .map(({ value }) => value));
      } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
        if (values[columnIndex] instanceof Date) {
          newSearchFilter[columnIndex] = (values[columnIndex] as Date).getTime() + '';
        } else {
          newSearchFilter[columnIndex] = '';
        }
      } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
        const [ start, end ] = values[columnIndex] ? values[columnIndex] as [ Date, Date ] : [ null, null ];
        if (start?.isValidDate() && end?.isValidDate()) {
          newSearchFilter[columnIndex] = join([ start.getTime() + '', end.getTime() + '' ]);
        } else {
          newSearchFilter[columnIndex] = '';
        }
      }
    });
    if (isSomethingFiltered(newSearchFilter)) {
      setFilter(JSON.stringify(newSearchFilter));
    } else {
      deleteFilter();
    }
  }, [ deleteFilter, headers, filters, setFilter ]);
  
  const initialViewMode = _initialViewMode
    || (preferredDataViewMode === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS);
  const viewModeKey = getViewModeQueryParam(name);
  const [ viewMode, setViewMode ] = useSessionStorage(
    viewModeKey,
    searchParams.get(viewModeKey)
      ? (searchParams.get(viewModeKey)?.toUpperCase() === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS)
      : initialViewMode,
  );
  useEffect(() => {
    if (!cardsView && rowsView) {
      setViewMode(DataViewMode.ROWS);
    } else if (!rowsView && cardsView) {
      setViewMode(DataViewMode.CARDS);
    }
  }, [ cardsView, rowsView, setViewMode ]);
  const oldViewPortSizeRef = useRef('');
  useEffect(() => {
    if (oldViewPortSizeRef.current !== viewPortSize
      && cardsView
      && viewPortSize === 'sm') {
      setViewMode(DataViewMode.CARDS);
    }
    oldViewPortSizeRef.current = viewPortSize;
  }, [ viewPortSize, cardsView, rowsView, setViewMode ]);
  
  const onReload = useCallback(() => request && setReloadCount(prevState => prevState + 1), [ setReloadCount, request ]);
  
  const total = initialTotalData ?? data.length;
  
  const paginationData = useMemo(() => ({
    withPagination,
    total,
    pageSizeOptions,
    page,
    pageSize,
    jumpToPage,
    onPageSizeChange,
  }), [ withPagination, total, pageSizeOptions, page, pageSize, jumpToPage, onPageSizeChange ]);
  
  const extraNodes = useMemo(() => (initialExtraNodes || []).filter(extraNode => !!extraNode), [ initialExtraNodes ]);
  
  return (
    <div className={classNames(className, 'jk-data-viewer-layout ht-100', { 'with-pagination': withPagination })}>
      <DisplayDataViewer<T>
        viewPortSize={viewPortSize}
        cards={cards}
        data={dataTable}
        extraNodes={extraNodes}
        extraNodesFloating={extraNodesFloating}
        headers={tableHeaders}
        groups={groups || []}
        setHeaders={setTableHeaders}
        loading={loaderStatus === Status.LOADING}
        initializing={initializing}
        onAllFilters={onAllFilters}
        onReload={request ? onReload : null}
        rows={rows}
        showFilterDrawerKey={showFilterDrawerKey}
        rowsView={rowsView}
        cardsView={cardsView}
        setViewMode={setViewMode}
        viewMode={viewMode as DataViewMode}
        getRecordKey={getRecordKey}
        getRecordStyle={getRecordStyle}
        getRecordClassName={getRecordClassName}
        onRecordClick={onRecordClick}
        onRecordHover={onRecordHover}
        onRecordRender={onRecordRender}
        pagination={paginationData}
        filterKey={filterKey}
        filters={filters}
        downloads={downloads ?? EMPTY_ARRAY}
        requestProps={requestProps}
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
