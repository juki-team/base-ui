import { UserSummaryResponseDTO } from '@juki-team/commons';

export interface UsersSelectorProps {
  selectedUsers: string[],
  onChangeSelectedUsers: (selectedUsers: UserSummaryResponseDTO[]) => void,
  maxUsersSelection?: number,
  companyKey: string,
}
