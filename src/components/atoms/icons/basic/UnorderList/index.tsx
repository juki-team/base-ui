import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import UnorderedList from './UnorderedList';

export const UnorderedListIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, UnorderedList);
};
