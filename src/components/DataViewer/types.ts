import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { ReactNodeOrFunctionType, Status } from '../../types';
import { DatePickerDateFunType, DatePickerType, OptionType } from '../index';
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

export interface RowVirtualizerFixedProps<T> {
  data: T[],
  headers: TableHeadersWithWidthType<T>[],
  rowHeight: number,
  scrollLeft: number,
}

export type FilterTextOnlineType = { type: typeof FILTER_TEXT };
export type FilterTextOfflineType<T> = { type: typeof FILTER_TEXT, callbackFn: (props: { columnIndex: string, text: string }) => (record: T, index: number) => boolean };
export type FilterTextAutoOfflineType<T> = { type: typeof FILTER_TEXT_AUTO, getValue?: (props: { record: T }) => string };
export type FilterSelectOnlineType = { type: typeof FILTER_SELECT, options: OptionType<string>[] };
export type FilterSelectOfflineType<T> = { type: typeof FILTER_SELECT, options: OptionType<string>[], callbackFn: (props: { columnIndex: string, selectedOptions: OptionType<string>[] }) => (record: T, index: number) => boolean };
export type FilterSelectAutoOfflineType<T> = { type: typeof FILTER_SELECT_AUTO, options: OptionType<string>[], getValue?: (props: { record: T }) => string };
export type FilterDateOnlineType = {
  baseDate?: Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE,
}
export type FilterDateOfflineType<T> = {
  baseDate?: Date,
  callbackFn: (props: { columnIndex: string, selectedDate: Date }) => (record: T, index: number) => boolean,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE,
}
export type FilterDateAutoOfflineType<T> = {
  baseDate?: Date,
  getValue?: (props: { record: T }) => Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE_AUTO,
}
export type FilterDateRangeOnlineType = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE_RANGE,
}
export type FilterDateRangeOfflineType<T> = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  callbackFn: (props: { columnIndex: string, startSelectedDate: Date, endSelectedDate: Date }) => (record: T, index: number) => boolean,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE_RANGE,
}
export type FilterDateRangeAutoOfflineType<T> = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  getValue?: (props: { record: T }) => Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DatePickerType,
  type: typeof FILTER_DATE_RANGE_AUTO,
}

export type JkTableHeaderFilterType<T> =
  FilterTextOnlineType | FilterTextOfflineType<T> | FilterTextAutoOfflineType<T>
  | FilterSelectOnlineType | FilterSelectOfflineType<T> | FilterSelectAutoOfflineType<T>
  | FilterDateOnlineType | FilterDateOfflineType<T> | FilterDateAutoOfflineType<T>
  | FilterDateRangeOnlineType | FilterDateRangeOfflineType<T> | FilterDateRangeAutoOfflineType<T>

export type TableHeaderFilterTextType = {
  onFilter: (props: { columnIndex: string, text: string }) => void,
  onReset: () => void,
  text: string,
  type: typeof FILTER_TEXT,
};

export type TableHeaderFilterSelectType = {
  onFilter: (props: { columnIndex: string, selectedOptions: OptionType<string>[] }) => void,
  onReset: () => void,
  options: OptionType<string>[],
  selectedOptions: OptionType<string>[],
  type: typeof FILTER_SELECT,
}

export type TableHeaderFilterDateType = {
  baseDate: Date,
  isDisabled: DatePickerDateFunType,
  onFilter: ((props: { columnIndex: string, selectedDate: Date }) => void),
  onReset: () => void,
  pickerType: DatePickerType,
  selectedDate: Date | null,
  type: typeof FILTER_DATE,
};

export type TableHeaderFilterDateRangeType = {
  baseEndDate: Date,
  baseStartDate: Date,
  endSelectedDate: Date | null,
  isDisabled: DatePickerDateFunType,
  onFilter: ((props: { columnIndex: string, startSelectedDate: Date, endSelectedDate: Date }) => void),
  onReset: () => void,
  pickerType: DatePickerType,
  startSelectedDate: Date | null,
  type: typeof FILTER_DATE_RANGE,
};

export type TableHeaderFilterType =
  TableHeaderFilterTextType
  | TableHeaderFilterSelectType
  | TableHeaderFilterDateType
  | TableHeaderFilterDateRangeType;

export type CardPositionType =
  'topLeft'
  | 'top'
  | 'topRight'
  | 'centerLeft'
  | 'center'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight';

export type TableHeadType = (() => ReactNode) | ReactNode;

export type TableSortOrderType = 1 | -1 | 0;
export type TableSortOnSortType = (props: { columnIndex: string }) => void;

export type TableSortType = {
  onSort?: TableSortOnSortType,
  order: TableSortOrderType,
}

export type TableHeadFieldType<T> =
  ((props: { record: T, columnIndex: string, recordIndex: number, isCard: boolean }) => ReactNode)
  | ReactNode;

