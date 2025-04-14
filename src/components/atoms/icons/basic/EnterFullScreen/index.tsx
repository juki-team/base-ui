import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import EnterFullScreen from './EnterFullScreen';

export const EnterFullScreenIcon = (props: BasicIconProps) => renderBasicIcon(props, EnterFullScreen);
