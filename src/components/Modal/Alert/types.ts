import { ReactNode } from 'react';
import { BasicModalProps, ButtonLoaderOnClickType } from '../../index';

export interface AlertModalProps extends BasicModalProps {
  decline: { onClick: () => void, label?: ReactNode },
  accept: { onClick: ButtonLoaderOnClickType, label?: ReactNode },
  title: ReactNode,
  content: ReactNode,
}
