import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { RowSortableItem, SimpleSortableRows as SimpleSortableRowsComponent } from './index';

export default {
  component: SimpleSortableRowsComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const SimpleSortableRows = () => {
  const [ rows, setRows ] = useState<RowSortableItem<string>[]>([
    { key: '1', content: 'Write a cool JS library', value: '111' },
    {
      key: '2',
      content: ({ dragComponent, isOver, isDragging, previewRef }) => (
        <div
          className="jk-row br-g6"
          style={{ marginTop: (isOver && !isDragging) ? 24 : undefined, opacity: isDragging ? 0 : 1 }}
          ref={previewRef}
        >
          {dragComponent}Make it generic enough
        </div>
      ),
      value: '222',
    },
    {
      key: '3',
      content: ({ dragComponentRef, previewRef, isOver }) => (
        <div className="jk-row" ref={previewRef} style={{ width: '400px', marginTop: isOver ? 24 : undefined }}>
          <div ref={dragComponentRef}>drag me</div>
          Write README
        </div>
      ),
      value: '333',
    },
    {
      key: '3.5',
      content: ({ dragComponentRef, previewRef, isOver, isDragging }) => (
        <div
          className="jk-row bc-g6"
          style={{ marginTop: (isOver && !isDragging) ? 24 : undefined }}
        >
          <div className="jk-row" ref={previewRef} style={{ width: '400px' }}>
            <div ref={dragComponentRef}>drag me</div>
            <div className="jk-row">
              some text
            </div>
          </div>
        </div>
      ),
      value: '333.5',
    },
    { key: '4', content: 'Create some examples', value: '4444' },
    {
      key: '5',
      content: ({ dragComponent, isOver }) => (
        <div
          className="jk-row"
          style={{ marginTop: isOver ? 24 : undefined }}
        >
          {dragComponent}Spam in Twitter and IRC to promote it (note
        that
        this
          element is taller than the others)
        </div>
      ),
      value: '555',
    },
    { key: '6', content: '???', value: '666' },
    { key: '7', content: 'PROFIT', value: '7' },
  ]);
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <SimpleSortableRowsComponent<string> rows={rows} setRows={setRows} />
      </div>
    </MockupJukiProvider>
  );
};
