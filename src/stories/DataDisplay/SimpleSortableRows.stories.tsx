import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { RowItem } from '../../components/SimpleSortableRows/types';
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
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, content: 'Write a cool JS library' },
    { id: 2, content: 'Make it generic enough' },
    { id: 3, content: 'Write README' },
    { id: 4, content: 'Create some examples' },
    { id: 5, content: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)' },
    { id: 6, content: '???' },
    { id: 7, content: 'PROFIT' },
  ]);
  return (
    <div style={{ height: '500px' }}>
      <SimpleSortableRowsComponent rows={rows} setRows={setRows} />
    </div>
  );
};

