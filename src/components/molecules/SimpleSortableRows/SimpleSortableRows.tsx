// https://react-dnd.github.io/react-dnd/examples/sortable/simple
// https://react-dnd.github.io/react-dnd/examples/customize/handles-and-previews
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
// import { useDrag } from 'react-dnd/dist/hooks/useDrag';
// import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { DragIcon } from '../../atoms';
import { DragItem, RowSortableItem, RowSortableItemContentType } from './types';

// const DndProvider = lazy(() => import('react-dnd').then(module => ({ default: module.DndProvider })));

interface TestProps {
  key: string,
  content: RowSortableItemContentType,
  index: number,
  moveRow: (i: number, j: number) => void,
  useDrop: any,
  useDrag: any,
}

export const Test = ({ key, content, index, moveRow }: TestProps) => {
  
  const ref = useRef<HTMLDivElement>(null);
  
  const [ { handlerId }, drop ] = useDrop({
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
  
  const [ { isDragging }, drag, preview ] = useDrag({
    type: 'row',
    item: () => {
      return { key, index };
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
        dragComponent: (
          <div ref={ref} style={{ cursor: 'move' }} className="jk-sortable-row-drag-icon jk-row">
            <DragIcon />
          </div>
        ),
        previewRef: preview,
        dataHandlerId: handlerId,
        isDragging,
        index,
        key,
      })}
    </>
  );
};

interface RowProps {
  id: string,
  content: RowSortableItemContentType,
  index: number,
  moveRow: (i: number, j: number) => void,
}

export const Row = ({ id: key, content, index, moveRow }: RowProps) => {
  
  const useDragRef = useRef<any>();
  const useDropRef = useRef();
  const [ render, setRender ] = useState(0);
  useEffect(() => {
    // useDragRef.current = require('react-dnd').useDrag;
    // useDropRef.current = require('react-dnd').useDrop;
    setRender(1);
  }, []);
  
  if (!render) {
    return null;
  }
  
  return (
    <Test
      key={key}
      content={content}
      index={index}
      moveRow={moveRow}
      useDrop={useDropRef.current}
      useDrag={useDragRef.current}
    />
  );
};

export interface SimpleSortableRowsProps<T> {
  rows: RowSortableItem<T>[],
  setRows: Dispatch<SetStateAction<RowSortableItem<T>[]>>,
  className?: string
}

export const SimpleSortableRows = <T, >({ rows, setRows, className }: SimpleSortableRowsProps<T>) => {
  
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevCards: RowSortableItem<T>[]) =>
      update(prevCards, {
        $splice: [
          [ dragIndex, 1 ],
          [ hoverIndex, 0, prevCards[dragIndex] as RowSortableItem<T> ],
        ],
      }),
    );
  }, [ setRows ]);
  
  // const HTML5BackendRef = useRef<any>();
  // const [ render, setRender ] = useState(0);
  useEffect(() => {
    // HTML5BackendRef.current = require('react-dnd-html5-backend').HTML5Backend;
    // setRender(1);
  }, []);
  
  return (
    <div className={classNames('jk-sortable-rows-container', className)}>
      {rows.map((row, i) => (
        <Row
          key={row.key}
          index={i}
          id={row.key}
          content={row.content}
          moveRow={moveRow}
        />
      ))}
    </div>
  );
  
  // return (
  //   !!render && HTML5BackendRef.current && <DndProvider backend={HTML5BackendRef.current}>
  //     <div className={classNames('jk-sortable-rows-container', className)}>
  //       {rows.map((row, i) => (
  //         <Row
  //           key={row.key}
  //           index={i}
  //           id={row.key}
  //           content={row.content}
  //           moveRow={moveRow}
  //         />
  //       ))}
  //     </div>
  //   </DndProvider>
  // );
};
