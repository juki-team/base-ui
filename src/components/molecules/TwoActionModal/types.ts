import { ReactNode } from 'react';
import { ButtonLoaderOnClickType, ModalProps } from '../../../types';

export interface TwoActionModalProps extends ModalProps {
  primary: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  secondary?: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  title: ReactNode,
}
