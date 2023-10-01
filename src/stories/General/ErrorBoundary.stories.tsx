import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonProps, ErrorBoundary as ErrorBoundaryCmp } from '../../index';

export default {
  title: 'Components/General',
  component: Button,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Error = () => {
  return (
    <div>
      {JSON.parse('error')}
    </div>
  )
}
const Template: Story<ButtonProps> = (args) => {
  return (
    <ErrorBoundaryCmp reload={() => console.info('reload')}>
      <Error />
    </ErrorBoundaryCmp>
  );
};

export const ErrorBoundary = Template.bind({});

ErrorBoundary.args = {};
