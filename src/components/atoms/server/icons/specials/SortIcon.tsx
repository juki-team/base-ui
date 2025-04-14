import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ up, down }: { up?: boolean, down?: boolean }) => ({ color }: RootIconProps) => (
  <>
    <path
      fill={up ? color : 'var(--t-color-highlight-light)'}
      d="M305.87-438.87v-257.61l-90 90-75.09-74.09 218.09-218.65 218.09 218.65-75.09 74.09-90-90v257.61h-106Z"
    />
    <path
      fill={down ? color : 'var(--t-color-highlight-light)'}
      d="M601.13-60.78 383.04-279.43l75.09-74.09 90 90v-257.61h106v257.61l90-90 75.09 74.09L601.13-60.78Z"
    />
  </>
);

export const SortIcon = ({ up, down, ...props }: BasicIconProps & { up?: boolean, down?: boolean }) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon({ up, down }), 'pending');
};
