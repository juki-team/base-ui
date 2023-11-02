import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const Today = memo(({ color }: RootIconProps) => (
  <path
    d="M19 4H18V3C18 2.45 17.3 2 16.75 2C16.2 2 15.5 2.45 15.5 3V4H8.5V3C8.5 2.45 7.8 2 7.25 2C6.7 2 6 2.45 6 3V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM17.5 19.5H6.5C5.95 19.5 5.5 19.05 5.5 18.5V9H18.5V18.5C18.5 19.05 18.05 19.5 17.5 19.5ZM8.5 11H11.5C12.05 11 12.5 11.45 12.5 12V15C12.5 15.55 12.05 16 11.5 16H8.5C7.95 16 7.5 15.55 7.5 15V12C7.5 11.45 7.95 11 8.5 11Z"
    fill={color}
  />
));

export default Today;
