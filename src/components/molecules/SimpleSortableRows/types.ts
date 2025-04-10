import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { CSSProperties, Dispatch, FC, MutableRefObject, ReactNode, RefObject, SetStateAction } from 'react';

export interface RowComponentProps<T, U> {
  rowKey: string,
  index: number,
  value: T,
  props?: U,
  dragComponent: ReactNode,
  dragComponentRef: RefObject<HTMLDivElement | null>,
  // dataHandlerId: any,
  isDragging: boolean,
  isOver: boolean,
  isPreview: boolean,
}

export interface SortableItem<T> {
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
  setIsDragging: Dispatch<SetStateAction<{ [key: string]: boolean }>>,
  rowDraggingRef: MutableRefObject<null | string>,
}

export interface SimpleSortableRowsProps<T, U = undefined> {
  rows: SortableItem<T>[],
  setRows: Dispatch<SetStateAction<SortableItem<T>[]>>,
  className?: string,
  Cmp: FC<RowComponentProps<T, U>>,
  props: U,
  onDragStart?: (rowKey: string | null) => void,
  onDragEnd?: (rowKey: string | null) => void,
}

export interface SortableItemComponentProps<T, U> {
  style: CSSProperties,
  attributes: DraggableAttributes,
  listeners: SyntheticListenerMap | undefined,
  item: SortableItem<T>,
  props: U,
  setNodeRef: (node: (HTMLElement | null)) => void,
  isDragging: boolean,
  isOver: boolean,
}

export type SortableItemComponent<T, U> = FC<SortableItemComponentProps<T, U>>;

export interface SortableItemsProps<T, U = undefined> {
  items: SortableItem<T>[],
  setItems?: Dispatch<SetStateAction<SortableItem<T>[]>>,
  onChange?: (items: SortableItem<T>[], activeItemKey: string) => (void | Promise<void>),
  className?: string,
  Cmp: SortableItemComponent<T, U>,
  props: U,
  // onDragStart?: (rowKey: string | null) => void,
  // onDragEnd?: (rowKey: string | null) => void,
  horizontal?: boolean,
}
