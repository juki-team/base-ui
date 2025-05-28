import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { UserMyActiveSessions } from './UserMyActiveSessions';

const meta: Meta<typeof UserMyActiveSessions> = {
  component: UserMyActiveSessions,
};

export default meta;

type Story = StoryObj<typeof UserMyActiveSessions>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap wh-100">
        <UserMyActiveSessions {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
