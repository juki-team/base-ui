import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M11.5 22q-2.3 0-3.9-1.6T6 16.5V6q0-1.65 1.175-2.825Q8.35 2 10 2q1.65 0 2.825 1.175Q14 4.35 14 6v9.5q0 1.05-.725 1.775Q12.55 18 11.5 18q-1.05 0-1.775-.725Q9 16.55 9 15.5V6h1.5v9.5q0 .425.288.712.287.288.712.288t.713-.288q.287-.287.287-.712V6q0-1.05-.725-1.775Q11.05 3.5 10 3.5q-1.05 0-1.775.725Q7.5 4.95 7.5 6v10.5q0 1.65 1.175 2.825Q9.85 20.5 11.5 20.5q1.65 0 2.825-1.175Q15.5 18.15 15.5 16.5V6H17v10.5q0 2.3-1.6 3.9T11.5 22Z"
    fill={color}
  />
);

export const AttachFileIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'attach-file');
};
