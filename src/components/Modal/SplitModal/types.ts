import { ReactNodeOrFunctionType } from '../../../types';

export interface SplitModalProps {
  isOpen: boolean,
  onClose: () => void,
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
}
