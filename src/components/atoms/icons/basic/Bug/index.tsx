import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Bug from './Bug';

export const BugIcon = (props: BasicIconProps) => renderBasicIcon(props, Bug);
