import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" fill={color} />
);

export const ExclamationIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon, 'exclamation');
};
