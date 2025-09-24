import type { ReactNode } from 'react';
import { ButtonLoaderOnClickType } from '../../../types';
import type { ModalProps } from '../../atoms/Modal/types';

export interface TwoActionModalProps extends ModalProps {
  primary: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  secondary?: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  title: ReactNode,
}
