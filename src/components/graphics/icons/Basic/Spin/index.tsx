import { classNames } from '../../../../../helpers';
import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Spin from './Spin';

export const SpinIcon = (props: BasicIconProps) => renderBasicIcon(props, Spin);

export const LoadingIcon_ = ({ className = '', ...props }: BasicIconProps) => (
  renderBasicIcon({ className: classNames('rotating', className), ...props }, Spin)
);
