import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <TextArea {...args} />
    </MockupJukiProvider>
  ),
};
