import { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import Check from './Check';

export const CheckIcon = (props: SignIconProps) => {
  return renderSignIcon(props, Check);
};
