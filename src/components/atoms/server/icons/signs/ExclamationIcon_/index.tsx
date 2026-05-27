import type { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils/renderSignIcon';
import Exclamation from './Exclamation';

export const ExclamationIcon_ = (props: SignIconProps) => {
  return renderSignIcon(props, Exclamation);
};
