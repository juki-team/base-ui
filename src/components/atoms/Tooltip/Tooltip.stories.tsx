import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

const meta: Meta = {
  // component,
};

export default meta;

type Story = StoryObj;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ padding: 50 }}>
        <div style={{ background: 'blue', width: 200, height: 50 }}>
          {/*<Tooltip {...args}>*/}
          {/*  <div style={{ width: 100 }}>hover me</div>*/}
          {/*</Tooltip>*/}
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="it is not possible to submit to external judges at this time, we apologize for the inconvenience"
            data-tooltip-t-class-name="class"
            data-tooltip-place="bottom"
            {...args}
            // to add class names to <T>
          >
            hover me
          </div>
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
