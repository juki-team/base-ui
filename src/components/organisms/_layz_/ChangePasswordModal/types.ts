import { BasicModalProps, ModalButtonLoaderEventType } from '../../../atoms/Modal/types';

export type ProfileChangePasswordInput = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirmation: string,
}

export type ChangePasswordModalProps = BasicModalProps<ModalButtonLoaderEventType>;
