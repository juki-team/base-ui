import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import CopyFile from './CopyFile';

export const CopyFileIcon = (props: BasicIconProps) => renderBasicIcon(props, CopyFile);
