import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "../../atoms";
import { MockupJukiProvider } from "../../mockup";
import { TwoActionModal } from "./TwoActionModal";
import { TwoActionModalProps } from "./types";

const meta: Meta<typeof TwoActionModal> = {
  component: TwoActionModal,
};

export default meta;

type Story = StoryObj<typeof TwoActionModal>;

const Cmp = (args: TwoActionModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <MockupJukiProvider>
      <Button onClick={() => setOpen(!open)}>Click</Button>
      <TwoActionModal {...args} isOpen={open} onClose={() => setOpen(false)}>
        <div>MODAL</div>
        <div>content 1</div>
        <div>content 2</div>
      </TwoActionModal>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};

Regular.args = {
  title: "Title",
  primary: {
    disabled: false,
    onClick: () => null,
    label: "accept",
  },
  secondary: {
    disabled: false,
    onClick: () => null,
    label: "decline",
  },
};
