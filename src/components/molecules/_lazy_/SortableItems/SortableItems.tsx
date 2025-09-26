import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, memo } from 'react';
import { SortableItemsProps } from './types';

interface SortableItemProps {
  id: string,
  index: number,
  Cmp: SortableItemsProps<any, any>['Cmp'],
  item: SortableItemsProps<any, any>['items'][number],
  props: SortableItemsProps<any, any>['props'],
}

function SortableItemCmp({ id, Cmp, item, props, index }: SortableItemProps) {
  
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

const SortableItem = memo(SortableItemCmp);

export default function SortableItems<T, U = undefined>(properties: SortableItemsProps<T, U>) {
  
  const { items, setItems, onChange, props, Cmp, horizontal } = properties;
  
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
