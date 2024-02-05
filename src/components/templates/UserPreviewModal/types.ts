import { BasicModalProps } from '../../atoms';

export interface UserPreviewModalProps extends BasicModalProps {
  nickname: string,
  companyKey: string,
  userHref: string,
}
