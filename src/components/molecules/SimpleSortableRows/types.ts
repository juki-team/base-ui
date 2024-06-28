import { Dispatch, FC, MutableRefObject, ReactNode, RefObject, SetStateAction } from 'react';

export interface RowComponentProps<T, U> {
  rowKey: string,
  index: number,
  value: T,
  props?: U,
  dragComponent: ReactNode,
  dragComponentRef: RefObject<HTMLDivElement>,
  // dataHandlerId: any,
  isDragging: boolean,
  isOver: boolean,
  isPreview: boolean,
}

export interface RowSortableItem<T> {
  key: string;
  value: T,
}

export interface DragItem {
  index: number,
  key: string,
  type: string,
}

export interface RowProps<T, U> {
  rowKey: string,
  id: string,
  Cmp: FC<RowComponentProps<T, U>>,
  index: number,
  moveRow: (i: number, j: number) => void,
  value: T,
  props: U,
  setIsDraggingCount: Dispatch<SetStateAction<number>>,
  rowDraggingRef: MutableRefObject<null | string>,
}

export interface SimpleSortableRowsProps<T, U = undefined> {
  rows: RowSortableItem<T>[],
  setRows: Dispatch<SetStateAction<RowSortableItem<T>[]>>,
  className?: string,
  Cmp: FC<RowComponentProps<T, U>>,
  props: U,
  onDragStart?: (rowKey: string | null) => void,
  onDragEnd?: (rowKey: string | null) => void,
}
