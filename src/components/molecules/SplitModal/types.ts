import { ReactElement } from 'react';
import { ReactNodeOrFunctionType } from '../../../types';
import { BasicModalProps } from '../../atoms';

export interface SplitModalProps extends BasicModalProps {
  isOpen: boolean,
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
  children: ReactElement,
}
