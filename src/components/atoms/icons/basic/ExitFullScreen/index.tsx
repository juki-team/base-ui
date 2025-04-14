import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import ExitFullScreen from './ExitFullScreen';

export const ExitFullScreenIcon = (props: BasicIconProps) => renderBasicIcon(props, ExitFullScreen);
