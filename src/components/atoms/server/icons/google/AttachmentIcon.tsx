import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M7.5 17.5q-2.3 0-3.9-1.6T2 12q0-2.3 1.6-3.9t3.9-1.6H18q1.65 0 2.825 1.175Q22 8.85 22 10.5q0 1.65-1.175 2.825Q19.65 14.5 18 14.5H8.5q-1.05 0-1.775-.725Q6 13.05 6 12q0-1.05.725-1.775Q7.45 9.5 8.5 9.5H18V11H8.5q-.425 0-.712.287-.288.288-.288.713t.288.712Q8.075 13 8.5 13H18q1.05 0 1.775-.725.725-.725.725-1.775 0-1.05-.725-1.775Q19.05 8 18 8H7.5Q5.85 8 4.675 9.175 3.5 10.35 3.5 12q0 1.65 1.175 2.825Q5.85 16 7.5 16H18v1.5Z"
    fill={color}
  />
);

export const AttachmentIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'attachment');
};
