import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils/renderSignIcon';
import Up from './Up';

export const UpIcon = (props: SignIconProps) => {
  return renderSignIcon(props, Up);
};
