import { UserProfileResponseDto } from '@juki-team/commons';

export interface UserProfileSettingsProps {
  user: UserProfileResponseDto,
  onClickUpdatePassword: () => void,
}
