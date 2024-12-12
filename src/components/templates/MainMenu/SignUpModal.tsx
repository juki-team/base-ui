import { ContentResponseType, PingResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUser } from '../../../hooks';
import { BasicModalProps, ModalButtonLoaderEventType } from '../../../types';
import { SignUpModalTemplate } from './SignUpModalTemplate';
import { SignUpModalComponentProps } from './SignUpModalTemplate/types';

export interface SignUpModalProps extends BasicModalProps<ModalButtonLoaderEventType> {
  onSuccess?: (response?: ContentResponseType<PingResponseDTO>) => void,
}

export const SignUpModal = ({ isOpen, onClose, onSuccess }: SignUpModalProps) => {
  
  const { signUp, device: { osLabel, label } } = useJukiUser();
  
  const onSubmit: SignUpModalComponentProps['onSubmit'] = (data, setLoader) => signUp({
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onSuccess,
  });
  
  return (
    <SignUpModalTemplate isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
  );
};
