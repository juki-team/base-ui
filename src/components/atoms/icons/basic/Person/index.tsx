import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Person from './Person';

export const PersonIcon_ = (props: BasicIconProps) => renderBasicIcon(props, Person);
