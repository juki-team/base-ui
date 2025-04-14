import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const Person = memo(({ color }: RootIconProps) => (
  <path
    d="M12 12C14.7625 12 17 9.7625 17 7C17 4.2375 14.7625 2 12 2C9.2375 2 7 4.2375 7 7C7 9.7625 9.2375 12 12 12ZM12 14.5C8.6625 14.5 2 16.175 2 19.5V20.75C2 21.4375 2.5625 22 3.25 22H20.75C21.4375 22 22 21.4375 22 20.75V19.5C22 16.175 15.3375 14.5 12 14.5Z"
    fill={color}
  />
));

export default Person;
