import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import File from './File';

export const FileIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, File);
};
