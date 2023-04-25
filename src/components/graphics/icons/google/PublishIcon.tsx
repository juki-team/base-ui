import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M440 896V570L336 674l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160 456V336q0-33 23.5-56.5T240 256h480q33 0 56.5 23.5T800 336v120h-80V336H240v120h-80Z"
    fill={color}
  />
);

export const PublishIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 96 960 960' }, Icon, 'publish');
};
