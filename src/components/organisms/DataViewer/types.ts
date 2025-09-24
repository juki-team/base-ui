import { DataViewMode, Status } from '@juki-team/commons';
import { CSSProperties, Dispatch, FC, PropsWithChildren, ReactNode, RefObject, SetStateAction } from 'react';
import { UseResizeDetectorReturn } from 'react-resize-detector';
import {
  DataViewerRequesterGetUrlType,
  DataViewerRequestPropsType,
  DateDisplayType,
  ReactNodeOrFunctionP1Type,
  ReactNodeOrFunctionType,
  RequestFilterType,
  ViewPortSizeType,
} from '../../../types';
import { DatePickerDateFunType, OptionType } from '../../molecules/types';

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

export type GetRecordKeyType<T> = (props: { data: T[], index: number }) => string;
export type GetRecordStyleType<T> = (props: {
  data: T[],
  index: number,
  isCard: boolean,
  isStickySection: boolean
}) => CSSProperties;
export type GetRecordClassNameType<T> = (props: {
  data: T[],
  index: number,
  isCard: boolean,
  isStickySection: boolean
}) => string;
export type OnRecordClickType<T> = (props: { data: T[], index: number, isCard: boolean }) => void;

export type RecordHoveredIndexType = number | null;
export type SetRecordHoveredIndexType = Dispatch<SetStateAction<RecordHoveredIndexType>>;

export interface RowVirtualizerFixedProps<T> {
  data: T[],
  headers: DataViewerTableHeadersType<T>[],
  rowHeight: number,
  getRecordKey?: GetRecordKeyType<T>,
  getRecordStyle?: GetRecordStyleType<T>,
  getRecordClassName?: GetRecordClassNameType<T>,
  onRecordClick: OnRecordClickType<T> | undefined,
  onRecordHover: OnRecordClickType<T> | undefined,
  onRecordRender: OnRecordClickType<T> | undefined,
  gap: number,
  loading: boolean,
  setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  groups: DataViewerGroupsType<T>[],
  // setWithVerticalScroll: Dispatch<SetStateAction<boolean>>,
}

export type FilterTextOnlineType = { type: typeof FILTER_TEXT };
export type FilterTextOfflineType<T> = {
  type: typeof FILTER_TEXT,
  callbackFn: (props: { columnIndex: string, text: string }) => (record: T, index: number) => boolean
};
export type FilterTextAutoOfflineType<T> = {
  type: typeof FILTER_TEXT_AUTO,
  getValue?: (props: { record: T }) => string
};
export type FilterSelectOnlineType = { type: typeof FILTER_SELECT, options: OptionType<string>[] };
export type FilterSelectOfflineType<T> = {
  type: typeof FILTER_SELECT,
  options: OptionType<string>[],
  callbackFn: (props: {
    columnIndex: string,
    selectedOptions: OptionType<string>[]
  }) => (record: T, index: number) => boolean
};
export type FilterSelectAutoOfflineType<T> = {
  type: typeof FILTER_SELECT_AUTO,
  options: OptionType<string>[],
  getValue?: (props: { record: T }) => string
};
export type FilterDateOnlineType = {
  baseDate?: Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
  type: typeof FILTER_DATE,
}
export type FilterDateOfflineType<T> = {
  baseDate?: Date,
  callbackFn: (props: { columnIndex: string, selectedDate: Date }) => (record: T, index: number) => boolean,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
  type: typeof FILTER_DATE,
}
export type FilterDateAutoOfflineType<T> = {
  baseDate?: Date,
  getValue?: (props: { record: T }) => Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
  type: typeof FILTER_DATE_AUTO,
}
export type FilterDateRangeOnlineType = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
  type: typeof FILTER_DATE_RANGE,
}
export type FilterDateRangeOfflineType<T> = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  callbackFn: (props: {
    columnIndex: string,
    startSelectedDate: Date,
    endSelectedDate: Date
  }) => (record: T, index: number) => boolean,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
  type: typeof FILTER_DATE_RANGE,
}
export type FilterDateRangeAutoOfflineType<T> = {
  baseEndDate?: Date,
  baseStartDate?: Date,
  getValue?: (props: { record: T }) => Date,
  isDisabled?: DatePickerDateFunType,
  pickerType?: DateDisplayType,
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
  getFilter: () => string, // text
  type: typeof FILTER_TEXT,
  online: boolean,
};

