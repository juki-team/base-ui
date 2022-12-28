import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import {
  Button,
  LoginInputType,
  LoginModal,
  LoginModalProps,
  SetLoaderStatusOnClickType,
  SignUpInputType,
  SignUpModal,
  SignUpModalProps,
} from '../../index';

export default {
  title: 'Components/Feedback/Modals',
  // component: SignUpModal,
  component: LoginModal,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  }
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const WrapSignUp = (props: SignUpModalProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Click</Button>
      {open && <SignUpModal {...props} onCancel={() => setOpen(false)} />}
    </div>
  );
};

export const SignUpWithGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    onSubmit={(data: SignUpInputType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    signUpWithGoogle={() => () => {
      action('signUpWithGoogle')();
    }}
    reactAppGoogleClientId="test"
    onCancel={() => action('onCancel')}
  />
);

export const SignUPWithoutGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    onSubmit={(data: SignUpInputType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    onCancel={() => action('onCancel')}
  />
);

const WrapLogin = (props: LoginModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Click</Button>
      {open && <LoginModal {...props} onCancel={() => setOpen(false)} />}
    </div>
  );
};

const LoginWithGoogleComponent: Story<LoginModalProps> = () => (
  <WrapLogin
    onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => {
      action('onSubmit')({ data, setStatus });
    }}
    loginWithGoogle={() => () => {
      action('loginWithGoogle')();
    }}
    reactAppGoogleClientId="test"
    onCancel={() => action('onCancel')}
    onSignUpButton={() => action('onSignUpButton')}
    onForgotPassword={() => action('onForgotPasswordButton')}
  />
);

export const LoginWithGoogle = LoginWithGoogleComponent.bind({});
LoginWithGoogle.args = {};

export const LoginWithoutGoogle = ({...props}) => (
  <WrapLogin
    {...props}
    onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}
    onCancel={() => action('onCancel')}
    onSignUpButton={() => action('onSignUpButton')}
    onForgotPassword={() => action('onForgotPasswordButton')}
  />
);
