import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Home from './Home';

export const HomeIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Home);
};
