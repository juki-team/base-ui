import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m14 17-5-5 5-5Z" fill={color} />;

export const ArrowLeftIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-left');
};
