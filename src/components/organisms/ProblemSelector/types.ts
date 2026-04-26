import type { ProblemBasicSummaryListResponseDTO } from '@juki-team/commons/dto';
export type JudgeDataType = {
  [key: string]: { problems: ProblemBasicSummaryListResponseDTO[]; loading: boolean };
};

export interface ProblemSelectorProps {
  extend?: boolean;
  onSelect: (selectedUsers: ProblemBasicSummaryListResponseDTO) => void;
  companyKey?: string;
}
