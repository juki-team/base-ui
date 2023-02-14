import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M8 19v-3H5v-2h5v5Zm6 0v-5h5v2h-3v3Zm-9-9V8h3V5h2v5Zm9 0V5h2v3h3v2Z" fill={color} />
);

export const FullscreenExitIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'fullscreen-exit');
};
