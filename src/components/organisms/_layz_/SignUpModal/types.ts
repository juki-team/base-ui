import { ContentResponseType, PingResponseDTO } from '@juki-team/commons';
import { BasicModalProps, ModalButtonLoaderEventType } from '../../../atoms/Modal/types';

export interface SignUpModalProps extends BasicModalProps<ModalButtonLoaderEventType> {
  onSignInButton: () => void,
  onSuccess?: (response?: ContentResponseType<PingResponseDTO>) => void,
}
