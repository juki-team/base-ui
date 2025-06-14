import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { PageNotFound } from './PageNotFound';

const meta: Meta<typeof PageNotFound> = {
  component: PageNotFound,
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <PageNotFound {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

export const PageNotFoundWithCustomChildren: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <PageNotFound {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

PageNotFoundWithCustomChildren.args = {
  children: <div>Custom children</div>,
};
