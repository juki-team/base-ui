import type { UserBasicResponseDTO, UserProfileResponseDTO } from '@juki-team/commons/dto';
export interface UserProfileProps {
  user: UserProfileResponseDTO;
}

export interface UserProfileDataContentProps {
  user: UserBasicResponseDTO;
  className?: string;
}
