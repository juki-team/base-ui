import { Placement } from '@floating-ui/react';
import { ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, TriggerOnActionsType } from '../../../types';

export interface PopoverProps {
  content: ReactNodeOrFunctionP1Type<{ isOpen: boolean, onClose: () => void }>,
  placement?: Placement,
  open?: boolean,
  onOpenChange?: (visible: boolean) => void,
  triggerOn?: TriggerOnActionsType | TriggerOnActionsType[],
  popoverClassName?: string,
  // popoverContentClassName?: string,
  children: ReactNode,
  // marginOfChildren?: number,
  offset?: number,
}

export type PlacementType = Placement;
