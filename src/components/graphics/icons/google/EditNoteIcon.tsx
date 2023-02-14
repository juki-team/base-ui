import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M12 21v-2.125l5.3-5.3 2.125 2.125-5.3 5.3Zm-9-5v-2h7v2Zm17.125-1L18 12.875l.725-.725q.275-.275.7-.275.425 0 .7.275l.725.725q.275.275.275.7 0 .425-.275.7ZM3 12v-2h11v2Zm0-4V6h11v2Z"
    fill={color}
  />
);

export const EditNoteIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'edit-note');
};
