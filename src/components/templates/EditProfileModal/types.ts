import { ContentResponseType, UserProfileResponseDTO } from '@juki-team/commons';
import { BasicModalProps } from '../../atoms/types';
import { UpdateUserProfileDataPayloadDTO } from '../../types/commons';

export interface EditProfileModalProps extends BasicModalProps {
  user: UserProfileResponseDTO,
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDTO,
    response: ContentResponseType<string>,
  }) => Promise<void> | (() => void),
}

export interface ImageProfileModalProps extends BasicModalProps {
  nickname: string,
}
