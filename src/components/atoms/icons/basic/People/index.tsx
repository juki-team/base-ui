import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import People from './People';

export const PeopleIcon = (props: BasicIconProps) => renderBasicIcon(props, People);
