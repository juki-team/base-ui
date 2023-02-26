import { BasicModalProps, SetLoaderStatusOnClickType } from '../../components';

export type LoginFormType = {
  nickname: string,
  password: string,
}

export interface LoginModalComponentProps extends BasicModalProps {
  onSignUpButton: () => void,
  onForgotPassword?: (email: string, setStatus: SetLoaderStatusOnClickType) => void,
  onSubmit: (data: LoginFormType, setStatus: SetLoaderStatusOnClickType) => void,
  loginWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
  highlightForgotPassword?: boolean,
}

export interface LoginModalProps extends BasicModalProps {
  onSignUpButton: () => void,
  highlightForgotPassword?: boolean,
}
