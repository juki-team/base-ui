import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { RowSortableItem, SimpleSortableRows as SimpleSortableRowsComponent } from '../../components/SimpleSortableRows';

export default {
  title: 'Components/Data Display',
  component: SimpleSortableRowsComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const SimpleSortableRows = () => {
  const [rows, setRows] = useState<RowSortableItem<string>[]>([
    { id: 1, content: 'Write a cool JS library', value: '111' },
    { id: 2, content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Make it generic enough</div>, value: '222' },
    {
      id: 3,
      content: ({ dragComponentRef, previewRef }) => (
        <div className="jk-row" ref={previewRef} style={{ width: '400px' }}>
          <div ref={dragComponentRef}>drag me</div>
          Write README
        </div>
      ),
      value: '333',
    },
    { id: 4, content: 'Create some examples', value: '4444' },
    {
      id: 5,
      content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Spam in Twitter and IRC to promote it (note that this
        element is taller than the others)</div>,
      value: '555',
    },
    { id: 6, content: '???', value: '666' },
    { id: 7, content: 'PROFIT', value: '7' },
  ]);
  return (
    <div style={{ height: '500px' }}>
      <SimpleSortableRowsComponent<string> rows={rows} setRows={setRows} />
    </div>
  );
};

