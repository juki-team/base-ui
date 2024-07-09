import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";

import { InputRadio } from "./InputRadio";

const meta: Meta<typeof InputRadio> = {
  component: InputRadio,
};

export default meta;

type Story = StoryObj<typeof InputRadio>;

export const Regular: Story = {
  render: ({ label = "radio label", ...args }) => (
    <MockupJukiProvider>
      <InputRadio label={label} {...args} />
    </MockupJukiProvider>
  ),
};
