import { ContentResponseType, Status } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../../../config';
import { authorizedRequest, cleanRequest } from '../../../../../helpers';
import { useNotification } from '../../../../../hooks';
import { BasicModalProps } from '../../../../atoms';
import { ForgotPasswordModalComponent } from './ForgoPasswordModal';
import { OnForgotPasswordType } from './types';

export const ForgotPasswordModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { notifyResponse } = useNotification();
  const onForgotPassword: OnForgotPasswordType = async (email, setStatus) => {
    setStatus?.(Status.LOADING);
    const { url, ...options } = jukiSettings.API.auth.initiateResetPassword({ body: { email } });
    const response = cleanRequest<ContentResponseType<any>>(await authorizedRequest(url, options));
    notifyResponse(response, setStatus);
  };
  
  return (
    <ForgotPasswordModalComponent isOpen={isOpen} onForgotPassword={onForgotPassword} onClose={onClose} />
  );
};

export * from './types';
