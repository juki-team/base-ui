import type { GetRecordClassNameType, GetRecordStyleType, OnRecordClickType, TableHeadersType } from '../types';

/** columns grouped by card position (topLeft, top, center...) */
export type CardSections<T> = { [position: string]: TableHeadersType<T>[] };

export interface DataViewerCardProps<T> {
  cardWidth: number,
  index: number,
  data: T[],
  sections: CardSections<T>,
  fake: boolean,
  getRecordStyle: GetRecordStyleType<T> | undefined,
  getRecordClassName: GetRecordClassNameType<T> | undefined,
  onRecordClick: OnRecordClickType<T> | undefined,
  onRecordHover: OnRecordClickType<T> | undefined,
}

export interface CardRowVirtualizerFixedProps<T> {
  headers: TableHeadersType<T>[],
  data: T[],
  cardHeight: number,
  cardWidth: number,
  rowWidth: number,
  getRecordStyle: GetRecordStyleType<T> | undefined,
  getRecordClassName: GetRecordClassNameType<T> | undefined,
  onRecordClick: OnRecordClickType<T> | undefined,
  onRecordHover: OnRecordClickType<T> | undefined,
  // onRecordRender: OnRecordClickType<T> | undefined,
  expandedCards: boolean,
}
