import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const Assignment = memo(({ color }: RootIconProps) => (
  <path
    d="M19 4H14.82C14.4 2.84 13.3 2 12 2C10.7 2 9.6 2.84 9.18 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4ZM13 18H8C7.45 18 7 17.55 7 17C7 16.45 7.45 16 8 16H13C13.55 16 14 16.45 14 17C14 17.55 13.55 18 13 18ZM16 14H8C7.45 14 7 13.55 7 13C7 12.45 7.45 12 8 12H16C16.55 12 17 12.45 17 13C17 13.55 16.55 14 16 14ZM16 10H8C7.45 10 7 9.55 7 9C7 8.45 7.45 8 8 8H16C16.55 8 17 8.45 17 9C17 9.55 16.55 10 16 10Z"
    fill={color}
  />
));

export default Assignment;
