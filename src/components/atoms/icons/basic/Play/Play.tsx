import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const Play = memo(({ color }: RootIconProps) => (
  <path
    d="M5 5.29602V18.704C5 19.7264 6.20059 20.3476 7.12518 19.7911L18.3583 13.0871C19.2139 12.5824 19.2139 11.4176 18.3583 10.8999L7.12518 4.20889C6.20059 3.65238 5 4.2736 5 5.29602Z"
    fill={color}
  />
));

export default Play;
