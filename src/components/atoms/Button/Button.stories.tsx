import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <Button {...args}>click me!</Button>
    </MockupJukiProvider>
  ),
};
