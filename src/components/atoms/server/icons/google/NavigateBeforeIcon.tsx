import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" fill={color} />;

export const NavigateBeforeIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'navigate-before');
};
