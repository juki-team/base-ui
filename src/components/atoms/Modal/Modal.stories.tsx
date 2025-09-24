import { Status } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Button } from '../Button/Button';
import { Input } from '../inputs/Input';
import { Modal } from './Modal';
import { ModalButtonLoaderEventType, ModalProps } from './types';

// @ts-ignore
Modal.defaultProps = {
  closeIcon: true,
  closeWhenClickOutside: false,
};

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Cmp = (args: ModalProps<ModalButtonLoaderEventType>) => {
  const [ open, setOpen ] = useState(false);
  const [ waitOnClose, setWaitOnClose ] = useState(0);
  
  const onClose: ModalProps<ModalButtonLoaderEventType>['onClose'] = async (setLoader) => {
    setLoader(Status.LOADING);
    await sleep(waitOnClose);
    setOpen(false);
    setLoader(Status.SUCCESS);
  };
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg">
        <Input
          onChange={setWaitOnClose}
          value={waitOnClose}
          type="number"
          label="time to wait"
        />{' '}
        ms
        <Button onClick={() => setOpen(!open)}>Click</Button>
        <Modal<ModalButtonLoaderEventType> {...args} isOpen={open} onClose={onClose}>
          <div>MODAL</div>
          <div>content 1</div>
          <div>content 2</div>
          <Button onClick={() => setOpen(false)}>close</Button>
        </Modal>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};
