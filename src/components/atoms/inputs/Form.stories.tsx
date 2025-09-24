import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { Input, InputPassword, Select as SelectComponent, TextArea } from '../../atoms';
import { InputProps } from '../../atoms/types';
import { MockupJukiProvider } from '../../mockup';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

const Cmp = (_: InputProps<any>) => {
  const [ text, setText ] = useState('');
  
  return (
    <MockupJukiProvider>
      <div style={{ width: '90%' }} className="jk-pg-md">
        <div className="jk-form-item">
          <label>
            label input
            <Input
              name="nickname"
              onChange={(value) => setText(value)}
              value={text}
            />
          </label>
        </div>
        <div className="jk-form-item">
          <label>
            label input with error label
            <Input
              name="nickname"
              onChange={(value) => setText(value)}
              value={text}
              className="error"
            />
          </label>
          <p>error label</p>
        </div>
        <div className="jk-form-item">
          <label>
            label input with success label
            <Input
              name="nickname"
              onChange={(value) => setText(value)}
              value={text}
              className="success"
            />
          </label>
        </div>
        <div className="jk-form-item">
          <label>
            label input with placeholder
            <Input
              name="nickname"
              placeholder="this is a placeholder"
              onChange={(value) => setText(value)}
              value={text}
              disabled
            />
          </label>
        </div>
        <div className="jk-form-item">
          <label>
            Password
            <InputPassword
              name="password"
              onChange={(value) => setText(value)}
              value={text}
            />
          </label>
          <p>error label</p>
        </div>
        <div className="jk-form-item">
          <label>
            Text area input
            <TextArea value={text} onChange={(value) => setText(value)} />
          </label>
          <p>error label</p>
        </div>
        <div className="jk-form-item">
          <label>
            Text area input
            <SelectComponent
              options={[
                { value: 'select1', label: 'select 1' },
                { value: 'select2', label: 'select 2' },
                { value: 'select3', label: 'select 3' },
              ]}
              selectedOption={{ value: 'text', label: 'text selected' }}
              onChange={() => null}
              expand
              optionsPlacement="top"
            />
          </label>
          <p>error label</p>
        </div>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  play: waitForLoadingToDisappear,
  render: (args) => <Cmp {...args} />,
};
