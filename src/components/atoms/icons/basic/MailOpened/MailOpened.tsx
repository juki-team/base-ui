import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';

const MailOpened = memo(({ color }: RootIconProps) => (
  <path
    d="M21.99 9.15719C21.99 8.38662 21.62 7.71237 21.05 7.33779L13.01 2.29699C12.39 1.901 11.61 1.901 10.99 2.29699L2.95 7.33779C2.38 7.71237 2 8.38662 2 9.15719V19.8595C2 21.0368 2.9 22 4 22H20C21.1 22 22 21.0368 22 19.8595L21.99 9.15719ZM10.94 13.802L3.74 8.98595L10.99 4.43746C11.61 4.04147 12.39 4.04147 13.01 4.43746L20.26 8.98595L13.06 13.802C12.41 14.2301 11.59 14.2301 10.94 13.802Z"
    fill={color}
  />
));

export default MailOpened;
