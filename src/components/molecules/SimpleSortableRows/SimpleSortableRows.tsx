// https://react-dnd.github.io/react-dnd/examples/sortable/simple
// https://react-dnd.github.io/react-dnd/examples/customize/handles-and-previews
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import React, { CSSProperties, FC, useCallback, useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { classNames } from '../../../helpers';
import { DragIcon } from '../../atoms';
import { DragItem, RowComponentProps, RowProps, RowSortableItem, SimpleSortableRowsProps } from './types';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
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
}

export const CustomDragLayer = <T, U>({ Cmp }: CustomDragLayerProps<T, U>) => {
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
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, false)}
      >
        {renderItem()}
      </div>
    </div>
  );
};

export const Row = <T, U, >({ rowKey, Cmp, index, moveRow, value, props }: RowProps<T, U>) => {
  
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
  
  const [ { item }, drag, preview ] = useDrag({
    type: 'row',
    item: () => {
      return { key: rowKey, index, value, props };
    },
    collect: (monitor: any) => ({
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
  
  return (
    <Cmp
      index={index}
      isDragging={item?.key === rowKey}
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

export const SimpleSortableRows = <T, U = undefined>({
                                                       rows,
                                                       setRows,
                                                       className,
                                                       Cmp,
                                                       props,
                                                     }: SimpleSortableRowsProps<T, U>) => {
  
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
  
  return (
    <div className={classNames('jk-sortable-rows-container', className)}>
      <CustomDragLayer Cmp={Cmp} />
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
        />
      ))}
    </div>
  );
};
