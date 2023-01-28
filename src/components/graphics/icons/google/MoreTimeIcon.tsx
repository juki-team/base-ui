import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M11 21q-1.875 0-3.512-.7-1.638-.7-2.863-1.925T2.7 15.512Q2 13.875 2 12t.7-3.513q.7-1.637 1.925-2.862T7.488 3.7Q9.125 3 11 3q.525 0 1.012.062.488.063.988.188V5.3q-.5-.15-.988-.225Q11.525 5 11 5 8.05 5 6.025 7.025 4 9.05 4 12q0 2.95 2.025 4.975Q8.05 19 11 19q2.95 0 4.975-2.025Q18 14.95 18 12q0-.275-.025-.5-.025-.225-.075-.5h2.05q.05.275.05.5v.5q0 1.875-.7 3.512-.7 1.638-1.925 2.863T14.513 20.3Q12.875 21 11 21Zm2.8-4.8L10 12.4V7h2v4.6l3.2 3.2ZM18 9V6h-3V4h3V1h2v3h3v2h-3v3Z"
    fill={color}
  />
);

export const MoreTimeIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon);
};
