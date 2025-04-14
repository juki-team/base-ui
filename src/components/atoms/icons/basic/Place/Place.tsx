import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const Place = memo(({ color }: RootIconProps) => (
  <path
    d="M12 12.1639C13.1 12.1639 14 11.2491 14 10.1311C14 9.01309 13.1 8.09834 12 8.09834C10.9 8.09834 10 9.01309 10 10.1311C10 11.2491 10.9 12.1639 12 12.1639ZM12 2C16.2 2 20 5.27277 20 10.3344C20 13.5665 17.55 17.3678 12.66 21.7484C12.28 22.0839 11.71 22.0839 11.33 21.7484C6.45 17.3678 4 13.5665 4 10.3344C4 5.27277 7.8 2 12 2Z"
    fill={color}
  />
));

export default Place;
