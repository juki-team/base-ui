import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { LoginModal } from './login/LoginModal';
import { LoginModalTemplate } from './login/LoginModalTemplate';
import { LoginModalProps } from './login/types';

const meta: Meta<typeof LoginModalTemplate> = {
  component: LoginModalTemplate,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

export default meta;

type Story = StoryObj<typeof LoginModal>;

const WrapLogin = (props: LoginModalProps) => {
  const [ open, setOpen ] = useState(false);
  return (
    <MockupJukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        <LoginModal {...props} isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </MockupJukiProvider>
  );
};

export const LoginWithGoogleComponent: Story = {
  render: (args) => (
    <WrapLogin
      {...args}
      // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => {
      //   action('onSubmit')({ data, setStatus });
      // }}
      // loginWithGoogle={() => () => {
      //   action('loginWithGoogle')();
      // }}
      // reactAppGoogleClientId="test"
      isOpen
      onClose={() => action('onClose')}
      onSignUpButton={() => action('onSignUpButton')}
      // onForgotPassword={() => action('onForgotPasswordButton')}
    />
  ),
};

export const LoginWithoutGoogle: Story = {
  render: (args) => (
    <WrapLogin
      {...args}
      // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}
      isOpen
      onClose={() => action('onClose')}
      onSignUpButton={() => action('onSignUpButton')}
      // onForgotPassword={() => action('onForgotPasswordButton')}
    />
  ),
};
