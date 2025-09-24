import type { PropsWithChildren } from 'react';
import type { ReactNodeOrFunctionType, TriggerOnActionsType } from '../../../types';
import { ReactNodeOrFunctionP1Type } from '../../types';

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

export type DrawerActionsType = { isOpen: boolean, onOpen: () => void, onClose: () => void, toggle: () => void };

export interface DrawerProps {
  content: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  position?: 'top' | 'right' | 'bottom' | 'left',
  triggerOn?: TriggerOnActionsType,
  
  // triggerOnDelayInMs?: { [key in TriggerOnActionsType]: number },
  closeOnEscape?: boolean,
  closeOnOutside?: boolean,
  closeIcon?: ReactNodeOrFunctionType,
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>;
}
