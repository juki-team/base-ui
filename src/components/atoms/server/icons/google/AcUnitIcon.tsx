import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M440-80v-166L310-118l-56-56 186-186v-80h-80L174-254l-56-56 128-130H80v-80h166L118-650l56-56 186 186h80v-80L254-786l56-56 130 128v-166h80v166l130-128 56 56-186 186v80h80l186-186 56 56-128 130h166v80H714l128 130-56 56-186-186h-80v80l186 186-56 56-130-128v166h-80Z"
    fill={color}
  />
);

export const AcUnitIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon, 'ac-unit');
};
