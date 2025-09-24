import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import Minus from './Minus';
import NarrowMinus from './NarrowMinus';

export const MinusIcon = (props: SignIconProps) => (
  renderSignIcon(props, props.circle || props.square || props.filledCircle || props.filledSquare ? NarrowMinus : Minus)
);
