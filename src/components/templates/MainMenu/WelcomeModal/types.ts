import { BasicModalProps } from '../../../atoms/Modal/types';
import { ButtonLoaderOnClickType } from '../../../types';

export interface WelcomeModalProps extends BasicModalProps {
  nickname: string,
  onSeeMyProfile: ButtonLoaderOnClickType,
}
