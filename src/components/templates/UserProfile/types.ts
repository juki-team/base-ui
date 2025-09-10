import { UserBasicResponseDTO, UserProfileResponseDTO } from '@juki-team/commons';

export interface UserProfileProps {
  user: UserProfileResponseDTO,
}

export interface UserProfileDataContentProps {
  user: UserBasicResponseDTO,
  className?: string
}
