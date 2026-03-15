import { Status } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from './Modal';
import type { ModalButtonLoaderEventType, ModalProps } from './types';

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
        <Button onClick={() => setOpen(!open)}>Open Modal</Button>
        <Modal<ModalButtonLoaderEventType>
          {...args}
          isOpen={open}
          onClose={onClose}
          ariaLabelledBy="modal-title"
          ariaDescribedBy="modal-description"
        >
          <div className="jk-pg-md">
            <h2 id="modal-title">Modal Title</h2>
            <p id="modal-description">This is an accessible modal with focus trap and ARIA attributes.</p>
            <div>Content 1</div>
            <div>Content 2</div>
            <Button onClick={() => setOpen(false)}>Close from inside</Button>
          </div>
        </Modal>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};

const CmpAccessibility = () => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg jk-col gap">
        <h3>Accessibility Features</h3>
        <p>This modal demonstrates:</p>
        <ul>
          <li>✅ Focus trap (try tabbing through)</li>
          <li>✅ Escape key to close</li>
          <li>✅ Click overlay to close</li>
          <li>✅ Body scroll prevention</li>
          <li>✅ Focus restoration</li>
          <li>✅ ARIA attributes for screen readers</li>
        </ul>
        <Button onClick={() => setOpen(true)}>Open Accessible Modal</Button>
        
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          closeIcon
          ariaLabelledBy="accessible-modal-title"
          ariaDescribedBy="accessible-modal-description"
        >
          <div className="jk-pg-md jk-col gap">
            <h2 id="accessible-modal-title">Accessible Modal Example</h2>
            <p id="accessible-modal-description">
              Try using your keyboard to navigate. Press Tab to move between focusable elements.
              Press Escape to close the modal.
            </p>
            <Input label="First Input" placeholder="Try tabbing here" />
            <Input label="Second Input" placeholder="And here" />
            <div className="jk-row gap">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)} type="primary">Accept</Button>
            </div>
          </div>
        </Modal>
      </div>
    </MockupJukiProvider>
  );
};

export const Accessibility: Story = {
  render: () => <CmpAccessibility />,
};
