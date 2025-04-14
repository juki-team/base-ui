import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Gavel from './Gavel';

export const GavelIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Gavel);
};
