import { Status } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { SignUpModal, SignUpModalProps } from './SignUpModal';

export default {
  component: SignUpModal,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

const WrapSignUp = (props: SignUpModalProps) => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        <SignUpModal
          {...props}
          isOpen={open}
          onClose={async (setLoaderStatus) => {
            setLoaderStatus(Status.LOADING);
            await new Promise((r) => setTimeout(r, 2000));
            setLoaderStatus(Status.SUCCESS);
            setOpen(false);
          }}
        />
      </div>
    </MockupJukiProvider>
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
    isOpen
    onClose={() => action('onClose')}
  />
);

export const SignUPWithoutGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    // onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    isOpen
    onClose={() => action('onClose')}
  />
);
