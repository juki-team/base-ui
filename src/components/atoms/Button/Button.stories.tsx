import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { LockIcon } from '../icons';
import { T } from '../T';
import { Button } from './Button';

// @ts-ignore
Button.defaultProps = {
  submit: false,
  type: 'primary',
  extend: false,
  disabled: false,
  responsive: false,
  responsiveMobile: false,
};

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap jk-pg">
        <T>description</T>
        <Button {...args}>click me!</Button>
        <Button {...args} icon={<LockIcon />} />
        <Button {...args} icon={<LockIcon />}>
          click me!
        </Button>
      </div>
    </MockupJukiProvider>
  ),
};
