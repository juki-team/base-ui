import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Person from './Person';

export const PersonIcon = (props: BasicIconProps) => renderBasicIcon(props, Person);
