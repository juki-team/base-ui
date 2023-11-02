import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { MultiSelect } from './MultiSelect';
import { MultiSelectProps } from './types';

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

let options = new Array(40).fill(0);

options = options.map((_, index) => ({
  label: 'label ' + index,
  inputLabel: 'label sel ' + index,
  value: index,
  disabled: (Math.round(Math.random() * 10)) > 7,
}));

const Cmp = (args: MultiSelectProps<any, any, any>) => {
  
  const [ values, setValues ] = useState<{ label: string, value: number }[]>([ { label: 'test 20', value: 20 } ]);
  
  return (
    <MockupJukiProvider>
      <MultiSelect {...args} selectedOptions={values} onChange={setValues} />
    </MockupJukiProvider>
  )
}

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};

Regular.args = {
  options: options,
  selectedOptions: [],
}
