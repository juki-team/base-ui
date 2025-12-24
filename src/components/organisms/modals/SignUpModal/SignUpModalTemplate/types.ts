import type { BasicModalProps, ModalButtonLoaderEventType } from '../../../../atoms/types';
import { SetLoaderStatusOnClickType } from '../../../../types';

export type SignUpFormType = {
  givenName: string,
  familyName: string,
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  checkbox: boolean,
}

export interface SignUpModalComponentProps extends BasicModalProps<ModalButtonLoaderEventType> {
  onSignInButton: () => void,
  onSubmit: (data: SignUpFormType, setStatus?: SetLoaderStatusOnClickType) => void,
  signUpWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
}
