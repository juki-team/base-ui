import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M15 20q-3.35 0-5.675-2.325Q7 15.35 7 12q0-3.325 2.325-5.663Q11.65 4 15 4q3.325 0 5.663 2.337Q23 8.675 23 12q0 3.35-2.337 5.675Q18.325 20 15 20Zm0-2q2.5 0 4.25-1.75T21 12q0-2.5-1.75-4.25T15 6q-2.5 0-4.25 1.75T9 12q0 2.5 1.75 4.25T15 18Zm2.275-2.275L18.7 14.3 16 11.6V8h-2v4.425ZM2 9V7h4v2Zm-1 4v-2h5v2Zm1 4v-2h4v2Zm13-5Z"
    fill={color}
  />
);

export const AcuteIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'acute');
};
