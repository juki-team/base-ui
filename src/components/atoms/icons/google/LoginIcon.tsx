import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm-2-4-1.375-1.45 2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5Z"
    fill={color}
  />
);

export const LoginIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'login');
};
