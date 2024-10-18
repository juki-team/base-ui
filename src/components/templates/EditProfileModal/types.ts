import { ContentResponseType, UserProfileResponseDTO } from '@juki-team/commons';
import { UpdateUserProfileDataPayloadDTO } from '../../../types';
import { BasicModalProps } from '../../atoms';

export interface EditProfileModalPros extends BasicModalProps {
  user: UserProfileResponseDTO,
  onClose: () => void,
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDTO,
    response: ContentResponseType<string>,
  }) => Promise<void> | (() => void),
}
