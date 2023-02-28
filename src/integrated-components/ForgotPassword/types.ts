import { BasicModalProps, SetLoaderStatusOnClickType } from '../../components';

export type OnForgotPasswordType = (email: string, setStatus: SetLoaderStatusOnClickType) => void;

export interface ForgotPasswordModalProps extends BasicModalProps {
  onForgotPassword: OnForgotPasswordType,
}
