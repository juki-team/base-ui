import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties } from 'react';
import { SortableItemsProps } from './types';

function SortableItem({ id, Cmp, item, props }: {
  id: string,
  Cmp: SortableItemsProps<any, any>['Cmp'],
  item: SortableItemsProps<any, any>['items'][number],
  props: SortableItemsProps<any, any>['props']
}) {
  
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
    />
  );
}

export const SortableItems = <T, U = undefined>(properties: SortableItemsProps<T, U>) => {
  
  const { items, onChange, props, Cmp, horizontal } = properties;
  
  const sensors = useSensors(
    useSensor(PointerSensor),
  );
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex(a => a.key === active.id);
          const newIndex = items.findIndex(a => a.key === over.id);
          onChange?.(arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext
        items={items.map(({ key }) => key)}
        strategy={horizontal ? horizontalListSortingStrategy : verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem key={item.key} id={item.key} Cmp={Cmp} props={props} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
