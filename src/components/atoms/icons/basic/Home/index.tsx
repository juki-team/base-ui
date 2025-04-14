import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Home from './Home';

export const HomeIcon_ = (props: BasicIconProps) => {
  return renderBasicIcon(props, Home);
};
