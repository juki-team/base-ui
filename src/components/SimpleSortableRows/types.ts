import { ReactNode, RefObject } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../types';

export type RowSortableItemContentType = ReactNodeOrFunctionP1Type<{
  dragComponentRef: RefObject<HTMLDivElement>,
  dragComponent: ReactNode,
  previewRef: RefObject<HTMLDivElement>,
  dataHandlerId: any,
  isDragging: boolean,
}>;

export interface RowSortableItem {
  id: number;
  content: RowSortableItemContentType,
}

export interface DragItem {
  index: number,
  id: number,
  type: string,
}
