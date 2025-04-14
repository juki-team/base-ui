import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import City from './City';

export const CityIcon = (props: BasicIconProps) => renderBasicIcon(props, City);
