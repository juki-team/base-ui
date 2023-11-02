import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Button } from '../Button';
import { Modal } from './Modal';
import { ModalProps } from './types';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

const Cmp = (args: ModalProps) => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <Button onClick={() => setOpen(!open)}>Click</Button>
      {open && (
        <Modal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div>MODAL</div>
          <div>content 1</div>
          <div>content 2</div>
        </Modal>
      )}
    </MockupJukiProvider>
  )
}

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};