export type TableHeaderFilterSelectType = {
  onFilter: (props: { columnIndex: string, selectedOptions: OptionType<string>[] }) => void,
  onReset: () => void,
  options: OptionType<string>[],
  getFilter: () => OptionType<string>[], // selectedOptions
  type: typeof FILTER_SELECT,
  online: boolean,
}

export type TableHeaderFilterDateType = {
  baseDate: Date,
  isDisabled: DatePickerDateFunType,
  onFilter: ((props: { columnIndex: string, selectedDate: Date }) => void),
  onReset: () => void,
  pickerType: DateDisplayType,
  getFilter: () => Date | null, // selectedDate
  type: typeof FILTER_DATE,
  online: boolean,
};

export type TableHeaderFilterDateRangeType = {
  baseEndDate: Date,
  baseStartDate: Date,
  // startSelectedDate: Date | null,
  // endSelectedDate: Date | null,
  getFilter: () => [ Date | null, Date | null ],
  isDisabled: DatePickerDateFunType,
  onFilter: ((props: { columnIndex: string, startSelectedDate: Date, endSelectedDate: Date }) => void),
  onReset: () => void,
  pickerType: DateDisplayType,
  type: typeof FILTER_DATE_RANGE,
  online: boolean,
};

export type TableHeaderFilterType =
  TableHeaderFilterTextType
  | TableHeaderFilterSelectType
  | TableHeaderFilterDateType
  | TableHeaderFilterDateRangeType;

export type CardPositionType =
  'topLeft' | 'top' | 'topRight'
  | 'upperLeft' | 'upper' | 'upperRight'
  | 'centerLeft' | 'center' | 'centerRight'
  | 'lowerLeft' | 'lower' | 'lowerRight'
  | 'bottomLeft' | 'bottom' | 'bottomRight';

export type TableHeadType<T> = ReactNodeOrFunctionP1Type<{ header: DataViewerTableHeadersType<T>, data: T[] }>;

export type TableSortOrderType = 1 | -1 | 0;
export type TableSortOnSortType = (props: { columnIndex: string }) => void;

export type TableSortType = {
  onSort: TableSortOnSortType,
  getOrder: () => TableSortOrderType,
  online: boolean,
}

export type TableVisibleType = {
  onToggle: () => void,
  getVisible: () => boolean,
}

export type TableHeadFieldType<T> =
  ((props: { record: T, columnIndex: string, recordIndex: number, isCard: boolean }) => ReactNode)
  | ReactNode;

export type TableHeadFieldProps<T> = { record: T, columnIndex: string, recordIndex: number, isCard: boolean };

export type TableHeadCmpFieldType<T> = FC<TableHeadFieldProps<T>>;

export type TableHeadersType<T> = {
  cardPosition?: CardPositionType,
  Field: TableHeadCmpFieldType<T>,
  filter?: TableHeaderFilterType,
  head?: TableHeadType<T>,
  index: string,
  minWidth?: number,
  sort?: TableSortType,
  visible: TableVisibleType,
  sticky?: boolean,
  headClassName?: string,
  group?: string,
}

export type DataViewerTableHeadersType<T> = TableHeadersType<T> & {
  minWidth: number,
  width: number,
  accumulatedWidth: number,
  headIndex: number,
};
type RowsType = { height?: number };
type CardsType = { height?: number, width?: number, expanded?: boolean };

