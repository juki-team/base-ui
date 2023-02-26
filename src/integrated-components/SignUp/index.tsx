import React from 'react';
import { SetLoaderStatusOnClickType } from '../../components';
import { useJukiUser } from '../../hooks';
import { SignUpModalComponent } from './SignUpModal';
import { SignUpFormType, SignUpModalProps } from './types';

export const SignUpModal = ({ onCancel, onSuccess }: SignUpModalProps) => {
  
  const { signUp } = useJukiUser();
  
  const onSubmit = (data: SignUpFormType, setLoader: SetLoaderStatusOnClickType) => signUp({
    body: data,
    setLoader,
    onSuccess,
  });
  
  return (
    <SignUpModalComponent onCancel={onCancel} onSubmit={onSubmit} />
  );
};

export * from './types';
