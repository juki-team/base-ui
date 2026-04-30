import {
  isDayAfter,
  isDayBefore,
  isHoursAfter,
  isHoursBefore,
  isMillisecondsAfter,
  isMillisecondsBefore,
  isMinutesAfter,
  isMinutesBefore,
  isMonthAfter,
  isMonthBefore,
  isSameDay,
  isSameHour,
  isSameMillisecond,
  isSameMinute,
  isSameMonth,
  isSameSecond,
  isSameYear,
  isSecondsAfter,
  isSecondsBefore,
  isValidDate,
  isWithinInterval,
  isYearAfter,
  isYearBefore,
  join,
  split,
} from '@juki-team/commons/helpers';
import type { TFunction } from 'i18next';
import type { RefObject } from 'react';
import { renderReactNodeOrFunctionP1 } from '../../../../helpers';
import type { DatePickerDateFunType } from '../../../../molecules/types';
import type { RequestFilterType } from '../../../../types';
import { TextHeadCell } from '../../../TextHeadCell/TextHeadCell';
import {
  FILTER_DATE,
  FILTER_DATE_AUTO,
  FILTER_DATE_RANGE,
  FILTER_DATE_RANGE_AUTO,
  FILTER_SELECT,
  FILTER_SELECT_AUTO,
  FILTER_TEXT,
  FILTER_TEXT_AUTO,
} from '../constants';
import type {
  DataViewerHeaderSortOfflineType,
  DataViewerHeaderSortOnlineType,
  DataViewerHeaderSortType,
  DataViewerHeadersType,
  DataViewerTableHeadersType,
  FilterDateAutoOfflineType,
  FilterDateOfflineType,
  FilterDateOnlineType,
  FilterDateRangeAutoOfflineType,
  FilterDateRangeOfflineType,
  FilterDateRangeOnlineType,
  FilterSelectAutoOfflineType,
  FilterSelectOfflineType,
  FilterSelectOnlineType,
  FilterTextAutoOfflineType,
  FilterTextOfflineType,
  FilterTextOnlineType,
  FilterValuesType,
  JkTableHeaderFilterType,
  TableHeaderFilterDateRangeType,
  TableHeaderFilterDateType,
  TableHeaderFilterSelectType,
  TableHeaderFilterTextType,
  TableHeaderFilterType,
  TableHeadersType,
} from '../types';

export const isSortOffline = <T,>(sort?: DataViewerHeaderSortType<T>): sort is DataViewerHeaderSortOfflineType<T> => {
  return !!(typeof sort === 'object' && sort?.compareFn);
};

export const isSortOnline = <T,>(sort?: DataViewerHeaderSortType<T>): sort is DataViewerHeaderSortOnlineType => {
  return sort === true;
};

// Text
export const isFilterTextOnline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterTextOnlineType => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_TEXT;
};

export const isFilterTextOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterTextOfflineType<T> => {
  return !!(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_TEXT;
};

export const isFilterTextAutoOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterTextAutoOfflineType<T> => {
  return filter?.type === FILTER_TEXT_AUTO;
};

// Select
export const isFilterSelectOnline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterSelectOnlineType => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_SELECT;
};

export const isFilterSelectOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterSelectOfflineType<T> => {
  return !!(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_SELECT;
};

export const isFilterSelectAutoOffline = <T,>(
  filter?: JkTableHeaderFilterType<T>,
): filter is FilterSelectAutoOfflineType<T> => {
  return filter?.type === FILTER_SELECT_AUTO;
};

// Date
export const isFilterDateOnline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterDateOnlineType => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE;
};

export const isFilterDateOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterDateOfflineType<T> => {
  return !!(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE;
};

export const isFilterDateAutoOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterDateAutoOfflineType<T> => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE_AUTO;
};

// Date range
export const isFilterDateRangeOnline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterDateRangeOnlineType => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE_RANGE;
};

