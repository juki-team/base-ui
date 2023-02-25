import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { Button, Modal as ModalComponent } from '../../index';
import { LoginModal } from '../../integrated-components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Feedback/Modals',
  // component: SignUpModal,
  component: LoginModal,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const WrapModal = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <JukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        {open && (
          <ModalComponent isOpen={open} onClose={() => setOpen(false)} closeWhenClickOutside closeWhenKeyEscape closeIcon>
            <div>MODAL</div>
          </ModalComponent>
        )}
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

export const Modal = () => (
  <WrapModal />
);
