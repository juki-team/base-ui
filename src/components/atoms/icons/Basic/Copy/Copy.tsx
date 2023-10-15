import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const Copy = memo(({ color }: RootIconProps) => (
  <path
    d="M15.3158 2H4.89474C3.85263 2 3 2.81818 3 3.81818V15.6364C3 16.1364 3.42632 16.5455 3.94737 16.5455C4.46842 16.5455 4.89474 16.1364 4.89474 15.6364V4.72727C4.89474 4.22727 5.32105 3.81818 5.84211 3.81818H15.3158C15.8368 3.81818 16.2632 3.40909 16.2632 2.90909C16.2632 2.40909 15.8368 2 15.3158 2ZM19.1053 5.63636H8.68421C7.64211 5.63636 6.78947 6.45455 6.78947 7.45455V20.1818C6.78947 21.1818 7.64211 22 8.68421 22H19.1053C20.1474 22 21 21.1818 21 20.1818V7.45455C21 6.45455 20.1474 5.63636 19.1053 5.63636ZM18.1579 20.1818H9.63158C9.11053 20.1818 8.68421 19.7727 8.68421 19.2727V8.36364C8.68421 7.86364 9.11053 7.45455 9.63158 7.45455H18.1579C18.6789 7.45455 19.1053 7.86364 19.1053 8.36364V19.2727C19.1053 19.7727 18.6789 20.1818 18.1579 20.1818Z"
    fill={color}
  />
));

export default Copy;