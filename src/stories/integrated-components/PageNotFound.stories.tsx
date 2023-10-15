import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { PageNotFound } from '../../components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components/Page Not Found',
  component: PageNotFound,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<PropsWithChildren<{}>> = (args) => {
  return (
    <JukiProvider>
      <div style={{ height: '500px' }}>
        <PageNotFound {...args} />
        <ToggleThemeButton />
      </div>
    </JukiProvider>
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
