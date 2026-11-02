import { ContentResponse, UserProfileResponseDto } from '@juki-team/commons';
import { BasicModalProps } from '../../atoms/types';
import { UpdateUserProfileDataPayloadDto } from '../../types';

export interface EditProfileModalProps extends BasicModalProps {
  user: UserProfileResponseDto,
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDto,
    response: ContentResponse<string>,
  }) => Promise<void> | (() => void),
}

export interface ImageProfileModalProps extends BasicModalProps {
  nickname: string,
  organizationKey: string,
}
