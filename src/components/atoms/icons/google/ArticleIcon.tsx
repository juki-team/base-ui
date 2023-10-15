import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M7 17h7v-2H7Zm0-4h10v-2H7Zm0-4h10V7H7ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"
    fill={color}
  />
);

export const ArticleIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'article');
};
