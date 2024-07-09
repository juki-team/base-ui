import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";
import { ResetPasswordModal } from "./ResetPasswordModal";

const meta: Meta<typeof ResetPasswordModal> = {
  component: ResetPasswordModal,
};

export default meta;

type Story = StoryObj<typeof ResetPasswordModal>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <ResetPasswordModal {...args} isOpen={true} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  nickname: "fakeuser",
};
