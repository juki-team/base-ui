import type { UserSummaryListResponseDTO } from '@juki-team/commons/dto';
export interface UsersSelectorProps {
  selectedUsers: string[];
  onChangeSelectedUsers: (selectedUsers: UserSummaryListResponseDTO[]) => void;
  maxUsersSelection?: number;
  companyKey: string;
}
