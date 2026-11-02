import { UserSummaryListResponseDto } from '@juki-team/commons';

export interface UsersSelectorProps {
  selectedUsers: string[],
  onChangeSelectedUsers: (selectedUsers: UserSummaryListResponseDto[]) => void,
  maxUsersSelection?: number,
  organizationKey: string,
}