type PaginationDataType = {
  withPagination: boolean,
  total: number,
  page: number,
  pageSize: number,
  pageSizeOptions: number[],
  jumpToPage: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
}

export type ShowFilterDrawerType = 'open' | 'close';

export interface DisplayDataViewerProps<T> {
  viewPortSize?: ViewPortSizeType,
  cards?: CardsType,
  cardsView: boolean,
  data: T[],
  extraNodes: ReactNodeOrFunctionType[],
  extraNodesFloating?: boolean,
  headers: DataViewerTableHeadersType<T>[],
  groups: DataViewerGroupsType<T>[],
  setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  loading: boolean,
  initializing: boolean,
  onAllFilters: (values: FilterValuesType) => void,
  onReload: (() => void) | null,
  showFilterDrawerKey: string,
  rows?: RowsType,
  rowsView: boolean,
  setViewMode: (viewMode: DataViewMode) => void,
  viewMode: DataViewMode,
  getRecordKey?: GetRecordKeyType<T>,
  pagination: PaginationDataType,
  filterKey: string,
  filters: RequestFilterType,
  getRecordStyle?: GetRecordStyleType<T>,
  getRecordClassName?: GetRecordClassNameType<T>,
  onRecordClick?: OnRecordClickType<T>,
  onRecordHover?: OnRecordClickType<T>,
  onRecordRender?: OnRecordClickType<T>,
  downloads: DataViewerDownloadType<string>[],
  requestProps: DataViewerRequestPropsType,
}

export type DataViewerHeaderSortOnlineType = true;
export type DataViewerHeaderSortOfflineType<T> = {
  compareFn: (props: { columnIndex: string }) => (recordA: T, recordB: T) => number
};
export type DataViewerHeaderSortType<T> = DataViewerHeaderSortOnlineType | DataViewerHeaderSortOfflineType<T>;

export type DataViewerHeadersType<T> = {
  head?: TableHeadType<T>,
  Field: TableHeadCmpFieldType<T>,
  index: string,
  minWidth?: number,
  sort?: DataViewerHeaderSortType<T>,
  filter?: JkTableHeaderFilterType<T>,
  cardPosition?: CardPositionType,
  sticky?: boolean,
  headClassName?: string,
  group?: string,
}

// export type URLSearchParamsInitType = string | [string, string][] | Record<string, string | string[]> | URLSearchParams;
// export type SetSearchParamsType = ((nextInit: URLSearchParamsInitType, navigateOptions?: ({ replace?: boolean | undefined, state?: any } | undefined)) => void);

export type setURLSearchParams = (params: URLSearchParams) => void;

export type DataViewerRequestType = (props: DataViewerRequestPropsType) => void;

export type DataViewerDownloadType<T> = {
  value: T,
  label: ReactNode,
  getUrl: (props: DataViewerRequestPropsType) => string,
  getFilename: (props: DataViewerRequestPropsType) => string,
};

export type DataViewerGroupsType<T> = {
  key: string,
  label?: TableHeadType<T>,
};

export interface DataViewerProps<T> {
  cards?: CardsType,
  cardsView?: boolean,
  className?: string,
  data: T[],
  extraNodes?: ReactNodeOrFunctionType[],
  extraNodesFloating?: boolean,
  headers: DataViewerHeadersType<T>[],
  downloads?: DataViewerDownloadType<string>[],
  groups?: DataViewerGroupsType<T>[],
  initialViewMode?: DataViewMode,
  name?: string,
  request?: DataViewerRequestType,
  rows?: RowsType,
  rowsView?: boolean,
  setLoaderStatusRef?: (setLoaderStatus: SetLoaderStatusType) => void,
  reloadRef?: (reload: ReloadType) => void,
  totalData?: number,
  pageSizeOptions?: number[],
  getRecordKey?: GetRecordKeyType<T>,
  getPageQueryParam?: (name: string) => string,
  getPageSizeQueryParam?: (name: string) => string,
  getSortQueryParam?: (name: string) => string,
  getFilterQueryParam?: (name: string) => string,
  getViewModeQueryParam?: (name: string) => string,
  getShowFilterDrawerQueryParam?: (name: string) => string,
  getVisiblesQueryParam?: (name: string) => string,
  getRecordStyle?: GetRecordStyleType<T>,
  getRecordClassName?: GetRecordClassNameType<T>,
  onRecordClick?: OnRecordClickType<T>,
  onRecordHover?: OnRecordClickType<T>,
  onRecordRender?: OnRecordClickType<T>,
  setDataTableRef?: (data: T[]) => void,
  initializing?: boolean,
}

