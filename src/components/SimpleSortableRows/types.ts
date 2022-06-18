import { ReactNode, RefObject } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../types';

export type RowSortableItemContentType = ReactNodeOrFunctionP1Type<{
  dragComponentRef: RefObject<HTMLDivElement>,
  dragComponent: ReactNode,
  previewRef: RefObject<HTMLDivElement>,
  dataHandlerId: any,
  isDragging: boolean,
  index: number,
  key: string,
}>;

export interface RowSortableItem<T> {
  key: string;
  content: RowSortableItemContentType,
  value?: T,
}

export interface DragItem {
  index: number,
  key: string,
  type: string,
}
