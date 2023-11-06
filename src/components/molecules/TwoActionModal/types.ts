import { ReactNode } from 'react';
import { BasicModalProps, ButtonLoaderOnClickType } from '../../index';

export interface TwoActionModalProps extends BasicModalProps {
  primary: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  secondary?: { onClick: ButtonLoaderOnClickType, label?: ReactNode, disabled?: boolean },
  title: ReactNode,
}
