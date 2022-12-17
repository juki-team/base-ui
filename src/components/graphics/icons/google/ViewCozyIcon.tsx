import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M16.25 31.75h7v-7h-7Zm0-8.5h7v-7h-7Zm8.5 8.5h7v-7h-7Zm0-8.5h7v-7h-7ZM7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V11H7v26Zm0 0V11v26Z"
    fill={color}
  />
);

export const ViewCompactAltIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon);
};
