import { TableHeadersWithWidthType } from '../types';

export interface DataViewerCardProps<T> {
  cardWidth: number,
  index: number,
  data: T[],
  headers: TableHeadersWithWidthType<T>[],
  fake: boolean,
}

export interface CardRowVirtualizerFixedProps<T> {
  headers: TableHeadersWithWidthType<T>[],
  data: T[],
  cardHeight: number,
  cardWidth: number,
  rowWidth: number,
}
