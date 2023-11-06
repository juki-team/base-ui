import { ReactElement } from 'react';
import { ReactNodeOrFunctionP1Type, TriggerOffActionsType, TriggerOnActionsType } from '../../../types';

export type PlacementType =
  'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'
  | 'center'
  | 'centerScreen';

export interface PopoverProps {
  content: ReactNodeOrFunctionP1Type<{ isOpen: boolean, onClose: (timeout: number) => void }>,
  placement?: PlacementType,
  visible?: boolean,
  onVisibleChange?: (visible: boolean) => void,
  triggerOn?: TriggerOnActionsType | TriggerOnActionsType[],
  triggerOff?: TriggerOffActionsType | TriggerOffActionsType[],
  triggerOnDelayInMs?: { [key in TriggerOnActionsType]: number },
  triggerOffDelayInMs?: { [key in TriggerOffActionsType]: number },
  popoverClassName?: string,
  popoverContentClassName?: string,
  showPopperArrow?: boolean,
  keepMounted?: boolean,
  children: ReactElement,
  marginOfChildren?: number,
}
