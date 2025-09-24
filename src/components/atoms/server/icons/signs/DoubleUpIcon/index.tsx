import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import DoubleUp from './DoubleUp';

export const DoubleUpIcon = (props: SignIconProps) => {
  return renderSignIcon(props, DoubleUp);
};
