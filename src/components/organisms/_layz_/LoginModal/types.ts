import { BasicModalProps } from '../../../atoms/Modal/types';

export interface LoginModalProps extends BasicModalProps {
  onSignUpButton: () => void,
  multiCompanies?: boolean,
}
