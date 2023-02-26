import { ContentResponseType, PingResponseDTO } from '@juki-team/commons';
import { BasicModalProps, SetLoaderStatusOnClickType } from '../../components';

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

export interface SignUpModalProps extends BasicModalProps {
  onSuccess?: (response?: ContentResponseType<PingResponseDTO>) => void,
}
