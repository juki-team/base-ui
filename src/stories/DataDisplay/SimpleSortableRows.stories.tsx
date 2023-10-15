import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { RowSortableItem, SimpleSortableRows as SimpleSortableRowsComponent } from '../../components/molecules/SimpleSortableRows';
import { ToggleThemeButton } from '../ToggleThemeButton';

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
    { key: '1', content: 'Write a cool JS library', value: '111' },
    {
      key: '2',
      content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Make it generic enough</div>,
      value: '222',
    },
    {
      key: '3',
      content: ({ dragComponentRef, previewRef }) => (
        <div className="jk-row" ref={previewRef} style={{ width: '400px' }}>
          <div ref={dragComponentRef}>drag me</div>
          Write README
        </div>
      ),
      value: '333',
    },
    { key: '4', content: 'Create some examples', value: '4444' },
    {
      key: '5',
      content: ({ dragComponent }) => <div className="jk-row">{dragComponent}Spam in Twitter and IRC to promote it (note that
        this
        element is taller than the others)</div>,
      value: '555',
    },
    { key: '6', content: '???', value: '666' },
    { key: '7', content: 'PROFIT', value: '7' },
  ]);
  return (
    <div style={{ height: '500px' }}>
      <SimpleSortableRowsComponent<string> rows={rows} setRows={setRows} />
      <ToggleThemeButton />
    </div>
  );
};
