import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div>
        <Tooltip {...args}>
          <div style={{ width: 100 }}>hover me</div>
        </Tooltip>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  content: 'content hover',
}
