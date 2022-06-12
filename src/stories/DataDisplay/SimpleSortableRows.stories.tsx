import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { RowSortableItem } from '../../components/SimpleSortableRows/types';
import { SimpleSortableRows as SimpleSortableRowsComponent } from '../../index';

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
  const [rows, setRows] = useState<RowSortableItem[]>([
    { id: 1, content: 'Write a cool JS library' },
    { id: 2, content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Make it generic enough</div> },
    {
      id: 3,
      content: ({ dragComponentRef, previewRef }) => (
        <div className="jk-row" ref={previewRef} style={{ width: '400px' }}>
          <div ref={dragComponentRef}>drag me</div>
          Write README
        </div>
      ),
    },
    { id: 4, content: 'Create some examples' },
    {
      id: 5,
      content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Spam in Twitter and IRC to promote it (note that this
        element is taller than the others)</div>,
    },
    { id: 6, content: '???' },
    { id: 7, content: 'PROFIT' },
  ]);
  return (
    <div style={{ height: '500px' }}>
      <SimpleSortableRowsComponent rows={rows} setRows={setRows} />
    </div>
  );
};

