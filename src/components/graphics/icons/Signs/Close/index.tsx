import { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import NarrowPlus from '../Plus/NarrowPlus';
import Plus from '../Plus/Plus';

export const CloseIcon_ = ({ rotate = 0, ...props }: SignIconProps) => {
  return renderSignIcon({ rotate: rotate + 45, ...props }, props.circle || props.square || props.filledCircle || props.filledSquare ? NarrowPlus : Plus);
};
