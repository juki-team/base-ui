import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M5 19v-5h2v3h3v2Zm0-9V5h5v2H7v3Zm9 9v-2h3v-3h2v5Zm3-9V7h-3V5h5v5Z" fill={color} />
);

export const FullscreenIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'fullscreen');
};
