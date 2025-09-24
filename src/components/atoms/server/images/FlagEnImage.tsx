import { classNames } from '../../../../helpers';

import type { ImageProps } from './types';

export const FlagEnImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-bg-image flag-en', className)} />
  );
};
