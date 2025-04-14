import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Person from './Phone';

export const PhoneIcon = (props: BasicIconProps) => renderBasicIcon(props, Person);
