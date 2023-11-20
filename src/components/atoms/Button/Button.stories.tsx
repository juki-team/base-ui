import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { LockIcon } from '../icons';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <Button {...args}>click me!</Button>
        <Button {...args} icon={<LockIcon />} />
        <Button {...args} icon={<LockIcon />}>
          click me!
        </Button>
      </div>
    </MockupJukiProvider>
  ),
};
