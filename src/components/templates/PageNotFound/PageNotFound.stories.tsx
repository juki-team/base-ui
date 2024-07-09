import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PageNotFound } from "../../";
import { MockupJukiProvider } from "../../mockup";

const meta: Meta<typeof PageNotFound> = {
  component: PageNotFound,
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ height: "500px" }}>
        <PageNotFound {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

export const PageNotFoundWithCustomChildren: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ height: "500px" }}>
        <PageNotFound {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

PageNotFoundWithCustomChildren.args = {
  children: <div>Custom children</div>,
};
