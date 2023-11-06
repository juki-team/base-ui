import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const AtSign = memo(({ color }: RootIconProps) => (
  <path
    d="M12.7201 2.03001C6.63007 1.60001 1.60007 6.63001 2.03007 12.72C2.39007 18.01 7.01007 22 12.3101 22H16.0001C16.5501 22 17.0001 21.55 17.0001 21C17.0001 20.45 16.5501 20 16.0001 20H12.3301C8.60007 20 5.18007 17.58 4.25007 13.97C2.76007 8.17001 8.16007 2.76001 13.9601 4.26001C17.5801 5.18001 20.0001 8.60001 20.0001 12.33V13.43C20.0001 14.22 19.2901 15 18.5001 15C17.7101 15 17.0001 14.22 17.0001 13.43V12.18C17.0001 9.67001 15.2201 7.41001 12.7401 7.06001C9.34007 6.57001 6.47007 9.51001 7.08007 12.93C7.42007 14.84 8.91007 16.42 10.8001 16.87C12.6401 17.3 14.3901 16.71 15.5401 15.54C16.4301 16.76 18.2101 17.4 19.8401 16.75C21.1801 16.22 22.0001 14.85 22.0001 13.41V12.32C22.0001 7.01001 18.0101 2.39001 12.7201 2.03001V2.03001ZM12.0001 15C10.3401 15 9.00007 13.66 9.00007 12C9.00007 10.34 10.3401 9.00001 12.0001 9.00001C13.6601 9.00001 15.0001 10.34 15.0001 12C15.0001 13.66 13.6601 15 12.0001 15Z"
    fill={color}
  />
));

export default AtSign;