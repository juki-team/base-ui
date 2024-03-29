import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8H11.175l-2-2H4v12l2.4-8h17.1l-2.575 8.575q-.2.65-.737 1.038Q19.65 20 19 20Zm2.1-2H19l1.8-6H7.9Zm0 0 1.8-6-1.8 6ZM4 8V6v2Z"
    fill={color}
  />
);

export const FolderOpenIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'folder-open');
};
