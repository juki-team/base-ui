import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import CloudDownload from './CloudDownload';

export const CloudDownloadIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, CloudDownload);
};
