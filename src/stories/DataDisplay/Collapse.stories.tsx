import { configureActions } from '@storybook/addon-actions';
import React from 'react';
import { Collapse as CollapseComponent, UpIcon } from '../../index';

export default {
  title: 'Components/Data Display',
  component: CollapseComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Collapse = () => {
  return (
    <div style={{ height: '500px' }}>
      <CollapseComponent
        header={({ isOpen, toggle }) => (
          <div className="jk-row center gap bg-color-success">
            Collapse Header
            <div onClick={toggle} className="bg-color-error jk-row">
              Click me
              <UpIcon rotate={isOpen ? 0 : 180} className="link" />
            </div>
          </div>
        )}
      >
        <div>
          Texto Collapsable
        </div>
      </CollapseComponent>
    </div>
  );
};
