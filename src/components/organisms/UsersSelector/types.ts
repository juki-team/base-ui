import { UserSummaryListResponseDTO } from '@juki-team/commons';

export interface UsersSelectorProps {
  selectedUsers: string[],
  onChangeSelectedUsers: (selectedUsers: UserSummaryListResponseDTO[]) => void,
  maxUsersSelection?: number,
  companyKey: string,
}
