import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M7.5 16.5h4v-4h-4Zm0-5h4v-4h-4Zm5 5h4v-4h-4Zm0-5h4v-4h-4ZM4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20Zm0-2h16V6H4v12Zm0 0V6v12Z"
    fill={color}
  />
);

export const ViewCozyIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'view-cozy');
};
