import { SetLoaderStatusOnClickType } from '../../components';

export interface ForgotPasswordModalProps {
  onCancel: () => void,
  onForgotPassword: (email: string, setStatus: SetLoaderStatusOnClickType) => void,
}
