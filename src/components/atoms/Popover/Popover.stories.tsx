import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

const content = (
  <div className="jk-pad-sm">
    <h3>title</h3>
    <div>
      Lorem ipsum
    </div>
  </div>
);

export const Regular: Story = {
  render: ({ placement, ...args }) => (
    <MockupJukiProvider>
      <div style={{ padding: '200px' }}>
        <Popover
          {...args}
          placement={placement}
          content={content}
        >
          <div style={{ background: 'gray', width: '200px' }}>{placement}</div>
        </Popover>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  placement: 'top',
}
