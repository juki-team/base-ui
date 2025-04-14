import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Place from './Place';

export const PlaceIcon = (props: BasicIconProps) => renderBasicIcon(props, Place);
