import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { InputToggle } from './InputToggle';
import { InputToggleProps } from './types';

// @ts-ignore
InputToggle.defaultProps = {
  type: 'rounded' as InputToggleProps['type'],
  size: 'regular' as InputToggleProps['size'],
  disabled: false,
}

const meta: Meta<typeof InputToggle> = {
  component: InputToggle,
};

export default meta;

type Story = StoryObj<typeof InputToggle>;

export const Regular: Story = {
  render: ({ leftLabel = 'left label', rightLabel = 'right label', ...args }) => (
    <MockupJukiProvider>
      <InputToggle leftLabel={leftLabel} rightLabel={rightLabel} {...args} />
    </MockupJukiProvider>
  ),
};
