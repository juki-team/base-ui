import { BasicModalProps } from '../../atoms/types';

export interface UserPreviewModalProps extends BasicModalProps {
  nickname: string,
  companyKey?: string,
  userHref: string,
}
