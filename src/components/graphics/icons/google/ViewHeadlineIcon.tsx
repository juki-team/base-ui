import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M4 15v-2h16v2Zm0 4v-2h16v2Zm0-8V9h16v2Zm0-4V5h16v2Z" fill={color} />;

export const ViewHeadlineIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon);
};
