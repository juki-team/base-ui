import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";

import { InputCheckbox } from "./InputCheckbox";

const meta: Meta<typeof InputCheckbox> = {
  component: InputCheckbox,
};

export default meta;

type Story = StoryObj<typeof InputCheckbox>;

export const Regular: Story = {
  render: ({ label = "checkbox label", ...args }) => (
    <MockupJukiProvider>
      <InputCheckbox label={label} {...args} />
    </MockupJukiProvider>
  ),
};
