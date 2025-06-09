import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../../mockup';

import { LoaderLayer } from './LoaderLayer';

const meta: Meta<typeof LoaderLayer> = {
  component: LoaderLayer,
};

export default meta;

type Story = StoryObj<typeof LoaderLayer>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <LoaderLayer {...args}>click me!</LoaderLayer>
    </MockupJukiProvider>
  ),
};
