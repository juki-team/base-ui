import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const CloudUpload = memo(({ color }: RootIconProps) => ( // width of arrow ~ 2.5
  <path
    d="M18.125 10.0333C17.5583 7.15833 15.0333 5 12 5C9.59167 5 7.5 6.36667 6.45833 8.36667C3.95 8.63333 2 10.7583 2 13.3333C2 16.0917 4.24167 18.3333 7 18.3333H17.8333C20.1333 18.3333 22 16.4667 22 14.1667C22 11.9667 20.2917 10.1833 18.125 10.0333ZM13.6667 12.5V15.8333H10.3333V12.5H7.83333L11.7083 8.625C11.875 8.45833 12.1333 8.45833 12.3 8.625L16.1667 12.5H13.6667Z"
    fill={color}
  />
));

export default CloudUpload;
