import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';

import { InputCheckbox } from './InputCheckbox';

const meta: Meta<typeof InputCheckbox> = {
  component: InputCheckbox,
};

export default meta;

type Story = StoryObj<typeof InputCheckbox>;

export const Regular: Story = {
  play: waitForLoadingToDisappear,
  render: ({ label = 'checkbox label', ...args }) => (
    <MockupJukiProvider>
      <InputCheckbox label={label} onChange={() => null} {...args} />
    </MockupJukiProvider>
  ),
};
