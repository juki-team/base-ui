import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="m8.6 22.5-1.9-3.2-3.6-.8.35-3.7L1 12l2.45-2.8-.35-3.7 3.6-.8 1.9-3.2L12 2.95l3.4-1.45 1.9 3.2 3.6.8-.35 3.7L23 12l-2.45 2.8.35 3.7-3.6.8-1.9 3.2-3.4-1.45Zm.85-2.55 2.55-1.1 2.6 1.1 1.4-2.4 2.75-.65-.25-2.8 1.85-2.1-1.85-2.15.25-2.8-2.75-.6-1.45-2.4L12 5.15l-2.6-1.1L8 6.45l-2.75.6.25 2.8L3.65 12l1.85 2.1-.25 2.85 2.75.6ZM12 12Zm-1.05 3.55L16.6 9.9l-1.4-1.45-4.25 4.25-2.15-2.1L7.4 12Z"
    fill={color}
  />
);

export const NewReleasesIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'new-releases');
};
