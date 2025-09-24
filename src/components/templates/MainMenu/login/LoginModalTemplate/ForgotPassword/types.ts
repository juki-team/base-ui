import type { SetLoaderStatusOnClickType } from '../../../../../../types';
import type { BasicModalProps } from '../../../../../atoms/Modal/types';

export type OnForgotPasswordType = (email: string, setStatus: SetLoaderStatusOnClickType) => void;

export interface ForgotPasswordModalProps extends BasicModalProps {
  onForgotPassword: OnForgotPasswordType,
}
