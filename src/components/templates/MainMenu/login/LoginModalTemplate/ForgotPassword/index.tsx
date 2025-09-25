import { cleanRequest, type ContentResponseType, Status } from '@juki-team/commons';
import { authorizedRequest } from '../../../../../../helpers';
import { jukiApiManager } from '../../../../../../settings';
import type { BasicModalProps } from '../../../../../atoms/types';
import { useJukiNotification } from '../../../../../hooks';
import { ForgotPasswordModalComponent } from './ForgoPasswordModal';
import type { OnForgotPasswordType } from './types';

export const ForgotPasswordModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { notifyResponse } = useJukiNotification();
  const onForgotPassword: OnForgotPasswordType = async (email, setStatus) => {
    setStatus?.(Status.LOADING);
    const { url, ...options } = jukiApiManager.API_V1.auth.initiateResetPassword({ body: { email } });
    const response = cleanRequest<ContentResponseType<any>>(await authorizedRequest(url, options));
    notifyResponse(response, setStatus);
  };
  
  return (
    <ForgotPasswordModalComponent isOpen={isOpen} onForgotPassword={onForgotPassword} onClose={onClose} />
  );
};

export * from './types';
