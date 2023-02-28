import { Status } from '@juki-team/commons';
import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button, LoginModalProps, SignUpModalProps } from '../../index';
import { LoginModal, LoginModalComponentProps, SignUpModal } from '../../integrated-components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
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

const WrapSignUp = (props: SignUpModalProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <JukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        {open && <SignUpModal {...props} onClose={async (setLoaderStatus) => {
          setLoaderStatus(Status.LOADING);
          await new Promise(r => setTimeout(r, 2000));
          setLoaderStatus(Status.SUCCESS);
          setOpen(false);
        }} />}
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

export const SignUpWithGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    // onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    // signUpWithGoogle={() => () => {
    //   action('signUpWithGoogle')();
    // }}
    // reactAppGoogleClientId="test"
    onClose={() => action('onClose')}
  />
);

export const SignUPWithoutGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    // onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    onClose={() => action('onClose')}
  />
);

const WrapLogin = (props: LoginModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <JukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        {open && <LoginModal {...props} onClose={() => setOpen(false)} />}
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

const LoginWithGoogleComponent: Story<LoginModalComponentProps> = () => (
  <WrapLogin
    // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => {
    //   action('onSubmit')({ data, setStatus });
    // }}
    // loginWithGoogle={() => () => {
    //   action('loginWithGoogle')();
    // }}
    // reactAppGoogleClientId="test"
    onClose={() => action('onClose')}
    onSignUpButton={() => action('onSignUpButton')}
    // onForgotPassword={() => action('onForgotPasswordButton')}
  />
);

export const LoginWithGoogle = LoginWithGoogleComponent.bind({});
LoginWithGoogle.args = {};

export const LoginWithoutGoogle = ({ ...props }) => (
  <WrapLogin
    {...props}
    // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}
    onClose={() => action('onClose')}
    onSignUpButton={() => action('onSignUpButton')}
    // onForgotPassword={() => action('onForgotPasswordButton')}
  />
);
