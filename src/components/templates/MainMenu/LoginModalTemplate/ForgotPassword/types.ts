import { BasicModalProps, SetLoaderStatusOnClickType } from '../../../../index';

export type OnForgotPasswordType = (email: string, setStatus: SetLoaderStatusOnClickType) => void;

export interface ForgotPasswordModalProps extends BasicModalProps {
  onForgotPassword: OnForgotPasswordType,
}
