import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M480-80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-40-320v-327L336-624l-56-56 200-200 200 200-57 56-103-103v327h-80Z"
    fill={color}
  />
);

export const StepOutIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon, 'step-out');
};
