import React, { useState } from 'react';
import { SetLoaderStatusOnClickType } from '../../components';
import { useJukiUser } from '../../hooks';
import { LoginFormType, LoginModalProps } from '../Login';
import { LoginModalComponent } from './LoginModal';

export const LoginModal = ({ onCancel, onSignUpButton }: LoginModalProps) => {
  
  const { signIn } = useJukiUser();
  const [highlightForgotPassword, setHighlightForgotPassword] = useState(false);
  
  const onError = () => setHighlightForgotPassword(true);
  
  const onSubmit = (data: LoginFormType, setLoader: SetLoaderStatusOnClickType) => signIn({ body: data, setLoader, onError });
  
  return (
    <LoginModalComponent
      onCancel={onCancel}
      onSignUpButton={onSignUpButton}
      onSubmit={onSubmit}
      highlightForgotPassword={highlightForgotPassword}
    />
  );
};

export * from './types';
