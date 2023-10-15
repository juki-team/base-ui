import { BasicModalProps, SetLoaderStatusOnClickType } from '../../../index';

export type SignUpFormType = {
  givenName: string,
  familyName: string,
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  checkbox: boolean,
}

export interface SignUpModalComponentProps extends BasicModalProps {
  onSubmit: (data: SignUpFormType, setStatus: SetLoaderStatusOnClickType) => void,
  signUpWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
}
