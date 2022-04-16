import { ReactNode } from 'react';
import { ButtonLoaderOnClickType } from '../../index';

export interface AlertModalProps {
  decline: { onClick: () => void, label?: ReactNode },
  accept: { onClick: ButtonLoaderOnClickType, label?: ReactNode },
  onCancel: () => void,
  title: ReactNode,
  content: ReactNode,
}
