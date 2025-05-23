import { BasicModalProps, SetLoaderStatusOnClickType } from '../../../../../types';

export type LoginFormType = {
  nickname: string,
  password: string,
  companyKey?: string,
}

export interface LoginModalTemplateProps extends BasicModalProps {
  onSignUpButton: () => void,
  onForgotPassword?: (email: string, setStatus: SetLoaderStatusOnClickType) => void,
  onSubmit: (data: LoginFormType, setStatus: SetLoaderStatusOnClickType) => void,
  loginWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
  highlightForgotPassword?: boolean,
  multiCompanies?: boolean,
}
