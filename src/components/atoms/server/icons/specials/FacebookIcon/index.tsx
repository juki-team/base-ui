import { classNames } from '../../../../../helpers';
import type { IconProps } from '../../types';
import Facebook from './Facebook';

export const FacebookIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', size, 'facebook')}><Facebook /></span>
  );
};
