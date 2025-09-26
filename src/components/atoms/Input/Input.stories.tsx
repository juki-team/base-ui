import type { Meta, StoryObj } from '@storybook/react-webpack5';
// import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { InputCellPhoneNumber } from '../_lazy_/InputCellPhoneNumber';
import { InputPassword } from '../InputPassword/InputPassword';
import { InputSelect } from '../InputSelect/InputSelect';
import { InputTextArea } from '../InputTextArea/InputTextArea';
import { Input } from './Input';
import { InputCellPhoneNumberProps, InputPasswordProps, InputSelectProps, InputTextAreaProps } from './types';

// @ts-ignore
Input.defaultProps = {
  type: 'text',
  extend: false,
  disabled: false,
  autoFocus: false,
  labelPlacement: 'top-border',
  required: false,
};

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Regular: Story = {
  // play: waitForLoadingToDisappear,
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap nowrap jk-pg-md">
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="text" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="number" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="email" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="password" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="file" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <Input {...args} type="files" />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <InputPassword {...(args as InputPasswordProps)} />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <InputSelect
            {...(args as InputSelectProps<any, any, any>)}
            options={[
              { value: 1, label: 'label 1' },
              { value: 2, label: 'label 2' },
            ]}
            selectedOption={{ value: 0, label: 'select option' }}
            // className="error"
          />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <InputCellPhoneNumber {...(args as InputCellPhoneNumberProps)} />
        </div>
        <div style={{ outline: '1px solid red', padding: 8 }}>
          <InputTextArea {...(args as InputTextAreaProps)} />
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  label: 'test label',
};
