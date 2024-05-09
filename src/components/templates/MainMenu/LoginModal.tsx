import React, { useState } from 'react';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { BasicModalProps } from '../../atoms';
import { SetLoaderStatusOnClickType } from '../../molecules';
import { LoginFormType, LoginModalTemplate } from './LoginModalTemplate';

export interface LoginModalProps extends BasicModalProps {
  onSignUpButton: () => void,
  multiCompanies?: boolean,
}

export const LoginModal = ({ isOpen, onClose, onSignUpButton, multiCompanies }: LoginModalProps) => {
  
  const { signIn, device: { osLabel, label } } = useJukiUser();
  const [ highlightForgotPassword, setHighlightForgotPassword ] = useState(false);
  
  const onError = () => setHighlightForgotPassword(true);
  
  const onSubmit = ({ companyKey, ...data }: LoginFormType, setLoader: SetLoaderStatusOnClickType) => signIn({
    params: companyKey ? { companyKey } : undefined,
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onError,
  });
  
  return (
    <LoginModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onSignUpButton={onSignUpButton}
      onSubmit={onSubmit}
      highlightForgotPassword={highlightForgotPassword}
      multiCompanies={multiCompanies}
    />
  );
};
