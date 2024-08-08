import { PlacesType } from 'react-tooltip';
import { ReactNodeOrFunctionType } from '../../../types';

export interface TooltipProps {
  clickable?: boolean,
  content: ReactNodeOrFunctionType,
  placement?: PlacesType,
  visible?: boolean,
  withPortal?: boolean,
  className?: string,
}
