import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";

import { Input } from "./Input";
import { InputCellPhoneNumber } from "./InputCellPhoneNumber";
import { InputPassword } from "./InputPassword";
import { InputSelect } from "./InputSelect";
import { InputTextArea } from "./InputTextArea";
import {
  InputCellPhoneNumberProps,
  InputPasswordProps,
  InputSelectProps,
  InputTextAreaProps,
} from "./types";

// @ts-ignore
Input.defaultProps = {
  type: "text",
  extend: false,
  disabled: false,
  autoFocus: false,
  labelPlacement: "top-border",
  required: false,
};

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap nowrap jk-pg-md">
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="text" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="number" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="email" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="password" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="file" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <Input {...args} type="files" />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <InputPassword {...(args as InputPasswordProps<any>)} />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <InputSelect
            {...(args as InputSelectProps<any, any, any>)}
            options={[
              { value: 1, label: "label 1" },
              { value: 2, label: "label 2" },
            ]}
            selectedOption={{ value: 0, label: "select option" }}
            // className="error"
          />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <InputCellPhoneNumber {...(args as InputCellPhoneNumberProps<any>)} />
        </div>
        <div style={{ outline: "1px solid red", padding: 8 }}>
          <InputTextArea {...(args as InputTextAreaProps)} />
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  label: "test label",
};
