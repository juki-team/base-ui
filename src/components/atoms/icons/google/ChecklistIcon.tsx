import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M5.55 19 2 15.45l1.4-1.4 2.125 2.125 4.25-4.25 1.4 1.425Zm0-8L2 7.45l1.4-1.4 2.125 2.125 4.25-4.25 1.4 1.425ZM13 17v-2h9v2Zm0-8V7h9v2Z"
    fill={color}
  />
);

export const ChecklistIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'checklist');
};
