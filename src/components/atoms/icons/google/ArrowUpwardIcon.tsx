import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M11 20V7.825l-5.6 5.6L4 12l8-8 8 8-1.4 1.425-5.6-5.6V20Z" fill={color} />;

export const ArrowUpwardIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-upward');
};
