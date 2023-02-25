import { BasicModalProps, SetLoaderStatusOnClickType } from '../../components';

export type SignUpInputType = {
  givenName: string,
  familyName: string,
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  checkbox: boolean,
}

export interface SignUpModalProps extends BasicModalProps {
  onSubmit: (data: SignUpInputType, setStatus: SetLoaderStatusOnClickType) => void,
  signUpWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
}
