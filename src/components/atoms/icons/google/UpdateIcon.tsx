import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3q2.05 0 3.888.875Q17.725 4.75 19 6.35V4h2v6h-6V8h2.75q-1.025-1.4-2.525-2.2Q13.725 5 12 5 9.075 5 7.038 7.037 5 9.075 5 12q0 2.925 2.038 4.962Q9.075 19 12 19q2.625 0 4.587-1.7Q18.55 15.6 18.9 13h2.05q-.375 3.425-2.937 5.712Q15.45 21 12 21Zm2.8-4.8L11 12.4V7h2v4.6l3.2 3.2Z"
    fill={color}
  />
);

export const UpdateIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'update');
};
