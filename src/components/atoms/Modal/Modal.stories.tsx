import { Status } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Button } from '../Button';
import { Input } from '../inputs';
import { Modal } from './Modal';
import { ModalProps } from './types';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Cmp = (args: ModalProps) => {
  
  const [ open, setOpen ] = useState(false);
  const [ waitOnClose, setWaitOnClose ] = useState(0);
  
  const onClose: ModalProps['onClose'] = async (setLoader) => {
    setLoader(Status.LOADING);
    await sleep(waitOnClose);
    setOpen(false);
    setLoader(Status.SUCCESS);
  }
  
  return (
    <MockupJukiProvider>
      <Input onChange={setWaitOnClose} value={waitOnClose} type="number" label="time to wait" /> ms
      <Button onClick={() => setOpen(!open)}>Click</Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={onClose}
      >
        <div>MODAL</div>
        <div>content 1</div>
        <div>content 2</div>
        <Button onClick={() => setOpen(false)}>close</Button>
      </Modal>
    </MockupJukiProvider>
  )
}

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};
