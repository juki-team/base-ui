import { SCROLL_WIDTH } from '../../../../../constants';
import type {
  DataViewerGroupsType,
  DataViewerTableHeadersType,
  GetRecordClassNameType,
  GetRecordKeyType,
  GetRecordStyleType,
  OnRecordClickType,
} from '../types';
import { RowVirtualizerFixed } from './RowVirtualizerFixed';

interface ViewContainerRowsProps<T> {
  headers: DataViewerTableHeadersType<T>[];
  viewContainerWidth: number;
  rowHeight: number;
  data: T[];
  loading: boolean;
  getRecordKey: GetRecordKeyType<T> | undefined;
  getRecordStyle: GetRecordStyleType<T> | undefined;
  getRecordClassName: GetRecordClassNameType<T> | undefined;
  onRecordClick: OnRecordClickType<T> | undefined;
  onRecordHover: OnRecordClickType<T> | undefined;
  groups: DataViewerGroupsType<T>[];
  virtualizerOverscan: number;
  focusRowKey?: string;
}

const gap = 4;

// Column widths are derived inside RowVirtualizerFixed (computeColumnLayout); there is no width state to
// sync here anymore, which used to cost two extra renders of the whole table per headers/size change.
export const ViewContainerRows = <T,>(props: ViewContainerRowsProps<T>) => {
  const {
    headers,
    viewContainerWidth,
    rowHeight,
    loading,
    data,
    getRecordKey,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    onRecordHover,
    groups,
    virtualizerOverscan,
    focusRowKey,
  } = props;

  return (
    <RowVirtualizerFixed<T>
      data={data}
      headers={headers}
      rowHeight={rowHeight}
      getRecordKey={getRecordKey}
      getRecordClassName={getRecordClassName}
      getRecordStyle={getRecordStyle}
      onRecordClick={onRecordClick}
      onRecordHover={onRecordHover}
      gap={gap}
      loading={loading}
      availableWidth={Math.max((viewContainerWidth || 0) - SCROLL_WIDTH, 0)}
      groups={groups}
      virtualizerOverscan={virtualizerOverscan}
      focusRowKey={focusRowKey}
    />
  );
};
