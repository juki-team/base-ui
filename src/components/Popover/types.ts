import { ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, TriggerOffActionsType, TriggerOnActionsType } from '../../types';

export type placementType =
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
  content: ReactNode | ((prop: { isOpen: boolean, onClose: (timeout: number) => void }) => ReactNode),
  placement?: placementType,
  visible?: boolean,
  onVisibleChange?: (visible: boolean) => void,
  triggerOn?: TriggerOnActionsType | TriggerOnActionsType[],
  triggerOff?: TriggerOffActionsType | TriggerOffActionsType[],
  triggerOnDelayInMs?: { [key in TriggerOnActionsType]: number },
  triggerOffDelayInMs?: { [key in TriggerOffActionsType]: number },
  popoverClassName?: string,
  showPopperArrow?: boolean,
  keepMounted?: boolean,
  children: ReactNodeOrFunctionP1Type<any>,
}

export type UseTriggerWrapperProps = {
  visible?: boolean,
  onVisibleChange?: (visible: boolean) => void,
  triggerOn: TriggerOnActionsType | TriggerOnActionsType[],
  triggerOff: TriggerOffActionsType | TriggerOffActionsType[],
  triggerOnDelayInMs: { [key in TriggerOnActionsType]: number },
  triggerOffDelayInMs: { [key in TriggerOffActionsType]: number },
  withOutsideAlerter?: boolean,
};
