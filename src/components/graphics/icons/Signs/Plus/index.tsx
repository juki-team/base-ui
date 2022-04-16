import { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import NarrowPlus from './NarrowPlus';
import Plus from './Plus';

export const PlusIcon = (props: SignIconProps) => {
  return renderSignIcon(props, props.circle || props.square || props.filledCircle || props.filledSquare ? NarrowPlus : Plus);
};