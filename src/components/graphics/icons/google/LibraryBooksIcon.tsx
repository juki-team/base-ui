import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M400 656h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240 736V256q0-33 23.5-56.5T320 176h480q33 0 56.5 23.5T880 256v480q0 33-23.5 56.5T800 816H320Zm0-80h480V256H320v480ZM160 976q-33 0-56.5-23.5T80 896V336h80v560h560v80H160Zm160-720v480-480Z"
    fill={color}
  />
);

export const LibraryBooksIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 96 960 960' }, Icon, 'library-books');
};
