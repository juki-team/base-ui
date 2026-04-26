import type { UserProfileResponseDTO } from '@juki-team/commons/dto';
export interface UserProfileSettingsProps {
  user: UserProfileResponseDTO;
  onClickUpdatePassword: () => void;
}
