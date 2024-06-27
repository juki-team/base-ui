import { ReactNode, RefObject } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../../types';


export interface RowComponentProps<T> {
  rowKey: string,
  index: number,
  value: T,
  dragComponent: ReactNode,
  dragComponentRef: RefObject<HTMLDivElement>,
  // dataHandlerId: any,
  isDragging: boolean,
  isOver: boolean,
  isPreview: boolean,
}

export type RowSortableItemContentType = ReactNodeOrFunctionP1Type<{
  dragComponentRef: RefObject<HTMLDivElement>,
  dragComponent: ReactNode,
  // previewRef: RefObject<HTMLDivElement> | ConnectDragPreview,
  // dataHandlerId: any,
  isDragging: boolean,
  isOver: boolean,
  index: number,
  key: string,
  isPreview: boolean,
}>;

export interface RowSortableItem<T> {
  key: string;
  value: T,
}

export interface DragItem {
  index: number,
  key: string,
  type: string,
}
