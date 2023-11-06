import { UserProfileResponseDTO } from '@juki-team/commons';

export interface UserProfileSettingsProps {
  user: UserProfileResponseDTO,
  onClickUpdatePassword: () => void,
}
