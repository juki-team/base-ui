import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M9 3V1h6v2Zm2 11h2V8h-2Zm1 8q-1.85 0-3.488-.712-1.637-.713-2.862-1.938t-1.938-2.862Q3 14.85 3 13t.712-3.488Q4.425 7.875 5.65 6.65t2.862-1.937Q10.15 4 12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4 1.4 1.4-1.4 1.4Q20 8.6 20.5 10.025 21 11.45 21 13q0 1.85-.712 3.488-.713 1.637-1.938 2.862t-2.862 1.938Q13.85 22 12 22Zm0-2q2.9 0 4.95-2.05Q19 15.9 19 13q0-2.9-2.05-4.95Q14.9 6 12 6 9.1 6 7.05 8.05 5 10.1 5 13q0 2.9 2.05 4.95Q9.1 20 12 20Zm0-7Z"
    fill={color}
  />
);

export const TimerIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'timer');
};
