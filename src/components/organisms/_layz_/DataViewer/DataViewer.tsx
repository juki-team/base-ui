import { DataViewMode, ProfileSetting, Status } from '@juki-team/commons/enums';
import {
  consoleWarn,
  endOfDay,
  endOfHour,
  endOfMinute,
  endOfMonth,
  endOfSecond,
  isSameDay,
  isSameHour,
  isSameMillisecond,
  isSameMinute,
  isSameMonth,
  isSameSecond,
  isSameYear,
  isStringJson,
  isValidDate,
  isWithinInterval,
  join,
  split,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfSecond,
} from '@juki-team/commons/helpers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EMPTY_ARRAY } from '../../../../constants';
import { useT } from '../../../atoms/T/client';
import { usePageStore } from '../../../../stores/page/usePageStore';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { classNames, showOfDateDisplayType } from '../../../helpers';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useStableRef } from '../../../hooks/useStableRef';
import type { OptionType } from '../../../molecules/types';
import type { DataViewerRequestPropsType, RequestFilterType, RequestSortType } from '../../../types';
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

const applyOffline = <T extends object>(
  data: T[],
  headers: DataViewerHeadersType<T>[],
  filters: RequestFilterType,
  searchSorts: string,
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
) => {
  let newData = [...data];

  // Offline filter
  for (const head of headers) {
    const filterIndex = head.index;
    if (filters[filterIndex]) {
      const headIndex = head.index;
      if (isFilterTextOffline(head?.filter)) {
        newData = newData.filter(head.filter.callbackFn({ columnIndex: head.index, text: filters[filterIndex] }));
      } else if (isFilterTextAutoOffline(head?.filter)) {
        const regExp = new RegExp(filters[filterIndex], 'gi');
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
        newData = newData.filter((datum) => {
          if (isFilterTextAutoOffline(head?.filter)) {
            const value = head.filter.getValue
              ? head.filter.getValue({ record: datum })
              : headIndex in datum
                ? datum[headIndex as Extract<keyof T, string>]
                : null;
            return typeof value === 'string' ? !!value?.match?.(regExp) : false;
          }
          return false;
        });
      } else if (isFilterSelectOffline(head?.filter)) {
        const selectedOptions = split(filters[filterIndex])
          .map((search) => {
            if (isFilterSelectOffline(head?.filter)) {
              return head.filter.options.find(({ value }) => value === search);
            }
            return undefined;
          })
          .filter(Boolean) as OptionType<string>[];
        newData = newData.filter(head.filter.callbackFn({ columnIndex: head.index, selectedOptions }));
      } else if (isFilterSelectAutoOffline(head?.filter)) {
        const selectedOptions = split(filters[filterIndex])
          .map((search) => {
            if (isFilterSelectAutoOffline(head?.filter)) {
              return head.filter.options.find(({ value }) => value === search);
            }
            return undefined;
          })
          .filter(Boolean) as OptionType<string>[];
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
        newData = newData.filter((datum) => {
          if (isFilterSelectAutoOffline(head?.filter)) {
            const value = head.filter.getValue
              ? head.filter.getValue({ record: datum })
              : headIndex in datum
                ? datum[headIndex as Extract<keyof T, string>]
                : null;
            return !!selectedOptions.find((option) => option.value === value);
          }
          return false;
        });
      } else if (isFilterDateOffline(head?.filter)) {
        newData = newData.filter(
          head.filter.callbackFn({
            columnIndex: head.index,
            selectedDate: new Date(+filters[filterIndex]),
          }),
        );
      } else if (isFilterDateAutoOffline(head?.filter)) {
        const { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } =
          showOfDateDisplayType(head.filter.pickerType || DEFAULT_PICKER_TYPE);
        if (filters[filterIndex] && isValidDate(new Date(+filters[filterIndex]))) {
          const searchDate = new Date(+filters[filterIndex]);
          // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
          newData = newData.filter((datum) => {
            if (isFilterDateAutoOffline(head?.filter)) {
              const value = head.filter.getValue
                ? head.filter.getValue({ record: datum })
                : headIndex in datum
                  ? datum[headIndex as Extract<keyof T, string>]
                  : null;
              if (value instanceof Date && isValidDate(value)) {
                if (showMilliseconds) {
                  return isSameMillisecond(searchDate, value);
                }
                if (showSeconds) {
                  return isSameSecond(searchDate, value);
                }
                if (showMinutes) {
                  return isSameMinute(searchDate, value);
                }
                if (showHours) {
                  return isSameHour(searchDate, value);
                }
                if (showDays) {
                  return isSameDay(searchDate, value);
                }
                if (showMonths) {
                  return isSameMonth(searchDate, value);
                }
                if (showYears) {
                  return isSameYear(searchDate, value);
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
        const [start, end] = split(filters[filterIndex]);
        if (start && isValidDate(new Date(+start)) && end && isValidDate(new Date(+end))) {
          newData = newData.filter(
            head.filter.callbackFn({
              columnIndex: head.index,
              startSelectedDate: new Date(+start),
              endSelectedDate: new Date(+end),
            }),
          );
        } else {
          consoleWarn('data no filtered, filter not a valid range times date', {
            search: filters[filterIndex],
            searchFilter: filters,
          });
        }
      } else if (isFilterDateRangeAutoOffline(head?.filter)) {
        const [start, end] = split(filters[filterIndex]);
        if (start && isValidDate(new Date(+start)) && end && isValidDate(new Date(+end))) {
          const startSelectedDate = new Date(+start);
          const endSelectedDate = new Date(+end);
          const { showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } = showOfDateDisplayType(
            head.filter.pickerType || DEFAULT_PICKER_TYPE,
          );
          // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
          newData = newData.filter((datum) => {
            if (isFilterDateRangeAutoOffline(head?.filter)) {
              const date = head.filter.getValue
                ? head.filter.getValue({ record: datum })
                : headIndex in datum
                  ? datum[headIndex as Extract<keyof T, string>]
                  : null;
              if (date instanceof Date && isValidDate(date)) {
                let isWithin =
                  startSelectedDate.getFullYear() <= date.getFullYear() && date.getFullYear() <= endSelectedDate.getFullYear();
                if (showMonths) {
                  isWithin =
                    isWithin &&
                    isWithinInterval(date, {
                      start: startOfMonth(startSelectedDate),
                      end: endOfMonth(endSelectedDate),
                    });
                }
                if (showDays) {
                  isWithin =
                    isWithin &&
                    isWithinInterval(date, {
                      start: startOfDay(startSelectedDate),
                      end: endOfDay(endSelectedDate),
                    });
                }
                if (showHours) {
                  isWithin =
                    isWithin &&
                    isWithinInterval(date, {
                      start: startOfHour(startSelectedDate),
                      end: endOfHour(endSelectedDate),
                    });
                }
                if (showMinutes) {
                  isWithin =
                    isWithin &&
                    isWithinInterval(date, {
                      start: startOfMinute(startSelectedDate),
                      end: endOfMinute(endSelectedDate),
                    });
                }
                if (showSeconds) {
                  isWithin =
                    isWithin &&
                    isWithinInterval(date, {
                      start: startOfSecond(startSelectedDate),
                      end: endOfSecond(endSelectedDate),
                    });
                }
                if (showMilliseconds) {
                  isWithin = isWithinInterval(date, { start: startSelectedDate, end: endSelectedDate });
                }
                return isWithin;
              }
              consoleWarn('datum no filtered', {
                datum,
                startSelectedDate,
                endSelectedDate,
                index: head.index,
                head,
              });
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
    const head = headers.find(({ index }) => index === searchSort || `-${index}` === searchSort);
    if (head?.sort && isSortOffline(head?.sort)) {
      if (head.index === searchSort) {
        newData.sort(head.sort.compareFn({ columnIndex: head.index }));
        isSorted = true;
      } else if (`-${head.index}` === searchSort) {
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

export default function DataViewer<T extends object>(props: DataViewerProps<T>) {
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

  const viewPortSize = usePageStore((store) => store.viewPort.screen);
  const preferredDataViewMode = useUserStore((state) => state.user.settings[ProfileSetting.DATA_VIEW_MODE]);
  const searchParams = useRouterStore((state) => state.searchParams);
  const t = useT();

  const pageKey = getPageQueryParam(name);
  const pageSizeKey = getPageSizeQueryParam(name);
  const sortKey = getSortQueryParam(name);
  const filterKey = getFilterQueryParam(name);
  const viewModeKey = getViewModeQueryParam(name);
  const showFilterDrawerKey = getShowFilterDrawerQueryParam(name);
  const visiblesKey = getVisiblesQueryParam(name);

  const withPagination = !!initialPageSizeOptions;

  const [loaderStatus, setLoaderStatus] = useState<Status>(Status.LOADING);

  const initializing = loaderStatus === Status.LOADING || initialInitializing;

  const iniSort = searchParams.get(sortKey);
  const [searchSorts, setSort, deleteSort] = useSessionStorage(sortKey, iniSort);
  const searchSortsRef = useStableRef(searchSorts);

  const [searchVisibles, setVisibles] = useSessionStorage(
    visiblesKey,
    searchParams.get(visiblesKey),
    join(headers.map(({ index }) => index)),
  );

  const iniFilters = searchParams.get(filterKey) || '';
  const [_searchFilter, setFilter, deleteFilter] = useSessionStorage(filterKey, isStringJson(iniFilters) ? iniFilters : null);
  const filters = useMemo(() => {
    const initialFilters = isStringJson(_searchFilter) ? JSON.parse(_searchFilter) : {};
    const result: RequestFilterType = {};
    for (const head of headers) {
      result[head.index] = initialFilters[head.index];
    }
    return result;
  }, [_searchFilter, headers]);

  const filtersRef = useStableRef(filters);

  const initialPageSizeOptionsString = JSON.stringify(initialPageSizeOptions ?? [25, 50, 100]);
  const pageSizeOptions = useMemo(() => JSON.parse(initialPageSizeOptionsString), [initialPageSizeOptionsString]);
  const [_page, jumpToPage] = useSessionStorage(pageKey, searchParams.get(pageKey));
  const page = +_page || 1;
  const [_pageSize, onPageSizeChange] = useSessionStorage(pageSizeKey, searchParams.get(pageSizeKey));
  const pageSize = +_pageSize || pageSizeOptions[0];

  const requestKey = useMemo(() => {
    const sort: RequestSortType = {};
    const headSort = headers.find(({ index }) => index === searchSorts || `-${index}` === searchSorts);
    if (headSort?.sort) {
      sort[headSort.index] = headSort.index === searchSorts ? 1 : -1;
    }
    return JSON.stringify({
      sort,
      filter: filters,
      pagination: withPagination ? { page, pageSize } : { page: 0, pageSize: 0 },
    });
  }, [filters, headers, page, pageSize, searchSorts, withPagination]);
  const requestProps = useMemo(() => JSON.parse(requestKey) as DataViewerRequestPropsType, [requestKey]);
  const depsKey = JSON.stringify(deps);
  const requestRef = useStableRef(_requestRef);
  const onReload = useCallback(() => requestRef.current?.(requestProps), [requestRef, requestProps]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: depsKey is a serialized trigger to re-fetch when external deps change
  useEffect(() => {
    onReload();
  }, [onReload, depsKey]);
  const dataTable = useMemo(() => applyOffline(data, headers, filters, searchSorts), [data, headers, filters, searchSorts]);

  const setDataTableRef = useStableRef(_setDataTableRef);
  useEffect(() => {
    setDataTableRef.current?.(dataTable);
  }, [dataTable, setDataTableRef]);

  const setLoaderStatusRef = useStableRef(_setLoaderStatusRef);
  useEffect(() => {
    setLoaderStatusRef.current?.((status) => {
      if (typeof status === 'function') {
        setLoaderStatus((prevState) => status(prevState));
      } else {
        setLoaderStatus(status);
      }
    });
  }, [setLoaderStatusRef]);

  const [tableHeaders, setTableHeaders] = useState<DataViewerTableHeadersType<T>[]>(() =>
    buildHeaders(
      headers,
      searchVisibles,
      t,
      filtersRef,
      searchSortsRef,
      setVisibles,
      setSort,
      deleteSort,
      setFilter,
      deleteFilter,
    ),
  );
  useEffect(() => {
    setTableHeaders(
      buildHeaders(
        headers,
        searchVisibles,
        t,
        filtersRef,
        searchSortsRef,
        setVisibles,
        setSort,
        deleteSort,
        setFilter,
        deleteFilter,
      ),
    );
  }, [
    deleteFilter,
    deleteSort,
    headers,
    setFilter,
    setSort,
    t,
    filtersRef,
    searchSortsRef,
    setVisibles,
    searchVisibles /*to trigger render of headers*/,
  ]);

  const onAllFilters = useCallback(
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
    (values: FilterValuesType) => {
      const newSearchFilter = { ...filters };
      for (const { filter, index: columnIndex } of headers) {
        const value = values[columnIndex];
        if (filter?.type === FILTER_TEXT || filter?.type === FILTER_TEXT_AUTO) {
          newSearchFilter[columnIndex] = value as string;
        } else if (filter?.type === FILTER_SELECT || filter?.type === FILTER_SELECT_AUTO) {
          newSearchFilter[columnIndex] = join(
            ((values[columnIndex] as OptionType<string>[]) || [])
              .filter(({ value }) => !!filter.options.find((option) => option.value === value))
              .map(({ value }) => value),
          );
        } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
          if (values[columnIndex] instanceof Date) {
            newSearchFilter[columnIndex] = `${(values[columnIndex] as Date).getTime()}`;
          } else {
            newSearchFilter[columnIndex] = '';
          }
        } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
          const [start, end] = values[columnIndex] ? (values[columnIndex] as [Date, Date]) : [null, null];
          if (start && isValidDate(start) && end && isValidDate(end)) {
            newSearchFilter[columnIndex] = join([`${start.getTime()}`, `${end.getTime()}`]);
          } else {
            newSearchFilter[columnIndex] = '';
          }
        }
      }
      if (isSomethingSearchFiltered(newSearchFilter)) {
        setFilter(JSON.stringify(newSearchFilter));
      } else {
        deleteFilter();
      }
    },
    [deleteFilter, headers, filters, setFilter],
  );

  const initialViewMode =
    _initialViewMode || (preferredDataViewMode === DataViewMode.CARDS ? DataViewMode.CARDS : DataViewMode.ROWS);
  const [viewMode, setViewMode] = useSessionStorage(
    viewModeKey,
    searchParams.get(viewModeKey)
      ? searchParams.get(viewModeKey)?.toUpperCase() === DataViewMode.CARDS
        ? DataViewMode.CARDS
        : DataViewMode.ROWS
      : initialViewMode,
  );
  useEffect(() => {
    if (!cardsView && rowsView) {
      setViewMode(DataViewMode.ROWS);
    } else if (!rowsView && cardsView) {
      setViewMode(DataViewMode.CARDS);
    }
  }, [cardsView, rowsView, setViewMode]);
  const oldViewPortSizeRef = useRef('');
  useEffect(() => {
    if (oldViewPortSizeRef.current !== viewPortSize && cardsView && viewPortSize === 'sm') {
      setViewMode(DataViewMode.CARDS);
    }
    oldViewPortSizeRef.current = viewPortSize;
  }, [viewPortSize, cardsView, setViewMode]);

  const total = initialTotalData ?? data.length;

  const paginationData = useMemo(
    () => ({
      withPagination,
      total,
      pageSizeOptions,
      page,
      pageSize,
      jumpToPage,
      onPageSizeChange,
    }),
    [withPagination, total, pageSizeOptions, page, pageSize, jumpToPage, onPageSizeChange],
  );

  const extraNodes = useMemo(() => (initialExtraNodes || []).filter(Boolean), [initialExtraNodes]);

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
