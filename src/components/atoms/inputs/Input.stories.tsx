import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

import { Input } from './Input';
import { InputPassword } from './InputPassword';
import { InputProps } from './types';

// @ts-ignore
Input.defaultProps = {
  type: 'text',
  extend: false,
  disabled: false,
  autoFocus: false,
  labelPlacement: 'top',
  required: false,
}

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap nowrap">
        <Input {...args} type="text" />
        <Input {...args} type="number" />
        <Input {...args} type="email" />
        <Input {...args} type="password" />
        <Input {...args} type="file" />
        <Input {...args} type="files" />
        <InputPassword {...args as InputProps<string>} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  label: 'test label',
}
