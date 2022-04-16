import { ReactNode } from 'react';
import { TriggerOffActionsType, TriggerOnActionsType } from '../../types';

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
  content: ReactNode | ((visible: boolean) => ReactNode),
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
