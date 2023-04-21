import React from 'react';
import { SetLoaderStatusOnClickType } from '../../components';
import { useJukiUser } from '../../hooks';
import { SignUpModalComponent } from './SignUpModal';
import { SignUpFormType, SignUpModalProps } from './types';

export const SignUpModal = ({ onClose, onSuccess }: SignUpModalProps) => {
  
  const { signUp, device: { osLabel, label } } = useJukiUser();
  
  const onSubmit = (data: SignUpFormType, setLoader: SetLoaderStatusOnClickType) => signUp({
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onSuccess,
  });
  
  return (
    <SignUpModalComponent onClose={onClose} onSubmit={onSubmit} />
  );
};

export * from './types';
