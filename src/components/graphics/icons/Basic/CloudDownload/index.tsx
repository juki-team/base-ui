import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import CloudUpload from './CloudUpload';

export const CloudUploadIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, CloudUpload);
};
