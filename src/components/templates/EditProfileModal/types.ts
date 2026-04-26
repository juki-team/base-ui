import type { UserProfileResponseDTO } from '@juki-team/commons/dto';
import type { ContentResponse } from '@juki-team/commons/types';
import type { BasicModalProps } from '../../atoms/types';
import type { UpdateUserProfileDataPayloadDTO } from '../../types';

export interface EditProfileModalProps extends BasicModalProps {
  user: UserProfileResponseDTO;
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDTO;
    response: ContentResponse<string>;
  }) => Promise<void> | (() => void);
}

export interface ImageProfileModalProps extends BasicModalProps {
  nickname: string;
  companyKey: string;
}
