import { CSSProperties } from 'react';
import {
  GetRecordClassNameType,
  GetRecordStyleType,
  OnRecordClickType,
  RecordHoveredIndexType,
  SetRecordHoveredIndexType,
  TableHeadersWithWidthType,
} from '../types';

export interface DataViewerCardProps<T> {
  cardWidth: number,
  index: number,
  data: T[],
  headers: TableHeadersWithWidthType<T>[],
  fake: boolean,
  cardClassName: string,
  cardStyle: CSSProperties,
  setRecordHoveredIndex: SetRecordHoveredIndexType,
  recordHoveredIndex: RecordHoveredIndexType,
  onCardClick: () => void,
}

export interface CardRowVirtualizerFixedProps<T> {
  headers: TableHeadersWithWidthType<T>[],
  data: T[],
  cardHeight: number,
  cardWidth: number,
  rowWidth: number,
  getRecordStyle?: GetRecordStyleType<T>,
  getRecordClassName?: GetRecordClassNameType<T>,
  onRecordClick?: OnRecordClickType<T>,
  setRecordHoveredIndex: SetRecordHoveredIndexType,
  recordHoveredIndex: RecordHoveredIndexType,
  expandedCards: boolean,
}
