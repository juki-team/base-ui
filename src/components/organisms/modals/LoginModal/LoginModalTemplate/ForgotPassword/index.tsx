import { Status } from '@juki-team/commons/enums';
import { cleanRequest } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { jukiApiManager } from '../../../../../../settings';
import type { BasicModalProps } from '../../../../../atoms/types';
import { authorizedRequest } from '../../../../../helpers';

import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { ForgotPasswordModalComponent } from './ForgoPasswordModal';
import type { OnForgotPasswordType } from './types';

export const ForgotPasswordModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { notifyResponse } = useJukiNotification();
  const onForgotPassword: OnForgotPasswordType = async (email, setStatus) => {
    setStatus?.(Status.LOADING);
    const { url, ...options } = jukiApiManager.API_V2.auth.initiateResetPassword({ body: { email } });
    const response = cleanRequest<ContentResponse<unknown>>(await authorizedRequest(url, options));
    notifyResponse(response, setStatus);
  };

  return <ForgotPasswordModalComponent isOpen={isOpen} onForgotPassword={onForgotPassword} onClose={onClose} />;
};

export * from './types';
