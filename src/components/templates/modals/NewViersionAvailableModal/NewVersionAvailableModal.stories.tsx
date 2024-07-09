import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "../../../atoms";
import { MockupJukiProvider } from "../../../mockup";
import { NewVersionAvailableModal as NewVersionAvailableModalCmp } from "./NewVersionAvailableModal";

export const NewVersionAvailableModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <MockupJukiProvider>
      <NewVersionAvailableModalCmp
        isOpen={open}
        onClose={() => setOpen(false)}
        newVersion="2"
        previousVersion="1"
        reload={() => action("reload")}
      />
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};

const meta: Meta<typeof NewVersionAvailableModalCmp> = {
  component: NewVersionAvailableModalCmp,
};

export default meta;

type Story = StoryObj<typeof NewVersionAvailableModalCmp>;

export const Regular: Story = {
  render: (args) => <NewVersionAvailableModal />,
};
