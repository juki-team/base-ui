import { ReactNodeOrFunctionType } from '../../../types';
import { BasicModalProps } from '../../Modal/types';

export interface SplitModalProps extends BasicModalProps {
  isOpen: boolean,
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
}
