import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M5.1 16.05q-.55-.95-.825-1.95Q4 13.1 4 12.05q0-3.35 2.325-5.7T12 4h.175l-1.6-1.6 1.4-1.4 4 4-4 4-1.4-1.4 1.6-1.6H12Q9.5 6 7.75 7.762 6 9.525 6 12.05q0 .65.15 1.275.15.625.45 1.225ZM12.025 23l-4-4 4-4 1.4 1.4-1.6 1.6H12q2.5 0 4.25-1.762Q18 14.475 18 11.95q0-.65-.15-1.275-.15-.625-.45-1.225l1.5-1.5q.55.95.825 1.95.275 1 .275 2.05 0 3.35-2.325 5.7T12 20h-.175l1.6 1.6Z"
    fill={color}
  />
);

export const AutorenewIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'autorenew');
};
