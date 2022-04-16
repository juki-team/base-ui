import { SetLoaderStatusOnClickType } from '../../index';

export interface ForgotPasswordModalProps {
  onCancel: () => void,
  onForgotPassword: (email: string, setStatus: SetLoaderStatusOnClickType) => void,
}