export type TableHeadersType<T> = {
  cardPosition?: CardPositionType,
  field: TableHeadFieldType<T>,
  filter?: TableHeaderFilterType,
  head?: TableHeadType,
  index: string,
  minWidth?: number,
  sort?: TableSortType,
  sticky?: boolean,
}

export type TableHeadersWithWidthType<T> = TableHeadersType<T> & { width: number };
type RowsType = { height?: number };
type CardsType = { height?: number, width?: number };

export interface DisplayDataViewerProps<T> {
  cards?: CardsType,
  cardsView: boolean,
  data: T[],
  extraButtons?: ReactNodeOrFunctionType,
  headers: TableHeadersType<T>[],
  loading?: boolean,
  onAllFilters: (values: FilterValuesType) => void,
  onReload?: () => void,
  rows?: RowsType,
  rowsView: boolean,
  setViewMode: (viewMode: ViewModeType) => void,
  viewMode: ViewModeType,
}

export type DataViewerHeaderSortOnlineType = true;
export type DataViewerHeaderSortOfflineType<T> = { compareFn: (props: { columnIndex: string }) => (recordA: T, recordB: T) => number };
export type DataViewerHeaderSortType<T> = DataViewerHeaderSortOnlineType | DataViewerHeaderSortOfflineType<T>;

export type DataViewerHeadersType<T> = {
  head?: TableHeadType,
  field: TableHeadFieldType<T>,
  index: string,
  minWidth?: number,
  sort?: DataViewerHeaderSortType<T>,
  filter?: JkTableHeaderFilterType<T>,
  cardPosition?: CardPositionType,
  sticky?: boolean,
}

export type RequestSortType = { [key: string]: 1 | -1 };
export type RequestFilterType = { [key: string]: string | string[] };

// export type URLSearchParamsInitType = string | [string, string][] | Record<string, string | string[]> | URLSearchParams;
// export type SetSearchParamsType = ((nextInit: URLSearchParamsInitType, navigateOptions?: ({ replace?: boolean | undefined, state?: any } | undefined)) => void);

export type SearchParamsObjectType = { [key: string]: string[] };
export type SetSearchParamsObjectType = (params: SearchParamsObjectType) => void;

export type ViewModeType = 'rows' | 'cards';

export type LoaderStatusActionType = Dispatch<SetStateAction<Status>>;

export interface DataViewerProps<T> {
  cards?: CardsType,
  cardsView?: boolean,
  className?: string,
  data: T[],
  extraButtons?: ReactNodeOrFunctionType,
  headers: DataViewerHeadersType<T>[],
  initialViewMode?: ViewModeType,
  name?: string,
  request: (props: { sort: RequestSortType, filter: RequestFilterType, pagination?: { page: number, pageSize: number }, setLoaderStatus: LoaderStatusActionType }) => void,
  rows?: RowsType,
  rowsView?: boolean,
  searchParamsObject?: SearchParamsObjectType,
  setSearchParamsObject?: SetSearchParamsObjectType,
  setLoaderStatusRef?: (setLoaderStatus: SetLoaderStatusType) => void,
  refreshRef?: (refresh: RefreshType) => void,
  pagination?: { total: number, pageSizeOptions?: number[] },
}

export type LoaderStatusType = Status;
export type SetLoaderStatusType = (status: (Status | ((props: LoaderStatusType) => LoaderStatusType))) => void;
export type RefreshType = () => void;

export type HeaderWidthsType = { [key: string]: { width: number, minWidth: number, accumulatedWidth: number } };

export interface TableHeadProps<T> {
  headerWidths: HeaderWidthsType,
  headers: TableHeadersWithWidthType<T>[],
  rowWidth: number,
  setHeaderWidths: Dispatch<HeaderWidthsType>,
  scrollLeft: number,
}

export interface FilterDrawerProps<T> {
  headers: TableHeadersType<T>[],
  isOpen: boolean,
  onClose: () => void,
  onFilter: (values: FilterValuesType) => void,
  onResetFilters: () => void,
}

export type FilterValuesType = { [key: string]: string | OptionType<string>[] | Date | [Date | null, Date | null] };

export type FieldProps = PropsWithChildren<{ onClick?: () => void, className?: string }>;

export interface TextFieldProps {
  className?: string,
  label: ReactNode,
  onClick?: () => void,
  text: ReactNode,
}

export interface DateFieldProps {
  className?: string,
  date: Date,
  label: ReactNode,
  onClick?: () => void,
  show?: DatePickerType,
  twoLines?: boolean,
}

export interface DataViewerToolbarProps<T> {
  cardsView: boolean,
  dataLength: number,
  extraButtons: ReactNodeOrFunctionType,
  headers: TableHeadersType<T>[],
  loading: boolean,
  onAllFilters: (values: FilterValuesType) => void,
  onReload?: () => void,
  rowsView: boolean,
  setViewMode: (viewMode: ViewModeType) => void,
  viewMode: ViewModeType,
}

export interface PaginationProps {
  total: number,
  page: number,
  pageSize: number,
  loading: boolean,
  pageSizeOptions: number[],
  jumpToPage: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
}
