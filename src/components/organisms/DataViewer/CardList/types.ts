import { type CSSProperties } from 'react';
import type { GetRecordClassNameType, GetRecordStyleType, OnRecordClickType, TableHeadersType } from '../types';

export interface DataViewerCardProps<T> {
  cardWidth: number,
  index: number,
  data: T[],
  headers: TableHeadersType<T>[],
  fake: boolean,
  cardClassName: string,
  cardStyle: CSSProperties,
  onCardClick: () => void,
  onCardHover: () => void,
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
  onRecordRender: OnRecordClickType<T> | undefined,
  expandedCards: boolean,
}
