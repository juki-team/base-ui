import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const Cup = memo(({ color }: RootIconProps) => (
  <path
    d="M19.7778 4.22222H17.5556V3.11111C17.5556 2.5 17.0556 2 16.4444 2H7.55556C6.94444 2 6.44444 2.5 6.44444 3.11111V4.22222H4.22222C3 4.22222 2 5.22222 2 6.44444V7.55556C2 10.3889 4.13333 12.7 6.87778 13.0444C7.57778 14.7111 9.07778 15.9667 10.8889 16.3333V19.7778H7.55556C6.94444 19.7778 6.44444 20.2778 6.44444 20.8889C6.44444 21.5 6.94444 22 7.55556 22H16.4444C17.0556 22 17.5556 21.5 17.5556 20.8889C17.5556 20.2778 17.0556 19.7778 16.4444 19.7778H13.1111V16.3333C14.9222 15.9667 16.4222 14.7111 17.1222 13.0444C19.8667 12.7 22 10.3889 22 7.55556V6.44444C22 5.22222 21 4.22222 19.7778 4.22222ZM4.22222 7.55556V6.44444H6.44444V10.6889C5.15556 10.2222 4.22222 9 4.22222 7.55556ZM19.7778 7.55556C19.7778 9 18.8444 10.2222 17.5556 10.6889V6.44444H19.7778V7.55556Z"
    fill={color}
  />
));

export default Cup;
