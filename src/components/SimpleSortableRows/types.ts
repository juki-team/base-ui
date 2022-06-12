import { ReactNode, RefObject } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../types';

export type RowSortableItemContentType = ReactNodeOrFunctionP1Type<{
  dragComponentRef: RefObject<HTMLDivElement>,
  dragComponent: ReactNode,
  previewRef: RefObject<HTMLDivElement>,
  dataHandlerId: any,
  isDragging: boolean,
}>;

export interface RowSortableItem<T> {
  id: number;
  content: RowSortableItemContentType,
  value?: T,
}

export interface DragItem {
  index: number,
  id: number,
  type: string,
}
