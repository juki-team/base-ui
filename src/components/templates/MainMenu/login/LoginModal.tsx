import React, { useState } from 'react';
import { useJukiUser } from '../../../../hooks/useJukiUser';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { BasicModalProps, SetLoaderStatusOnClickType } from '../../../../types';
import { LoginModalTemplate } from '../LoginModalTemplate';
import { LoginFormType } from '../LoginModalTemplate/types';

export interface LoginModalProps extends BasicModalProps {
  onSignUpButton: () => void,
  multiCompanies?: boolean,
}

export const LoginModal = ({ isOpen, onClose, onSignUpButton, multiCompanies }: LoginModalProps) => {
  
  const { signIn } = useJukiUser();
  const { osLabel, label } = useUserStore(state => state.device);
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
