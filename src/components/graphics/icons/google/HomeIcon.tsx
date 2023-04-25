import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M240 856h120V616h240v240h120V496L480 316 240 496v360Zm-80 80V456l320-240 320 240v480H520V696h-80v240H160Zm320-350Z"
    fill={color}
  />
);

export const HomeIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 96 960 960' }, Icon, 'home');
};
