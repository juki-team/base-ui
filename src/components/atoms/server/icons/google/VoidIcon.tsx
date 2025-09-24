import { BasicIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = () => (
  <></>
);

export const VoidIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 0 24 24' }, Icon, '_');
};
