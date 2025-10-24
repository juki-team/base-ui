import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType, TriggerOnActionsType } from '../../types';

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
