import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M627-520h133v-160H627v160Zm-214 0h133v-160H413v160Zm-213 0h133v-160H200v160Zm0 240h133v-160H200v160Zm213 0h133v-160H413v160Zm214 0h133v-160H627v160Zm-507 0v-400q0-33 23.5-56.5T200-760h560q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H200q-33 0-56.5-23.5T120-280Z"
    fill={color}
  />
);

export const ViewModuleIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 -960 960 960' }, Icon, 'view-module');
};
