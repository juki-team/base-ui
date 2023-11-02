import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Select } from './Select';
import { SelectProps } from './types';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

const Cmp = (args: SelectProps<any, any, any>) => {
  const [ value, setValue ] = useState<{ label: string, value: number }>({ label: 'test 20', value: 20 });
  
  let numbers = new Array(40).fill(0);
  const options: { label: string, value: number, disabled: boolean }[] = numbers.map((_, option) => ({
    label: 'label ' + option,
    inputLabel: 'LABEL' + option,
    value: option,
    disabled: (Math.round(Math.random() * 10)) > 7,
  }));
  
  return (
    <MockupJukiProvider>
      <Select {...args} options={options} selectedOption={value} onChange={setValue} />
    </MockupJukiProvider>
  );
}

type Story = StoryObj<typeof Select>;

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};
