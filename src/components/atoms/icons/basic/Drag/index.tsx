import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Drag from './Drag';

export const DragIcon = (props: BasicIconProps) => renderBasicIcon(props, Drag);
