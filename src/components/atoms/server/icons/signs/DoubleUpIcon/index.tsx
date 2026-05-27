import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils/renderSignIcon';
import DoubleUp from './DoubleUp';

export const DoubleUpIcon = (props: SignIconProps) => {
  return renderSignIcon(props, DoubleUp);
};
