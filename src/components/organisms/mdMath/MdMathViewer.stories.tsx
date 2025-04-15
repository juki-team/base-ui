import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from './constants';
import { MdMathViewer } from './MdMathViewer';

const meta: Meta<typeof MdMathViewer> = {
  component: MdMathViewer,
};

export default meta;

type Story = StoryObj<typeof MdMathViewer>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div>
        <MdMathViewer {...args} source={SAMPLE_MD_CONTENT} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  // sharedButton: true,
  downloadButton: true,
};
