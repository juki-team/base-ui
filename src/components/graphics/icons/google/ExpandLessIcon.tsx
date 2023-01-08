import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={color} />;

export const ExpandLessIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon);
};
