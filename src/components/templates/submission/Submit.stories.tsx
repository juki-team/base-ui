import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { SubmissionModal } from './SubmissionModal';
import { SubmitView } from './SubmitView';

const meta: Meta<typeof SubmissionModal> = {
  component: SubmissionModal,
};

export default meta;

type Story = StoryObj<typeof SubmissionModal>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <div style={{ width: '100%', height: 600 }}>
          <SubmitView submitId="67572ac37b782807461b1c1b" />
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
