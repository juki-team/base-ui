import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const Build = memo(({ color }: RootIconProps) => (
  <path
    d="M12.4457 3.78065C10.5523 1.89322 7.71683 1.50822 5.43718 2.61626L8.85666 6.02491C9.22404 6.39113 9.22404 6.98271 8.85666 7.34893L7.35887 8.84197C6.99149 9.21758 6.39802 9.21758 6.03064 8.84197L2.61116 5.43333C1.50901 7.71515 1.89523 10.5228 3.78867 12.4103C5.5408 14.1568 8.10305 14.6169 10.2791 13.8L17.7775 21.2746C18.7477 22.2418 20.3115 22.2418 21.2723 21.2746C22.2426 20.3074 22.2426 18.7486 21.2723 17.7908L13.8116 10.3444C14.6783 8.1471 14.2261 5.5554 12.4457 3.78065Z"
    fill={color}
  />
));

export default Build;
