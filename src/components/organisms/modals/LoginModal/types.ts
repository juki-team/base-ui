import { Dispatch, SetStateAction } from 'react';

export interface LoginModalProps {
  multiCompanies?: boolean,
  openForgotPasswordModal: boolean,
  setOpenForgotPasswordModal: Dispatch<SetStateAction<boolean>>,
}
