import { consoleWarn, DataViewMode, isStringJson, join, ProfileSetting, split, Status } from '@juki-team/commons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EMPTY_ARRAY } from '../../../../constants';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { usePageStore } from '../../../../stores/page/usePageStore';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { classNames, showOfDateDisplayType } from '../../../helpers';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useStableRef } from '../../../hooks/useStableRef';
import type { OptionType } from '../../../molecules/types';
import { DataViewerRequestPropsType, RequestFilterType, RequestSortType } from '../../../types';
import { DisplayDataViewer } from './commons/DisplayDataViewer';
import {
  buildHeaders,
  DEFAULT_PICKER_TYPE,
  getFilterKey,
  getPageKey,
  getPageSizeKey,
  getShowFilterDrawerKey,
  getSortKey,
  getViewModeKey,
  getVisiblesKey,
  isFilterDateAutoOffline,
  isFilterDateOffline,
  isFilterDateRangeAutoOffline,
  isFilterDateRangeOffline,
  isFilterSelectAutoOffline,
  isFilterSelectOffline,
  isFilterTextAutoOffline,
  isFilterTextOffline,
  isSomethingSearchFiltered,
  isSortOffline,
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
import type { DataViewerHeadersType, DataViewerProps, DataViewerTableHeadersType, FilterValuesType } from './types';

const applyOffline = <T extends object, >(data: T[], headers: DataViewerHeadersType<T>[], filters: RequestFilterType, searchSorts: string) => {
  let newData = [ ...data ];
  
  // Offline filter
  for (const head of headers) {
    const filterIndex = head.index;
    if (filters[filterIndex]) {
      const headIndex = head.index;
      if (isFilterTextOffline(head?.filter)) {
        newData = newData.filter(head.filter.callbackFn({ columnIndex: head.index, text: filters[filterIndex] }));
      } else if (isFilterTextAutoOffline(head?.filter)) {
        const regExp = new RegExp(filters[filterIndex], 'gi');
        newData = newData.filter(datum => {
          if (isFilterTextAutoOffline(head?.filter)) {
            const value = head.filter.getValue ? head.filter.getValue({ record: datum }) : (headIndex in datum ? datum[headIndex as Extract<keyof T, string>] : null);
            return typeof value === 'string' ? !!(value?.match?.(regExp)) : false;
          }
          return false;
        });
      } else if (isFilterSelectOffline(head?.filter)) {
        const selectedOptions = split(filters[filterIndex]).map(search => {
          if (isFilterSelectOffline(head?.filter)) {
            return head.filter.options.find(({ value }) => value === search);
          }
          return undefined;
        }).filter(Boolean) as OptionType<string>[];
        newData = newData.filter(
          head.filter.callbackFn({ columnIndex: head.index, selectedOptions }),
        );
      } else if (isFilterSelectAutoOffline(head?.filter)) {
        const selectedOptions = split(filters[filterIndex]).map(search => {
          if (isFilterSelectAutoOffline(head?.filter)) {
            return head.filter.options.find(({ value }) => value === search);
          }
          return undefined;
        }).filter(Boolean) as OptionType<string>[];
        newData = newData.filter(datum => {
          if (isFilterSelectAutoOffline(head?.filter)) {
            const value = head.filter.getValue
              ? head.filter.getValue({ record: datum })
              : (headIndex in datum ? datum[headIndex as Extract<keyof T, string>] : null);
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
              const value = head.filter.getValue ? head.filter.getValue({ record: datum }) : (headIndex in datum ? datum[headIndex as Extract<keyof T, string>] : null);
              if (value instanceof Date && value?.isValidDate?.()) {
                if (showMilliseconds) {
                  return searchDate.isSameMillisecond(value);
                } else if (showSeconds) {
                  return searchDate.isSameSecond(value);
                } else if (showMinutes) {
                  return searchDate.isSameMinute(value);
                } else if (showHours) {
                  return searchDate.isSameHour(value);
                } else if (showDays) {
                  return searchDate.isSameDay(value);
                } else if (showMonths) {
                  return searchDate.isSameMonth(value);
                } else if (showYears) {
                  return searchDate.isSameYear(value);
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
              const date = head.filter.getValue ? head.filter.getValue({ record: datum }) : (headIndex in datum ? datum[headIndex as Extract<keyof T, string>] : null);
              if (date instanceof Date && date?.isValidDate?.()) {
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
  const isFiltered = newData.length !== data.length;
  let isSorted = false;
  
  // Offline sort
  for (const searchSort of split(searchSorts)) {
    const head = headers.find(({ index }) => index === searchSort || '-' + index === searchSort);
    if (head?.sort && isSortOffline(head?.sort)) {
      if (head.index === searchSort) {
        newData.sort(head.sort.compareFn({ columnIndex: head.index }));
        isSorted = true;
      } else if ('-' + head.index === searchSort) {
        newData.sort((a, b) => {
          if (isSortOffline(head?.sort)) {
            return head.sort.compareFn({ columnIndex: head.index })(a, b) * -1;
          }
          return 0;
        });
        isSorted = true;
      }
    }
  }
  
  if (isFiltered || isSorted) {
    return newData;
  }
  
  return data;
};

export default function DataViewer<T extends object, >(props: DataViewerProps<T>) {
  
  const {
    cards,
    cardsView = true,
    className = '',
    data,
    extraNodes: initialExtraNodes,
    headers,
    initialViewMode: _initialViewMode,
    name = '',
    requestRef: _requestRef,
    rows,
    rowsView = true,
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
    // onRecordRender,
    extraNodesFloating,
    setLoaderStatusRef: _setLoaderStatusRef,
    setDataTableRef: _setDataTableRef,
    initializing: initialInitializing = false,
    downloads,
    groups,
    deps = [],
    virtualizerOverscan = 4,
    focusRowKey,
  } = props;
  
  const viewPortSize = usePageStore(store => store.viewPort.screen);
  const preferredDataViewMode = useUserStore(state => state.user.settings[ProfileSetting.DATA_VIEW_MODE]);
  const searchParams = useRouterStore(state => state.searchParams);
  const t = useI18nStore(state => state.i18n.t);
  
  const pageKey = getPageQueryParam(name);
  const pageSizeKey = getPageSizeQueryParam(name);
  const sortKey = getSortQueryParam(name);
  const filterKey = getFilterQueryParam(name);
  const viewModeKey = getViewModeQueryParam(name);
  const showFilterDrawerKey = getShowFilterDrawerQueryParam(name);
  const visiblesKey = getVisiblesQueryParam(name);
  
  const withPagination = !!initialPageSizeOptions;
  
  const [ loaderStatus, setLoaderStatus ] = useState<Status>(Status.LOADING);
  
  const initializing = loaderStatus === Status.LOADING || initialInitializing;
  
  const iniSort = searchParams.get(sortKey);
  const [ searchSorts, setSort, deleteSort ] = useSessionStorage(sortKey, iniSort);
  const searchSortsRef = useStableRef(searchSorts);
  
  const [ searchVisibles, setVisibles ] = useSessionStorage(
    visiblesKey,
    searchParams.get(visiblesKey),
    join(headers.map(({ index }) => index)),
  );
  
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
  
  const initialPageSizeOptionsString = JSON.stringify(initialPageSizeOptions ?? [ 25, 50, 100 ]);
  const pageSizeOptions = useMemo(() => JSON.parse(initialPageSizeOptionsString), [ initialPageSizeOptionsString ]);
  const [ _page, jumpToPage ] = useSessionStorage(pageKey, searchParams.get(pageKey));
  const page = +_page || 1;
  const [ _pageSize, onPageSizeChange ] = useSessionStorage(pageSizeKey, searchParams.get(pageSizeKey));
  const pageSize = +_pageSize || pageSizeOptions[0];
  
  const requestKey = useMemo(() => {
    const sort: RequestSortType = {};
    const headSort = headers.find(({ index }) => index === searchSorts || '-' + index === searchSorts);
    if (headSort?.sort) {
      sort[headSort.index] = headSort.index === searchSorts ? 1 : -1;
    }
    return JSON.stringify({
      sort,
      filter: filters,
      pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
    });
  }, [ filters, headers, page, pageSize, searchSorts, withPagination ]);
  const requestProps = useMemo(() => JSON.parse(requestKey) as DataViewerRequestPropsType, [ requestKey ]);
  const depsKey = JSON.stringify(deps);
  const requestRef = useStableRef(_requestRef);
  const onReload = useCallback(() => requestRef.current?.(requestProps), [ requestRef, requestProps ]);
  useEffect(() => {
    onReload();
  }, [ onReload, depsKey ]);
  const dataTable = useMemo(
    () => applyOffline(data, headers, filters, searchSorts),
    [ data, headers, filters, searchSorts ],
  );
  
  const setDataTableRef = useStableRef(_setDataTableRef);
  useEffect(() => {
    setDataTableRef.current?.(dataTable);
  }, [ dataTable, setDataTableRef ]);
  
  const setLoaderStatusRef = useStableRef(_setLoaderStatusRef);
  useEffect(() => {
    setLoaderStatusRef.current?.((status) => {
      if (typeof status === 'function') {
        setLoaderStatus(prevState => status(prevState));
      } else {
        setLoaderStatus(status);
      }
    });
  }, [ setLoaderStatusRef ]);
  
  const [ tableHeaders, setTableHeaders ] = useState<DataViewerTableHeadersType<T>[]>(
    () => buildHeaders(headers, searchVisibles, t, filtersRef, searchSortsRef, setVisibles, setSort, deleteSort, setFilter, deleteFilter),
  );
  useEffect(() => {
    setTableHeaders(buildHeaders(headers, searchVisibles, t, filtersRef, searchSortsRef, setVisibles, setSort, deleteSort, setFilter, deleteFilter));
  }, [ deleteFilter, deleteSort, headers, setFilter, setSort, t, filtersRef, searchSortsRef, setVisibles, searchVisibles /*to trigger render of headers*/ ]);
  
  const onAllFilters = useCallback((values: FilterValuesType) => {
    const newSearchFilter = { ...filters };
    headers.forEach(({ filter, index: columnIndex }) => {
      const value = values[columnIndex];
      if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
        newSearchFilter[columnIndex] = value as string;
      } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
        newSearchFilter[columnIndex] = join((values[columnIndex] as OptionType<string>[]
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
    if (isSomethingSearchFiltered(newSearchFilter)) {
      setFilter(JSON.stringify(newSearchFilter));
    } else {
      deleteFilter();
    }
  }, [ deleteFilter, headers, filters, setFilter ]);
  
  const initialViewMode = _initialViewMode || (preferredDataViewMode === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS);
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
  
  const extraNodes = useMemo(() => (initialExtraNodes || []).filter(Boolean), [ initialExtraNodes ]);
  
  return (
    <div className={classNames(className, 'jk-data-viewer-layout ht-100', { 'with-pagination': withPagination })}>
      <DisplayDataViewer<T>
        viewPortSize={viewPortSize}
        cards={cards}
        data={dataTable}
        extraNodes={extraNodes}
        extraNodesFloating={extraNodesFloating}
        headers={tableHeaders}
        groups={groups || EMPTY_ARRAY}
        setHeaders={setTableHeaders}
        loading={loaderStatus === Status.LOADING}
        initializing={initializing}
        onAllFilters={onAllFilters}
        onReload={requestRef.current ? onReload : null}
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
        // onRecordRender={onRecordRender}
        pagination={paginationData}
        filterKey={filterKey}
        filters={filters}
        downloads={downloads ?? EMPTY_ARRAY}
        requestProps={requestProps}
        virtualizerOverscan={virtualizerOverscan}
        focusRowKey={focusRowKey}
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
}
