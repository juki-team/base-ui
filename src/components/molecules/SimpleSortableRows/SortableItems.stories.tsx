import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { SortableItems as SortableItemsComponent } from './SortableItems';
import { SortableItem, SortableItemComponent } from './types';

export default {
  component: SortableItemsComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

// const getStyles = ({ isDragging, isPreview }: { isDragging: boolean, isPreview: boolean }) => {
//   return (
//     {
//       opacity: (isDragging && !isPreview) ? 0 : 1,
//     }
//   );
// };

const Component: SortableItemComponent<string, { otherValue: string }> = ({
                                                                            style,
                                                                            attributes,
                                                                            listeners,
                                                                            item,
                                                                            props,
                                                                            isOver,
                                                                            isDragging,
                                                                            setNodeRef,
                                                                          }) => {
  
  const test = new Array(Math.round(+(item.key) * 5)).fill(0).map((_, i) => i);
  
  return (
    <div
      // className="jk-row left gap bc-we"
      // style={{ opacity: isDragging && !isPreview ? 0 : 1 }}
      ref={setNodeRef}
      style={{ ...style, border: '1px solid black' }}
      {...attributes}
      // {...listeners}
      // style={{ position: undefined}}
    >
      hola
      {item.key}
      {test.map((_, i) => (
        <div>{i}</div>
      ))}
      {isOver && 'isOver'}
      {isDragging && 'isDragging'}
      {/*{index}*/}
      <div {...listeners} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        gra
      </div>
      {JSON.stringify(style)}
      {/*{dragComponent}*/}
      {/*  {value}*/}
      {/*  <div className={classNames({ 'bc-er': isDragging })}>isD</div>*/}
      {/*  <div className={classNames({ 'bc-er': isPreview })}>isP</div>*/}
      {/*  <div className={classNames({ 'bc-er': isOver })}>isO</div>*/}
      {/*{rowKey}*/}
      {/*{JSON.stringify(props)}*/}
    </div>
  );
};

export const SimpleSortableRows = () => {
  const [ items, setItems ] = useState<SortableItem<string>[]>([
    { key: '1', value: '111' },
    {
      key: '2',
      value: '222',
    },
    {
      key: '3',
      
      value: '333',
    },
    {
      key: '3.5',
      value: '444',
    },
    { key: '4', value: '555' },
    {
      key: '5',
      
      value: '666',
    },
    { key: '6', value: '777' },
    { key: '7', value: '888' },
  ]);
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px', width: '400px', overflow: 'auto' }}>
        <SortableItemsComponent<string, { otherValue: string }>
          items={items}
          onChange={setItems}
          Cmp={Component}
          // props={undefined}
          props={{ otherValue: 'test' }}
          // onDragEnd={(rowKey) => {
          //   console.info('onDragEnd', { rowKey });
          // }}
          // onDragStart={(rowKey) => {
          //   console.info('onDragStart', { rowKey });
          // }}
        />
      </div>
    </MockupJukiProvider>
  );
};
