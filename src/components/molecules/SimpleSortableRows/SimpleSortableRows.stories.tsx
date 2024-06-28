import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { MockupJukiProvider } from '../../mockup';
import { SimpleSortableRows as SimpleSortableRowsComponent } from './SimpleSortableRows';
import { RowSortableItem, SimpleSortableRowsProps } from './types';

export default {
  component: SimpleSortableRowsComponent,
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

const Component: (SimpleSortableRowsProps<string, { otherValue: string }>['Cmp']) = ({
                                                                                       value,
                                                                                       dragComponent,
                                                                                       dragComponentRef,
                                                                                       isDragging,
                                                                                       isPreview,
                                                                                       index,
                                                                                       isOver,
                                                                                       rowKey,
                                                                                       props,
                                                                                     }) => {
    return (
      <div
        className="jk-row left gap bc-we"
        style={{ opacity: (isDragging && !isPreview) ? 0 : 1 }}
        ref={dragComponentRef}
      >
        {index}{dragComponent}{value}
        <div className={classNames({ 'bc-er': isDragging })}>isD</div>
        <div className={classNames({ 'bc-er': isPreview })}>isP</div>
        <div className={classNames({ 'bc-er': isOver })}>isO</div>
        {rowKey}
        {JSON.stringify(props)}
      </div>
    );
  }
;
export const SimpleSortableRows = () => {
  const [ rows, setRows ] = useState<RowSortableItem<string>[]>([
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
      <div style={{ height: '500px', width: '400px' }}>
        <SimpleSortableRowsComponent<string, { otherValue: string }>
          rows={rows}
          setRows={setRows}
          Cmp={Component}
          // props={undefined}
          props={{ otherValue: 'test' }}
          onDragEnd={() => {
            console.log('onDragEnd');
          }}
          onDragStart={() => {
            console.log('onDragStart');
          }}
        />
      </div>
    </MockupJukiProvider>
  );
};
