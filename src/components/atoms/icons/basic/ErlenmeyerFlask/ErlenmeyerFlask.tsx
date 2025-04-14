import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const ErlenmeyerFlask = memo(({ color }: RootIconProps) => (
  <path
    d="M21.749 20L14.499 10.3375V5.125L16.1865 3.0125C16.5115 2.6 16.224 2 15.699 2H8.299C7.774 2 7.4865 2.6 7.8115 3.0125L9.499 5.125V10.3375L2.249 20C1.6365 20.825 2.224 22 3.249 22H20.749C21.774 22 22.3615 20.825 21.749 20Z"
    fill={color}
  />
));

export default ErlenmeyerFlask;
