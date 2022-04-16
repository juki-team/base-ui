import { SignIconProps } from '../../types';
import { renderSignIcon } from '../../utils';
import Exclamation from './Exclamation';

export const ExclamationIcon = (props: SignIconProps) => {
  return renderSignIcon(props, Exclamation);
};
