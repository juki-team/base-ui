import React from 'react';
import { LoadingIcon } from '../icons';

export const Loader = ({ loading, component }: LoaderProps): JSX.Element => {
  return loading ? <LoadingIcon /> : component();
};
