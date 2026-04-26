import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type CSSProperties, memo } from 'react';
import type { SortableItemsProps } from './types';

interface SortableItemProps<T, U> {
  id: string;
  index: number;
  Cmp: SortableItemsProps<T, U>['Cmp'];
  item: SortableItemsProps<T, U>['items'][number];
  props: SortableItemsProps<T, U>['props'];
}

function SortableItemCmp<T, U>({ id, Cmp, item, props, index }: SortableItemProps<T, U>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <Cmp
      setNodeRef={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      item={item}
      props={props}
      isDragging={isDragging}
      isOver={isOver}
      index={index}
    />
  );
}

const SortableItem = memo(SortableItemCmp) as typeof SortableItemCmp;

export default function SortableItems<T, U = undefined>(properties: SortableItemsProps<T, U>) {
  const { items, setItems, onChange, props, Cmp, horizontal } = properties;

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex((a) => a.key === active.id);
          const newIndex = items.findIndex((a) => a.key === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          setItems?.(newItems);
          onChange?.(newItems, active.id as string);
        }
      }}
    >
      <SortableContext
        items={items.map(({ key }) => key)}
        strategy={horizontal ? horizontalListSortingStrategy : verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem key={item.key} id={item.key} Cmp={Cmp} props={props} item={item} index={index} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export const SortableItemsImpl = SortableItems;
