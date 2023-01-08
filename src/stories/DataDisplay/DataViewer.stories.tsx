import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';
import { JkUserTable, JkUserTableProps } from './JkUserTableTest/JkUserTable';

export default {
  title: 'Components/Data Display',
  // component: FlagEnImage,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const DataViewerTemplate: Story<JkUserTableProps> = (props) => (
  <BrowserRouter>
    <JukiProvider>
      <JkUserTable {...props} />
    </JukiProvider>
    <ToggleThemeButton />
  </BrowserRouter>
);

export const DataViewer = DataViewerTemplate.bind({});

DataViewer.args = {
  // onClick: action('onClick'),
};
