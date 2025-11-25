import { useState } from 'react';
import { Button } from '../../../atoms';
import { MockupJukiProvider } from '../../../mockup';
import { SignUpModal } from './';

export default {
  component: SignUpModal,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

const WrapSignUp = () => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <div>
        <Button onClick={() => setOpen(!open)}>Click</Button>
        <SignUpModal />
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
    // isOpen
    // onClose={() => action('onClose')}
    // onSignInButton={() => action('onSignInButton')}
  />
);

export const SignUPWithoutGoogle = () => (
  <WrapSignUp
    // imageSource="https://judge.juki.app/images/juki-sign-person.svg"
    // onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}
    // isOpen
    // onClose={() => action('onClose')}
    // onSignInButton={() => action('onSignInButton')}
  />
);