export const isFilterDateRangeOffline = <T,>(filter?: JkTableHeaderFilterType<T>): filter is FilterDateRangeOfflineType<T> => {
  return !!(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE_RANGE;
};

export const isFilterDateRangeAutoOffline = <T,>(
  filter?: JkTableHeaderFilterType<T>,
): filter is FilterDateRangeAutoOfflineType<T> => {
  return !(filter && Object.hasOwn(filter, 'callbackFn')) && filter?.type === FILTER_DATE_RANGE_AUTO;
};

// Simple filters
export const isFilterText = (filter?: TableHeaderFilterType): filter is TableHeaderFilterTextType => {
  return filter?.type === FILTER_TEXT;
};

export const isFilterSelect = (filter?: TableHeaderFilterType): filter is TableHeaderFilterSelectType => {
  return filter?.type === FILTER_SELECT;
};

export const isFilterDate = (filter?: TableHeaderFilterType): filter is TableHeaderFilterDateType => {
  return filter?.type === FILTER_DATE;
};

export const isFilterDateRange = (filter?: TableHeaderFilterType): filter is TableHeaderFilterDateRangeType => {
  return filter?.type === FILTER_DATE_RANGE;
};

interface RenderHeadProps<T> {
  header: DataViewerTableHeadersType<T>;
  columnIndex: string;
  className?: string;
}

export const renderHead = <T,>({ header, columnIndex, className }: RenderHeadProps<T>) => {
  if (typeof header.head === 'string') {
    return <TextHeadCell text={header.head} className={className} />;
  }

  if (header.head) {
    return renderReactNodeOrFunctionP1(header.head, { header, data: [] });
  }

  return <TextHeadCell text={columnIndex} className={className} />;
};

export const isSelected = (start: Date | null) => (date: Date) => ({
  year: !!start && isSameYear(date, start),
  month: !!start && isSameMonth(date, start),
  day: !!start && isSameDay(date, start),
  hours: !!start && isSameHour(date, start),
  minutes: !!start && isSameMinute(date, start),
  seconds: !!start && isSameSecond(date, start),
  milliseconds: !!start && isSameMillisecond(date, start),
});

export const isRangeSelected = (start: Date | null, end: Date | null) => (date: Date) => ({
  year: !!start && !!end && (isSameYear(date, start) || isSameYear(date, end) || isWithinInterval(date, { start, end })),
  month:
    !!start &&
    !!end &&
    (isSameMonth(date, start) ||
      isSameMonth(date, end) ||
      isWithinInterval(date, {
        start,
        end,
      })),
  day: !!start && !!end && (isSameDay(date, start) || isSameDay(date, end) || isWithinInterval(date, { start, end })),
  hours: !!start && !!end && (isSameHour(date, start) || isSameHour(date, end) || isWithinInterval(date, { start, end })),
  minutes:
    !!start &&
    !!end &&
    (isSameMinute(date, start) ||
      isSameMinute(date, end) ||
      isWithinInterval(date, {
        start,
        end,
      })),
  seconds:
    !!start &&
    !!end &&
    (isSameSecond(date, start) ||
      isSameSecond(date, end) ||
      isWithinInterval(date, {
        start,
        end,
      })),
  milliseconds:
    !!start &&
    !!end &&
    (isSameMillisecond(date, start) ||
      isSameMillisecond(date, end) ||
      isWithinInterval(date, {
        start,
        end,
      })),
});

export const isDisabledEnd =
  (start: Date | null): DatePickerDateFunType =>
  (date) => {
    return {
      year: !!start && isYearBefore(date, start),
      month: !!start && isMonthBefore(date, start),
      day: !!start && isDayBefore(date, start),
      hours: !!start && isHoursBefore(date, start),
      minutes: !!start && isMinutesBefore(date, start),
      seconds: !!start && isSecondsBefore(date, start),
      milliseconds: !!start && isMillisecondsBefore(date, start),
    };
  };

export const orDatePickerDateFun = (fun1: DatePickerDateFunType, fun2: DatePickerDateFunType) => (date: Date) => {
  const result1 = fun1(date);
  const result2 = fun2(date);
  return {
    year: result1.year || result2.year,
    month: result1.month || result2.month,
    day: result1.day || result2.day,
    hours: result1.hours || result2.hours,
    minutes: result1.minutes || result2.minutes,
    seconds: result1.seconds || result2.seconds,
    milliseconds: result1.milliseconds || result2.milliseconds,
  };
};

export const isDisabledStart =
  (end: Date | null): DatePickerDateFunType =>
  (date) => {
    return {
      year: !!end && isYearAfter(date, end),
      month: !!end && isMonthAfter(date, end),
      day: !!end && isDayAfter(date, end),
      hours: !!end && isHoursAfter(date, end),
      minutes: !!end && isMinutesAfter(date, end),
      seconds: !!end && isSecondsAfter(date, end),
      milliseconds: !!end && isMillisecondsAfter(date, end),
    };
  };

export const isSomethingFiltered = <T,>(headers: TableHeadersType<T>[]) => {
  let filtered = false;
  const values: FilterValuesType = {};
  for (const { index, filter } of headers) {
    if (isFilterText(filter)) {
      if (filter.getFilter?.()) {
        values[index] = filter.getFilter();
        filtered = true;
      }
    } else if (isFilterSelect(filter)) {
      if (filter.getFilter?.()?.length) {
        values[index] = filter.getFilter();
        filtered = true;
      }
    } else if (isFilterDate(filter)) {
      const f = filter.getFilter?.();
      if (f && isValidDate(f)) {
        values[index] = f;
        filtered = true;
      }
    } else if (isFilterDateRange(filter)) {
      const dates = filter.getFilter?.();
      if (dates?.[0] && isValidDate(dates[0]) && dates?.[1] && isValidDate(dates[1])) {
        values[index] = dates;
        filtered = true;
      }
    }
  }
  return { filtered, values };
};

export const getPageKey = (name: string) => (name ? `${name}.page` : 'page');

export const getPageSizeKey = (name: string) => (name ? `${name}.pageSize` : 'pageSize');

export const getSortKey = (name: string) => (name ? `${name}.sort` : 'sort');

export const getFilterKey = (name: string) => (name ? `${name}.filter` : 'filter');

export const getViewModeKey = (name: string) => (name ? `${name}.viewMode` : 'viewMode');

export const getShowFilterDrawerKey = (name: string) => (name ? `${name}.showFilterDrawer` : 'showFilterDrawer');

export const getVisiblesKey = (name: string) => (name ? `${name}.visibles` : 'visibles');

export const fixHeaders = <T,>(headers: DataViewerTableHeadersType<T>[]) => {
  let accumulatedWidth = 0;
  const newHeaderWidths = [...headers];
  headers.forEach((head, index) => {
    if (head.visible?.getVisible()) {
      newHeaderWidths[index] = { ...head, accumulatedWidth };
      accumulatedWidth += head.width;
    }
  });
  return newHeaderWidths;
};

const widthCache = new Map();

export function getTextWidth(text: string, font: string) {
  const cacheKey = `${text}-${font}`;
  if (widthCache.has(cacheKey)) return widthCache.get(cacheKey);

  if (typeof document !== 'undefined') {
    // @ts-expect-error adding canvas element
    if (!getTextWidth.canvas) getTextWidth.canvas = document.createElement('canvas');
    // @ts-expect-error reading lazily created canvas
    const canvas: HTMLCanvasElement = getTextWidth.canvas;
    const context = canvas.getContext('2d');
    if (context) {
      context.font = font;
      const width = context.measureText(text).width;
      widthCache.set(cacheKey, width);
      return width;
    }
  }
  return 0;
}

export const DEFAULT_PICKER_TYPE = 'year-month-day-hours-minutes-seconds';

export const isSomethingSearchFiltered = (newSearchFilter: RequestFilterType) =>
  !!Object.values(newSearchFilter).filter((search) => !!search && (Array.isArray(search) ? search.length : true)).length;

type SetFn = (value: string | number) => void;
type DeleteFn = () => void;

const onResetFilter =
  (filterIndex: string, filtersRef: RefObject<RequestFilterType>, setFilter: SetFn, deleteFilter: DeleteFn) => () => {
    const newSearchFilter: RequestFilterType = { ...filtersRef.current };
    newSearchFilter[filterIndex] = '';
    if (isSomethingSearchFiltered(newSearchFilter)) {
      setFilter(JSON.stringify(newSearchFilter));
    } else {
      deleteFilter();
    }
  };

const onFilter = (
  filterIndex: string,
  newFilter: string,
  filtersRef: RefObject<RequestFilterType>,
  setFilter: SetFn,
  deleteFilter: DeleteFn,
) => {
  const newSearchFilter = { ...filtersRef.current };
  if (JSON.stringify(newSearchFilter[filterIndex]) !== JSON.stringify(newFilter)) {
    newSearchFilter[filterIndex] = newFilter;
    if (isSomethingSearchFiltered(newSearchFilter)) {
      setFilter(JSON.stringify(newSearchFilter));
    } else {
      deleteFilter();
    }
  }
};

export const buildHeaders = <T,>(
  headers: DataViewerHeadersType<T>[],
  searchVisibles: string,
  t: TFunction<['translation', ...string[]], undefined>,
  filtersRef: RefObject<RequestFilterType>,
  searchSortsRef: RefObject<string>,
  setVisibles: SetFn,
  setSort: SetFn,
  deleteSort: DeleteFn,
  setFilter: SetFn,
  deleteFilter: DeleteFn,
) => {
  const baseHeaders = headers.map(({ sort, filter, ...props }, index) => {
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
            setVisibles(join(split(searchVisibles).filter((i) => i !== props.index)));
          } else {
            setVisibles(join([...split(searchVisibles), props.index]));
          }
        },
      },
    };
    const headIndex = props.index;
    // let iconsWidth = filter ? 34 : 0;
    let iconsWidth = filter ? 26 + 2 : 0; // size of icon // 2px separation
    if (sort) {
      // online or offline
      // iconsWidth += iconsWidth ? (34 + 4) : 34; // size of icon // 4px separation
      iconsWidth += 26 + 2; // size of icon // 2px separation
      const up = props.index;
      const down = `-${props.index}`;
      const getOrder = () =>
        split(searchSortsRef.current).includes(up) ? 1 : split(searchSortsRef.current).includes(down) ? -1 : 0;
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
        onFilter: ({ text }) => onFilter(headIndex, text, filtersRef, setFilter, deleteFilter),
        onReset: onResetFilter(headIndex, filtersRef, setFilter, deleteFilter),
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
            join(
              selectedOptions
                .filter(({ value }) => !!filter.options.find((option) => option.value === value))
                .map(({ value }) => value),
            ),
            filtersRef,
            setFilter,
            deleteFilter,
          );
        },
        onReset: onResetFilter(headIndex, filtersRef, setFilter, deleteFilter),
        options: filter.options,
        getFilter: () =>
          filtersRef.current[headIndex]
            ? split(filtersRef.current[headIndex]).map((value) => ({
                value,
                label: '',
              }))
            : [],
        // selectedOptions: [
        online: isFilterSelectOnline(filter),
      };
    } else if (filter?.type === FILTER_DATE || filter?.type === FILTER_DATE_AUTO) {
      newHead.filter = {
        type: FILTER_DATE,
        pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
        onFilter: ({ selectedDate }) => onFilter(headIndex, `${selectedDate.getTime()}`, filtersRef, setFilter, deleteFilter),
        isDisabled: filter.isDisabled || (() => ({})),
        onReset: onResetFilter(headIndex, filtersRef, setFilter, deleteFilter),
        getFilter: () => {
          return filtersRef.current[headIndex] && isValidDate(new Date(+filtersRef.current[headIndex]))
            ? new Date(+filtersRef.current[headIndex])
            : null;
        },
        // selectedDate,
        baseDate: /* TODO: newHead.filter?.getFilter() as Date ||*/ filter.baseDate || new Date(),
        online: isFilterDateOnline(filter),
      };
    } else if (filter?.type === FILTER_DATE_RANGE || filter?.type === FILTER_DATE_RANGE_AUTO) {
      newHead.filter = {
        type: FILTER_DATE_RANGE,
        pickerType: filter.pickerType || DEFAULT_PICKER_TYPE,
        onFilter: ({ startSelectedDate, endSelectedDate }) =>
          onFilter(
            headIndex,
            join([`${startSelectedDate.getTime()}`, `${endSelectedDate.getTime()}`]),
            filtersRef,
            setFilter,
            deleteFilter,
          ),
        onReset: onResetFilter(headIndex, filtersRef, setFilter, deleteFilter),
        isDisabled: filter.isDisabled || (() => ({})),
        getFilter: () => {
          const [start, end] = filtersRef.current[headIndex] ? split(filtersRef.current[headIndex]) : [];
          const startSelectedDate = start && isValidDate(new Date(+start)) ? new Date(+start) : null;
          const endSelectedDate = end && isValidDate(new Date(+end)) ? new Date(+end) : null;
          return [startSelectedDate, endSelectedDate];
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
        iconsWidth + width + 8 * 2 /* padding head cell left - right */ + 4 /* extra padding */,
      );
    }

    return newHead;
  });

  return fixHeaders(baseHeaders);
};
