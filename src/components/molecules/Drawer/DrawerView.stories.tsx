import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  DrawerView as DrawerViewComponent,
  MdMathViewer,
  SAMPLE_MD_CONTENT,
} from "../../../index";
import { MockupToggleThemeButton } from "../../mockup/MockupToggleThemeButton";

const meta: Meta<typeof DrawerViewComponent> = {
  component: DrawerViewComponent,
};

export default meta;

type Story = StoryObj<typeof DrawerViewComponent>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ height: "500px" }}>
      <DrawerViewComponent {...args}>
        <div style={{ width: 250 }}>
          <MdMathViewer source={SAMPLE_MD_CONTENT} />
        </div>
      </DrawerViewComponent>
      <MockupToggleThemeButton />
    </div>
  ),
};
