import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="m200 936-80-480h720l-80 480H200Zm67-80h426l51-320H216l51 320Zm133-160h160q17 0 28.5-11.5T600 656q0-17-11.5-28.5T560 616H400q-17 0-28.5 11.5T360 656q0 17 11.5 28.5T400 696ZM240 416q-17 0-28.5-11.5T200 376q0-17 11.5-28.5T240 336h480q17 0 28.5 11.5T760 376q0 17-11.5 28.5T720 416H240Zm80-120q-17 0-28.5-11.5T280 256q0-17 11.5-28.5T320 216h320q17 0 28.5 11.5T680 256q0 17-11.5 28.5T640 296H320Zm-53 560h426-426Z"
    fill={color}
  />
);

export const HomeStorageIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 96 960 960' }, Icon, 'home-storage');
};
