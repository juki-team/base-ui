import { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import Arrow from './Arrow';
import NarrowArrow from './NarrowArrow';

export const ArrowIcon = (props: SignIconProps) => {
  return renderSignIcon(props, props.circle || props.square || props.filledCircle || props.filledSquare ? NarrowArrow : Arrow);
};