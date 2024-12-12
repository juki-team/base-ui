import { BasicModalProps, ModalButtonLoaderEventType } from '../../../atoms/types';
import { SetLoaderStatusOnClickType } from '../../../molecules/types';

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
  onSubmit: (data: SignUpFormType, setStatus?: SetLoaderStatusOnClickType) => void,
  signUpWithGoogle?: (setStatus?: SetLoaderStatusOnClickType) => (response: any) => void,
  reactAppGoogleClientId?: string,
}
