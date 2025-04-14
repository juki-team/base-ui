import React from 'react';
import { classNames } from '../../../../helpers';

import { ImageProps } from './types';

export const FlagEnImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-bg-image flag-en', className)} />
  );
};
