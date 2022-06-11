import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useCallback, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'row',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
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
      moveCard(dragIndex, hoverIndex);
      
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
  
  const opacity = isDragging ? 0.6 : 1;
  drag(drop(ref));
  return (
    <div ref={preview} className="jk-row left" style={{  opacity }} data-handler-id={handlerId}>
      <div ref={ref} style={{ cursor: 'move' }}>icono</div>
      <div>{text}</div>
    </div>
  );
};

interface Item {
  id: number;
  text: string;
}

export const SimpleSortableRows = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Write a cool JS library' },
    { id: 2, text: 'Make it generic enough' },
    { id: 3, text: 'Write README' },
    { id: 4, text: 'Create some examples' },
    { id: 5, text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)' },
    { id: 6, text: '???' },
    { id: 7, text: 'PROFIT' },
  ]);
  
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    );
  }, []);
  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    [],
  );
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div>
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </DndProvider>
    </div>
  );
};