export type LoaderStatusType = Status;
export type SetLoaderStatusType = (status: (Status | ((props: LoaderStatusType) => LoaderStatusType))) => void;
export type ReloadType = () => void;

export interface TableHeadProps<T> {
  headers: DataViewerTableHeadersType<T>[],
  setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  loading: boolean,
  gap: number,
  headerRef: UseResizeDetectorReturn<any>['ref'],
  topHeaders: DataViewerTableHeadersType<T>[],
  rightBorders: number[],
  hasScrollTop: boolean,
}

export interface FilterDrawerProps<T> {
  headers: DataViewerTableHeadersType<T>[],
  // setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  isOpen: boolean,
  onClose: () => void,
  onFilter: (values: FilterValuesType) => void,
  onResetFilters: () => void,
}

export type FilterValuesType = { [key: string]: string | OptionType<string>[] | Date | [ Date | null, Date | null ] };

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
  show?: DateDisplayType,
  twoLines?: boolean,
  withDayName?: boolean,
}

export interface DataViewerToolbarProps<T> {
  cardsView: boolean,
  dataLength: number,
  extraNodes: ReactNodeOrFunctionType[],
  extraNodesFloating: boolean,
  headers: DataViewerTableHeadersType<T>[],
  toolbarRef: RefObject<HTMLDivElement | null>,
  // setHeaders: Dispatch<SetStateAction<DataViewerTableHeadersType<T>[]>>,
  loading: boolean,
  initializing: boolean,
  onAllFilters: (values: FilterValuesType) => void,
  onReload: (() => void) | null,
  rowsView: boolean,
  setViewMode: (viewMode: DataViewMode, replace?: boolean) => void,
  viewMode: DataViewMode,
  pagination: PaginationDataType,
  showFilterDrawerKey: string,
  filterKey: string,
  filters: RequestFilterType,
  requestProps: DataViewerRequestPropsType,
  downloads: DataViewerDownloadType<string>[],
  // withVerticalScroll: boolean,
}

export interface PaginationProps {
  dataLength: number,
  total: number,
  page: number,
  pageSize: number,
  loading: boolean,
  initializing: boolean,
  pageSizeOptions: number[],
  jumpToPage: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
  isOnToolbar?: boolean,
}

export interface PagedDataViewerProps<T, V = T> {
  cards?: { height?: number, width?: number, expanded?: boolean },
  rows?: { height?: number, width?: number },
  headers: DataViewerHeadersType<T>[],
  name: string,
  toRow?: (row: V, index: number) => T,
  getUrl: DataViewerRequesterGetUrlType,
  refreshInterval?: number,
  extraNodes?: ReactNodeOrFunctionType[],
  getRowKey?: GetRecordKeyType<T>
  onRecordClick?: OnRecordClickType<T>,
  onRecordHover?: OnRecordClickType<T>,
  onRecordRender?: OnRecordClickType<T>,
  getRecordStyle?: GetRecordStyleType<T>;
  dependencies?: any[],
  downloads?: DataViewerProps<T>['downloads'],
}

export interface Scroll {
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export interface TextHeadCellProps {
  text: string | ReactNode,
  className?: string,
}
