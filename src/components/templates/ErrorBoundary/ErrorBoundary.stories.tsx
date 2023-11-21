import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ErrorBoundary as ErrorBoundaryCmp } from '../../../index';

const meta: Meta<typeof ErrorBoundaryCmp> = {
  component: ErrorBoundaryCmp,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundaryCmp>;

const Error = () => {
  return (
    <div>
      {JSON.parse('error')}
    </div>
  )
}

export const Regular: Story = {
  render: (args) => (
    <ErrorBoundaryCmp {...args} reload={() => console.info('reload')}>
      <Error />
    </ErrorBoundaryCmp>
  ),
};
