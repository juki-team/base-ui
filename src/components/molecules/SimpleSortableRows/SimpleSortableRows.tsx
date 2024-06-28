// https://react-dnd.github.io/react-dnd/examples/sortable/simple
// https://react-dnd.github.io/react-dnd/examples/customize/handles-and-previews
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import React, { CSSProperties, FC, useCallback, useEffect, useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { useStableState } from '../../../hooks';
import { DragIcon } from '../../atoms';
import { DragItem, RowComponentProps, RowProps, RowSortableItem, SimpleSortableRowsProps } from './types';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  // width: '400px',
  height: '100%',
};

export function snapToGrid(x: number, y: number) {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [ snappedX, snappedY ];
}

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null, isSnapToGrid: boolean) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y
    ;[ x, y ] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

interface CustomDragLayerProps<T, U> {
  Cmp: FC<RowComponentProps<T, U>>,
  width: number,
}

export const CustomDragLayer = <T, U>({ Cmp, width }: CustomDragLayerProps<T, U>) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  
  function renderItem() {
    switch (itemType) {
      case 'row':
        return (
          <Cmp
            dragComponentRef={null as any}
            dragComponent={(
              <div style={{ cursor: 'move' }} className="jk-sortable-row-drag-icon jk-row">
                <DragIcon />
              </div>
            )}
            isDragging={true}
            isOver={false}
            index={item.index}
            rowKey={item.key}
            isPreview={true}
            value={item.value}
            props={item.props}
          />
        );
      default:
        return null;
    }
  }
  
  if (!isDragging) {
    return null;
  }
  return (
    <div style={{ ...layerStyles, width }}>
      <div
        style={getItemStyles(initialOffset, currentOffset, false)}
      >
        {renderItem()}
      </div>
    </div>
  );
};

export const Row = <T, U, >({
                              rowKey,
                              Cmp,
                              index,
                              moveRow,
                              value,
                              props,
                              setIsDraggingCount,
                            }: RowProps<T, U>) => {
  
  const ref = useRef<HTMLDivElement>(null);
  
  const [ { isOver }, drop ] = useDrop({
    accept: 'row',
    collect(monitor: DropTargetMonitor<DragItem, void>) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
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
  
  const [ { item, isDragging: isItemDragging }, drag, preview ] = useDrag({
    type: 'row',
    item: () => {
      return { key: rowKey, index, value, props };
    },
    collect: (monitor: DragSourceMonitor<RowSortableItem<T>>) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      item: monitor.getItem(),
    }),
  });
  
  drag(drop(ref));
  
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const isDragging = item?.key === rowKey;
  useEffect(() => {
    setIsDraggingCount(prevState => prevState + (isItemDragging ? 1 : -1));
  }, [ isItemDragging, setIsDraggingCount ]);
  
  return (
    <Cmp
      index={index}
      isDragging={isDragging}
      isPreview={false}
      isOver={isOver}
      rowKey={rowKey}
      value={value}
      props={props}
      dragComponent={
        <div ref={ref} style={{ cursor: 'move' }} className="jk-sortable-row-drag-icon jk-row">
          <DragIcon />
        </div>
      }
      dragComponentRef={ref}
    />
  );
};

export const SimpleSortableRows = <T, U = undefined>(properties: SimpleSortableRowsProps<T, U>) => {
  
  const { rows, setRows, className, Cmp, props, onDragEnd, onDragStart } = properties;
  
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
  const [ isDraggingCount, setIsDraggingCount ] = useStableState(rows.length);
  const { width = 0, ref } = useResizeDetector();
  const onDragStartRef = useRef(onDragStart);
  onDragStartRef.current = onDragStart;
  const onDragEndRef = useRef(onDragEnd);
  onDragEndRef.current = onDragEnd;
  
  const startedRef = useRef(false);
  
  useEffect(() => {
    if (isDraggingCount === 1) {
      onDragStartRef.current?.();
      startedRef.current = true;
    } else if (isDraggingCount === 0 && startedRef.current) {
      onDragEndRef.current?.();
      startedRef.current = false;
    }
  }, [ isDraggingCount, rows.length ]);
  
  return (
    <div className={classNames('jk-sortable-rows-container', className)} ref={ref}>
      <CustomDragLayer Cmp={Cmp} width={width} />
      {rows.map((row, i) => (
        <Row
          key={row.key}
          rowKey={row.key}
          index={i}
          id={row.key}
          Cmp={Cmp}
          moveRow={moveRow}
          value={row.value}
          props={props}
          setIsDraggingCount={setIsDraggingCount}
        />
      ))}
    </div>
  );
};
