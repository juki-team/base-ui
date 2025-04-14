import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Cup from './Cup';

export const CupIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Cup);
};
