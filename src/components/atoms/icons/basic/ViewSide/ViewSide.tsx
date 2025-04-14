import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const ViewSide = memo(({ color }: RootIconProps) => (
  <path
    d="M20.9474 13H3.05263C2.47368 13 2 13.45 2 14V20C2 20.55 2.47368 21 3.05263 21H20.9474C21.5263 21 22 20.55 22 20V14C22 13.45 21.5263 13 20.9474 13ZM20.9474 3H3.05263C2.47368 3 2 3.45 2 4V10C2 10.55 2.47368 11 3.05263 11H20.9474C21.5263 11 22 10.55 22 10V4C22 3.45 21.5263 3 20.9474 3Z"
    fill={color}
  />
));

export default ViewSide;
