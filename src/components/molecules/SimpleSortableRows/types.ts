import { ReactNode, RefObject } from 'react';
import { ConnectDragPreview } from 'react-dnd';
import { ReactNodeOrFunctionP1Type } from '../../../types';

export type RowSortableItemContentType = ReactNodeOrFunctionP1Type<{
  dragComponentRef: RefObject<HTMLDivElement>,
  dragComponent: ReactNode,
  previewRef: RefObject<HTMLDivElement> | ConnectDragPreview,
  dataHandlerId: any,
  isDragging: boolean,
  isOver: boolean,
  index: number,
  key: string,
}>;

export interface RowSortableItem<T> {
  key: string;
  content: RowSortableItemContentType,
  value: T,
}

export interface DragItem {
  index: number,
  key: string,
  type: string,
}
