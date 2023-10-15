import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m12 15-5-5h10Z" fill={color} />;

export const ArrowDropDownIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-drop-down');
};
