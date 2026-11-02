import { UserBasicResponseDto, UserProfileResponseDto } from '@juki-team/commons';

export interface UserProfileProps {
  user: UserProfileResponseDto,
}

export interface UserProfileDataContentProps {
  user: UserBasicResponseDto,
  className?: string
}
