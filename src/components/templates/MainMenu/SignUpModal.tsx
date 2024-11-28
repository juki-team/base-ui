import { ContentResponseType, PingResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUser } from '../../../hooks';
import { BasicModalProps, SetLoaderStatusOnClickType } from '../../../types';
import { SignUpModalTemplate } from './SignUpModalTemplate';
import { SignUpFormType } from './SignUpModalTemplate/types';

export interface SignUpModalProps extends BasicModalProps {
  onSuccess?: (response?: ContentResponseType<PingResponseDTO>) => void,
}

export const SignUpModal = ({ isOpen, onClose, onSuccess }: SignUpModalProps) => {
  
  const { signUp, device: { osLabel, label } } = useJukiUser();
  
  const onSubmit = (data: SignUpFormType, setLoader: SetLoaderStatusOnClickType) => signUp({
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onSuccess,
  });
  
  return (
    <SignUpModalTemplate isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
  );
};
