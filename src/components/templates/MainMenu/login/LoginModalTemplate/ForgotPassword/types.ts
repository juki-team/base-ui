import type { BasicModalProps } from '../../../../../atoms/Modal/types';
import { SetLoaderStatusOnClickType } from '../../../../../types';

export type OnForgotPasswordType = (email: string, setStatus: SetLoaderStatusOnClickType) => void;

export interface ForgotPasswordModalProps extends BasicModalProps {
  onForgotPassword: OnForgotPasswordType,
}
