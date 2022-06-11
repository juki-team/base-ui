// https://react-dnd.github.io/react-dnd/examples/sortable/simple
// https://react-dnd.github.io/react-dnd/examples/customize/handles-and-previews
import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import React, { Dispatch, lazy, SetStateAction, useCallback, useRef } from 'react';
// import { DndProvider, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { renderReactNodeOrFunction } from '../../helpers';
import { ReactNodeOrFunctionType } from '../../types';
import { DragIcon } from '../graphics';
import { DragItem, RowItem } from './types';

const Test = lazy(() => import('./ReactDndTest'));

console.log({ Test });

(async () => {
  // Dynamically imported module (runtime)
  const { export1, export2 } = await import('react-dnd');
})();
export const Row = ({
  id,
  content,
  index,
  moveRow,
}: { id: number, content: ReactNodeOrFunctionType, index: number, moveRow: (i: number, j: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'row',
    collect(monitor: DropTargetMonitor<DragItem, void>) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor<DragItem, void>) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'row',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));
  
  return (
    <div ref={preview} className="jk-sortable-row-container jk-row left" style={{ opacity }} data-handler-id={handlerId}>
      <div ref={ref} style={{ cursor: 'move' }} className="jk-sortable-row-drag-icon jk-row"><DragIcon /></div>
      <div className="jk-sortable-row-content">{renderReactNodeOrFunction(content)}</div>
    </div>
  );
};

export const SimpleSortableRows = ({ rows, setRows }: { rows: RowItem[], setRows: Dispatch<SetStateAction<RowItem[]>> }) => {
  
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevCards: RowItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as RowItem],
        ],
      }),
    );
  }, [setRows]);
  
  const renderRow = useCallback(
    (row: { id: number; content: ReactNodeOrFunctionType }, index: number) => {
      return (
        <Row
          key={row.id}
          index={index}
          id={row.id}
          content={row.content}
          moveRow={moveRow}
        />
      );
    }, [moveRow]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      {rows.map((row, i) => renderRow(row, i))}
    </DndProvider>
  );
};
