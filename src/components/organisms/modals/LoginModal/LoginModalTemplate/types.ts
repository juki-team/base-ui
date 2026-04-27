import type { Dispatch, SetStateAction } from 'react';
import type { BasicModalProps } from '../../../../atoms/Modal/types';
import type { SetLoaderStatusOnClickType } from '../../../../types';

export type LoginFormType = {
  nickname: string;
  password: string;
  organizationKey: string;
};

export interface LoginModalTemplateProps extends BasicModalProps {
  onSignUpButton: () => void;
  onForgotPassword?: (email: string, setStatus: SetLoaderStatusOnClickType) => void;
  onSubmit: (data: LoginFormType, setStatus: SetLoaderStatusOnClickType) => void;
  loginWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: never) => void;
  reactAppGoogleClientId?: string;
  multiOrganizations?: boolean;
  openForgotPasswordModal: boolean;
  setOpenForgotPasswordModal: Dispatch<SetStateAction<boolean>>;
}
