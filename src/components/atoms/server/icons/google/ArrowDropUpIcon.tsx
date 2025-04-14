import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m7 14 5-5 5 5Z" fill={color} />;

export const ArrowDropUpIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-drop-up');
};
