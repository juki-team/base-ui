import type { Dispatch, SetStateAction } from 'react';

export interface LoginModalProps {
  multiOrganizations?: boolean;
  openForgotPasswordModal: boolean;
  setOpenForgotPasswordModal: Dispatch<SetStateAction<boolean>>;
}
