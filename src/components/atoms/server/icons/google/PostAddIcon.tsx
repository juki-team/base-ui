import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h9v2H5v14h14v-9h2v9q0 .825-.587 1.413Q19.825 21 19 21Zm3-4v-2h8v2Zm0-3v-2h8v2Zm0-3V9h8v2Zm9-2V7h-2V5h2V3h2v2h2v2h-2v2Z"
    fill={color}
  />
);

export const PostAddIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'post-add');
};
