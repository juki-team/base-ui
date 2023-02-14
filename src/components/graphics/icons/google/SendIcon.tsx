import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M3 20V4l19 8Zm2-3 11.85-5L5 7v3.5l6 1.5-6 1.5Zm0 0V7v6.5Z" fill={color} />
);

export const SendIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'send');
};
