import { SetLoaderStatusOnClickType } from '../../index';
import { BasicModalProps } from '../types';

export type LoginInputType = {
  nickname: string,
  password: string,
}

export interface LoginModalProps extends BasicModalProps {
  onSignUpButton: () => void,
  onForgotPassword?: (email: string, setStatus: SetLoaderStatusOnClickType) => void,
  onSubmit: (data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => void,
  loginWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
  highlightForgotPassword?: boolean,
}
