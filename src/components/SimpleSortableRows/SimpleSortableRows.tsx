// https://react-dnd.github.io/react-dnd/examples/sortable/simple
// https://react-dnd.github.io/react-dnd/examples/customize/handles-and-previews
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import React, { Dispatch, lazy, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
// import { useDrag } from 'react-dnd/dist/hooks/useDrag';
// import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { DropTargetMonitor } from 'react-dnd/dist/types/monitors.js';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { DragIcon } from '../graphics';
import { DragItem, RowSortableItem, RowSortableItemContentType } from './types';

const DndProvider = lazy(() => import('react-dnd').then(module => ({ default: module.DndProvider })));
// const HTML5Backend = lazy(() => import('react-dnd-html5-backend').then(module => ({ default: module.HTML5Backend })));
// const useDrag = lazy(() => import('react-dnd').then(module => ({ default: module.useDrag })));
// const useDrop = lazy(() => import('react-dnd').then(module => ({ default: module.useDrop })));

export const Test = ({
  id,
  content,
  index,
  moveRow,
  useDrop,
  useDrag,
}: { id: number, content: RowSortableItemContentType, index: number, moveRow: (i: number, j: number) => void, useDrop: any, useDrag: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
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
  
  drag(drop(ref));
  
  return (
    <>
      {renderReactNodeOrFunctionP1(content, {
        dragComponentRef: ref,
        dragComponent: <div ref={ref} style={{ cursor: 'move' }} className="jk-sortable-row-drag-icon jk-row"><DragIcon /></div>,
        previewRef: preview,
        dataHandlerId: handlerId,
        isDragging,
      })}
    </>
  );
};

export const Row = ({
  id,
  content,
  index,
  moveRow,
}: { id: number, content: RowSortableItemContentType, index: number, moveRow: (i: number, j: number) => void }) => {
  
  const useDragRef = useRef<any>();
  const useDropRef = useRef();
  const [render, setRender] = useState(0);
  useEffect(() => {
    useDragRef.current = require('react-dnd').useDrag;
    useDropRef.current = require('react-dnd').useDrop;
    setRender(1);
  }, []);
  return !!render ? <Test id={id} content={content} index={index} moveRow={moveRow} useDrop={useDropRef.current}
                          useDrag={useDragRef.current} /> : null;
};

const SimpleSortableRows = ({
  rows,
  setRows,
  className,
}: { rows: RowSortableItem[], setRows: Dispatch<SetStateAction<RowSortableItem[]>>, className?: string }) => {
  
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevCards: RowSortableItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as RowSortableItem],
        ],
      }),
    );
  }, [setRows]);
  
  const renderRow = useCallback((row: { id: number; content: RowSortableItemContentType }, index: number) => {
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
  const HTML5BackendRef = useRef<any>();
  const [render, setRender] = useState(0);
  useEffect(() => {
    HTML5BackendRef.current = require('react-dnd-html5-backend').HTML5Backend;
    setRender(1);
  }, []);
  
  return (
    !!render && HTML5BackendRef.current && <DndProvider backend={HTML5BackendRef.current}>
      <div className={classNames('jk-sortable-rows-container', className)}>
        {rows.map((row, i) => renderRow(row, i))}
      </div>
    </DndProvider>
  );
};

export default SimpleSortableRows;
