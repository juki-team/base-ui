import { classNames } from '../../../../helpers';
import { ImageProps } from './types';

export const FlagEsImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-bg-image flag-es', className)} />
  );
};
