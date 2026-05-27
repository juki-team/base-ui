import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils/renderSignIcon';
import Check from './Check';

export const CheckIcon_ = (props: SignIconProps) => {
  return renderSignIcon(props, Check);
};
