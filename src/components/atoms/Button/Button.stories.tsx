import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { LockIcon } from '../server';
import { T } from '../T/T';
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
  play: async (ctx) => {
    await waitForLoadingToDisappear(ctx);
  },
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap jk-pg">
        <T>description</T>
        <Button {...args}>click me!</Button>
        <Button {...args} icon={<LockIcon />} />
        <Button {...args} icon={<LockIcon />} size="tiny">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="small">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />}>
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="large">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="huge" className="bc-pl">
          click me!
        </Button>
      </div>
    </MockupJukiProvider>
  ),
};
