import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { SubmissionModal, SubmitView } from '../../organisms';
import { SubmissionContentModal } from '../../organisms/SubmissionModal/SubmissionContentModal';

const meta: Meta<typeof SubmissionModal> = {
  component: SubmissionModal,
};

export default meta;

type Story = StoryObj<typeof SubmissionModal>;

const SubmitButton = () => {
  const [ open, setOpen ] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        click me
      </Button>
      <SubmissionContentModal
        submitId="67572ac37b782807461b1c1b"
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Regular: Story = {
  render: () => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <SubmitButton />
        <div style={{ width: '100%', height: 600 }}>
          <SubmitView submitId="67572ac37b782807461b1c1b" />
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
