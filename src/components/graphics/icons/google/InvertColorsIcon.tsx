import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M12 21q-3.325 0-5.662-2.312Q4 16.375 4 13.1q0-1.65.625-3.05t1.725-2.5L12 2l5.65 5.55q1.1 1.1 1.725 2.5T20 13.1q0 3.275-2.337 5.588Q15.325 21 12 21Zm0-2V4.8L7.75 9q-.875.825-1.312 1.862Q6 11.9 6 13.1q0 2.425 1.75 4.162Q9.5 19 12 19Z"
    fill={color}
  />
);

export const InvertColorsIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'invert-colors');
};
