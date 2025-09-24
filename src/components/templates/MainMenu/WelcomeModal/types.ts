import { ButtonLoaderOnClickType } from '../../../../types';
import { BasicModalProps } from '../../../atoms/Modal/types';

export interface WelcomeModalProps extends BasicModalProps {
  nickname: string,
  onSeeMyProfile: ButtonLoaderOnClickType,
}
