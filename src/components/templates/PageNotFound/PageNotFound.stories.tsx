import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { PageNotFound } from '../../index';
import { MockupJukiProvider } from '../../mockup';

export default {
  component: PageNotFound,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<PropsWithChildren<{}>> = (args) => {
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <PageNotFound {...args} />
      </div>
    </MockupJukiProvider>
  );
};

export const PageNotFoundDefault = Template.bind({});

PageNotFoundDefault.args = {};

export const PageNotFoundWithCustomChildren = Template.bind({});

PageNotFoundWithCustomChildren.args = {
  children: (
    <div>
      Custom children
    </div>
  ),
};