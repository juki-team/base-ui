import { SetLoaderStatusOnClickType } from '../../components';

export type OnForgotPasswordType = (email: string, setStatus: SetLoaderStatusOnClickType) => void;

export interface ForgotPasswordModalProps {
  onCancel: () => void,
  onForgotPassword: OnForgotPasswordType,
}
