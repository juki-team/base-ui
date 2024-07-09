import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";

import { Div } from "./Div";

const meta: Meta<typeof Div> = {
  component: Div,
};

export default meta;

type Story = StoryObj<typeof Div>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <Div {...args}>click me!</Div>
    </MockupJukiProvider>
  ),
};
