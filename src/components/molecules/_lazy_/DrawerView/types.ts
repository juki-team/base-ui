import type { PropsWithChildren } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../../types';

export interface DrawerViewProps extends PropsWithChildren<{
  position?: 'top' | 'right' | 'bottom' | 'left',
  isOpen: boolean,
  onClose?: (isOpen: boolean) => void,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
  // closeIcon?: false | ReactNodeOrFunctionType, // no working because true is a ReactNode
  closeIcon?: ReactNodeOrFunctionP1Type<{ isOpen: boolean, close: () => void }>,
}> {
}
