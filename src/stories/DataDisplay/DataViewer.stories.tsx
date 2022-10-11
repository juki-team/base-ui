import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { JukiBaseUiProvider } from '../../components';
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
    <JukiBaseUiProvider
      utilsServiceUrl="https://utils-back-v1.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="https://utils.juki.app"
      tokenName="juki-token"
    >
      <JkUserTable {...props} />
    </JukiBaseUiProvider>
  </BrowserRouter>
);

export const DataViewer = DataViewerTemplate.bind({});

DataViewer.args = {
  // onClick: action('onClick'),
};
