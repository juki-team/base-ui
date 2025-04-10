import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { SortableItemsProps } from './types';

function SortableItem({ id, Cmp, item, props }: {
  id: string,
  Cmp: SortableItemsProps<any, any>['Cmp'],
  item: SortableItemsProps<any, any>['items'][number],
  props: SortableItemsProps<any, any>['props']
}) {
  
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({ id });
  const [ measuredBox, setMeasuredBox ] = useState({ height: 0, width: 0 });
  const localRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isDragging && localRef.current) {
      const rect = localRef.current.getBoundingClientRect();
      setMeasuredBox({ height: rect.height, width: rect.width });
    }
  }, [ isDragging ]);
  
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    background: 'white',
    position: isDragging ? 'relative' : undefined,
    zIndex: isDragging ? 1 : undefined,
    height: isDragging && measuredBox.height ? `${measuredBox.height}px` : undefined,
    width: isDragging && measuredBox.width ? `${measuredBox.width}px` : undefined,
  };
  
  return (
    <Cmp
      setNodeRef={(node) => {
        setNodeRef(node);
        localRef.current = node;
      }}
      // setNodeRef={setNodeRef}
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
      onDragEnd={({ active, over, ...props }) => {
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
