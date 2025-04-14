import { classNames } from '../../../../../../helpers';
import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Spin from './Spin';

export type SpinIconProps = BasicIconProps & {
  speed?: 'none' | 'slow' | 'regular' | 'fast',
}

export const SpinIcon = ({ className = '', speed, ...props }: SpinIconProps) => (
  renderBasicIcon({ className: classNames(speed !== 'none' ? 'rotating' : '', speed, className), ...props }, Spin)
);
