import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";

import { CopyToClipboard } from "./CopyToClipboard";

const meta: Meta<typeof CopyToClipboard> = {
  component: CopyToClipboard,
};

export default meta;

type Story = StoryObj<typeof CopyToClipboard>;

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacus turpis, facilisis vitae magna at, feugiat tincidunt eros. Nam tempus ex ut odio vulputate aliquet. Vestibulum id ligula finibus, vehicula tellus non, auctor magna. Mauris convallis purus et felis euismod consectetur. Nunc nec porttitor felis, non dapibus sem. In imperdiet, neque scelerisque aliquam mollis, purus massa efficitur nulla, eu efficitur lorem eros in leo. Nam eros ligula, tincidunt ut finibus sed, semper eget lacus. Sed nunc ante, suscipit eget erat ac, ullamcorper efficitur urna. Vivamus neque ante, vehicula eget sollicitudin facilisis, aliquam sed dolor. Vivamus imperdiet vel libero vel suscipit. Donec ut lectus ac purus placerat vehicula. Ut tincidunt laoreet justo id rutrum. Proin tristique nisi non elementum efficitur. Phasellus sit amet nisl sit amet ex vulputate ultricies. Ut nec nulla vitae lectus sodales condimentum nec id metus.";

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <CopyToClipboard {...args}>
        <div>click me!</div>
      </CopyToClipboard>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  text,
};
