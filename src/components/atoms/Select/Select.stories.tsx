import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Select } from './Select';
import { SelectProps } from './types';

// @ts-ignore
Select.defaultProps = {
  disabled: false,
  optionsPlacement: 'bottom' as SelectProps<any, any, any>['optionsPlacement'],
  extend: false,
};

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

const Cmp = (args: SelectProps<any, any, any>) => {
  const [ value, setValue ] = useState<{ label: string; value: number }>({
    label: 'test 20',
    value: 20,
  });
  
  const numbers = new Array(40).fill(0);
  const options: { label: string; value: number; disabled: boolean }[] =
    numbers.map((_, option) => ({
      label: 'label ' + option,
      inputLabel: 'L',
      value: option,
      disabled: Math.round(Math.random() * 10) > 7,
    }));
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg jk-col gap stretch">
        test:
        <Select
          {...args}
          options={options}
          selectedOption={value}
          onChange={setValue}
        />
        <div className="jk-row">
          <Select
            {...args}
            options={options}
            selectedOption={value}
            onChange={setValue}
          />
        </div>
        as button:
        <Select
          {...args}
          options={options}
          selectedOption={value}
          onChange={setValue}
          className="jk-br-ie jk-button accent"
        />
        <div style={{ width: 300 }}>
          extend
          <Select
            {...args}
            options={options}
            selectedOption={value}
            onChange={setValue}
            className="jk-br-ie jk-button accent large"
            expand
          />
        </div>
      </div>
    </MockupJukiProvider>
  );
};

type Story = StoryObj<typeof Select>;

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};
