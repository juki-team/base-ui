import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"
    fill={color}
  />
);

export const FormatItalicIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon, 'format-italic');
};
