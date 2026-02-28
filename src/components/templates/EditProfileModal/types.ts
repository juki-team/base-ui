import { ContentResponse, UserProfileResponseDTO } from '@juki-team/commons';
import { BasicModalProps } from '../../atoms/types';
import { UpdateUserProfileDataPayloadDTO } from '../../types';

export interface EditProfileModalProps extends BasicModalProps {
  user: UserProfileResponseDTO,
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDTO,
    response: ContentResponse<string>,
  }) => Promise<void> | (() => void),
}

export interface ImageProfileModalProps extends BasicModalProps {
  nickname: string,
  companyKey: string,
}
