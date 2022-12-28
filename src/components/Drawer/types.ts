import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType, TriggerOnActionsType } from '../../types';

export interface DrawerViewProps {
  position?: 'top' | 'right' | 'bottom' | 'left',
  isOpen: boolean,
  onClose?: (isOpen: boolean) => void,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
  // closeIcon?: false | ReactNodeOrFunctionType, // no working because true is a ReactNode
  closeIcon?: ReactNodeOrFunctionP1Type<{ isOpen: boolean, close: () => void }>,
}

export type DrawerActionsType = { isOpen: boolean, open: () => void, close: () => void, toggle: () => void };

export interface DrawerProps {
  content: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  position?: 'top' | 'right' | 'bottom' | 'left',
  triggerOn?: TriggerOnActionsType,
  triggerOnDelayInMs?: { [key in TriggerOnActionsType]: number },
  closeOnEscape?: boolean,
  closeOnOutside?: boolean,
  closeIcon?: ReactNodeOrFunctionType,
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>;
}
