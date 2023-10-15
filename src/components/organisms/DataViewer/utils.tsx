import React from 'react';
import { DatePickerDateFunType } from '../../';
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
import { TextHeadCell } from './Fields';
import {
  DataViewerHeaderSortOfflineType,
  DataViewerHeaderSortOnlineType,
  DataViewerHeaderSortType,
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
  TableHeadFieldType,
  TableHeadType,
} from './types';

export const isSortOffline = <T, >(sort?: DataViewerHeaderSortType<T>): sort is DataViewerHeaderSortOfflineType<T> => {
  return !!(typeof sort === 'object' && sort?.compareFn);
};

export const isSortOnline = <T, >(sort?: DataViewerHeaderSortType<T>): sort is DataViewerHeaderSortOnlineType => {
  return sort === true;
};

// Text
export const isFilterTextOnline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterTextOnlineType => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_TEXT;
};

export const isFilterTextOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterTextOfflineType<T> => {
  return !!(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_TEXT;
};

export const isFilterTextAutoOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterTextAutoOfflineType<T> => {
  return filter?.type === FILTER_TEXT_AUTO;
};

// Select
export const isFilterSelectOnline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterSelectOnlineType => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_SELECT;
};

export const isFilterSelectOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterSelectOfflineType<T> => {
  return !!(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_SELECT;
};

export const isFilterSelectAutoOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterSelectAutoOfflineType<T> => {
  return filter?.type === FILTER_SELECT_AUTO;
};

// Date
export const isFilterDateOnline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateOnlineType => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE;
};

export const isFilterDateOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateOfflineType<T> => {
  return !!(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE;
};

export const isFilterDateAutoOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateAutoOfflineType<T> => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE_AUTO;
};

// Date range
export const isFilterDateRangeOnline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateRangeOnlineType => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE_RANGE;
};

export const isFilterDateRangeOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateRangeOfflineType<T> => {
  return !!(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE_RANGE;
};

export const isFilterDateRangeAutoOffline = <T, >(filter?: JkTableHeaderFilterType<T>): filter is FilterDateRangeAutoOfflineType<T> => {
  return !(filter?.hasOwnProperty('callbackFn')) && filter?.type === FILTER_DATE_RANGE_AUTO;
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

export const renderHead = ({
                             head,
                             columnIndex,
                           }: {
  head: TableHeadType,
  columnIndex: string
}) => head ? (typeof head === 'function' ? head() : head) :
  <TextHeadCell text={columnIndex} />;

export const renderField = <T, >(data: T[], index: number, isCard: boolean) => ({
                                                                                  field,
                                                                                  index: columnIndex,
                                                                                }: {
  field: TableHeadFieldType<T>,
  index: string
}) => (
  typeof field === 'function' ? field({
    record: data[index],
    columnIndex,
    recordIndex: index,
    isCard,
  }) : field
);

export const isSelected = (start: Date | null) => (date: Date) => ({
  year: !!start && date.isSameYear(start),
  month: !!start && date.isSameMonth(start),
  day: !!start && date.isSameDay(start),
  hours: !!start && date.isSameHour(start),
  minutes: !!start && date.isSameMinute(start),
  seconds: !!start && date.isSameSecond(start),
  milliseconds: !!start && date.isSameMillisecond(start),
});

export const isRangeSelected = (start: Date | null, end: Date | null) => (date: Date) => ({
  year: !!start && !!end && (date.isSameYear(start) || date.isSameYear(end) || date.isWithinInterval({ start, end })),
  month: !!start && !!end && (date.isSameMonth(start) || date.isSameMonth(end) || date.isWithinInterval({
    start,
    end,
  })),
  day: !!start && !!end && (date.isSameDay(start) || date.isSameDay(end) || date.isWithinInterval({ start, end })),
  hours: !!start && !!end && (date.isSameHour(start) || date.isSameHour(end) || date.isWithinInterval({ start, end })),
  minutes: !!start && !!end && (date.isSameMinute(start) || date.isSameMinute(end) || date.isWithinInterval({
    start,
    end,
  })),
  seconds: !!start && !!end && (date.isSameSecond(start) || date.isSameSecond(end) || date.isWithinInterval({
    start,
    end,
  })),
  milliseconds: !!start && !!end && (date.isSameMillisecond(start) || date.isSameMillisecond(end) || date.isWithinInterval({
    start,
    end,
  })),
});

export const isDisabledEnd = (start: Date | null): DatePickerDateFunType => (date) => {
  return {
    year: !!start && date.isYearBefore(start),
    month: !!start && date.isMonthBefore(start),
    day: !!start && date.isDayBefore(start),
    hours: !!start && date.isHoursBefore(start),
    minutes: !!start && date.isMinutesBefore(start),
    seconds: !!start && date.isSecondsBefore(start),
    milliseconds: !!start && date.isMillisecondsBefore(start),
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

export const isDisabledStart = (end: Date | null): DatePickerDateFunType => (date) => {
  return {
    year: !!end && date.isYearAfter(end),
    month: !!end && date.isMonthAfter(end),
    day: !!end && date.isDayAfter(end),
    hours: !!end && date.isHoursAfter(end),
    minutes: !!end && date.isMinutesAfter(end),
    seconds: !!end && date.isSecondsAfter(end),
    milliseconds: !!end && date.isMillisecondsAfter(end),
  };
};

export const isSomethingFiltered = <T, >(headers: TableHeadersType<T>[]) => {
  let filtered = false;
  const values: FilterValuesType = {};
  headers.forEach(({ index, filter }) => {
    if (isFilterText(filter)) {
      if (filter.text) {
        values[index] = filter.text;
        filtered = true;
      }
    } else if (isFilterSelect(filter)) {
      values[index] = filter.selectedOptions;
      if (filter.selectedOptions.length) {
        filtered = true;
      }
    } else if (isFilterDate(filter)) {
      if (filter.selectedDate?.isValidDate()) {
        values[index] = filter.selectedDate;
        filtered = true;
      }
    } else if (isFilterDateRange(filter)) {
      values[index] = [ filter.startSelectedDate, filter.endSelectedDate ];
      if (filter.startSelectedDate?.isValidDate() && filter.endSelectedDate?.isValidDate()) {
        filtered = true;
      }
    }
  });
  return { filtered, values };
};

export const getPageKey = (name: string) => name ? name + '.page' : 'page';

export const getPageSizeKey = (name: string) => name ? name + '.pageSize' : 'pageSize';
