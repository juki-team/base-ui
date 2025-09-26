import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { CSSProperties, Dispatch, FC, SetStateAction } from 'react';

export interface SortableItem<T> {
  key: string;
  value: T,
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
  index: number,
}

export type SortableItemComponent<T, U> = FC<SortableItemComponentProps<T, U>>;

export interface SortableItemsProps<T, U = undefined> {
  items: SortableItem<T>[],
  setItems?: Dispatch<SetStateAction<SortableItem<T>[]>>,
  onChange?: (items: SortableItem<T>[], activeItemKey: string) => (void | Promise<void>),
  className?: string,
  Cmp: SortableItemComponent<T, U>,
  props: U,
  horizontal?: boolean,
}
