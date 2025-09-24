import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M720 816q25 0 42.5-17.5T780 756q0-25-17.5-42.5T720 696q-25 0-42.5 17.5T660 756q0 25 17.5 42.5T720 816Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621 883q17 25 43 39t56 14ZM360 416h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Zm130 560H240q-33 0-56.5-23.5T160 896V496q0-33 23.5-56.5T240 416h40v-80q0-83 58.5-141.5T480 136q83 0 141.5 58.5T680 336v80h40q33 0 56.5 23.5T800 496v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5t22 38.5Zm230 40q-83 0-141.5-58.5T520 816q0-83 58.5-141.5T720 616q83 0 141.5 58.5T920 816q0 83-58.5 141.5T720 1016ZM240 496v400-400Z"
    fill={color}
  />
);

export const LockPersonIcon = (props: BasicIconProps) => {
  return renderBasicIcon({ ...props, viewBox: '0 96 960 960' }, Icon, 'lock-person');
};
