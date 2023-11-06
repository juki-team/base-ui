import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { LoginModal, LoginModalProps, LoginModalTemplateProps } from './'

export default {
  component: LoginModal,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

const WrapLogin = (props: LoginModalProps) => {
  const [ open, setOpen ] = useState(false);
  return (
    <MockupJukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        {open && <LoginModal {...props} onClose={() => setOpen(false)} />}
      </div>
    </MockupJukiProvider>
  );
};

const LoginWithGoogleComponent: Story<LoginModalTemplateProps> = () => (
  <WrapLogin
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
);

export const LoginWithGoogle = LoginWithGoogleComponent.bind({});

export const LoginWithoutGoogle = ({ ...props }) => (
  <WrapLogin
    {...props}
    // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}
    isOpen
    onClose={() => action('onClose')}
    onSignUpButton={() => action('onSignUpButton')}
    // onForgotPassword={() => action('onForgotPasswordButton')}
  />
);
