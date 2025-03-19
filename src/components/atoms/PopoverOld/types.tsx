import { ReactElement } from 'react';
import { BasePopoverProps, ContentRenderer, PopoverPosition } from 'react-tiny-popover';
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
  // content: ReactNodeOrFunctionP1Type<{ isOpen: boolean, onClose: (timeout: number) => void }>,
  content: ReactNodeOrFunctionP1Type<{ isOpen: boolean, onClose: () => void }>,
  placement?: PlacementType,
  visible?: boolean,
  onVisibleChange?: (visible: boolean) => void,
  triggerOn?: TriggerOnActionsType | TriggerOnActionsType[],
  triggerOff?: TriggerOffActionsType | TriggerOffActionsType[],
  popoverClassName?: string,
  popoverContentClassName?: string,
  showPopperArrow?: boolean,
  children: ReactElement,
  marginOfChildren?: number,
}

export type ReactTinyPopoverProps = BasePopoverProps & {
  children: ReactElement;
  positions?: PopoverPosition[] | PopoverPosition;
  content: ContentRenderer | ReactElement;
  ref?: React.Ref<HTMLElement>;
  containerStyle?: Partial<CSSStyleDeclaration>;
  onClickOutside?: (e: MouseEvent) => void;
  clickOutsideCapture?: boolean;
  showPopperArrow: boolean;
};
