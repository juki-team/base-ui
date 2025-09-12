import { ProblemBasicSummaryListResponseDTO } from '@juki-team/commons';

export type JudgeDataType = {
  [key: string]: { problems: ProblemBasicSummaryListResponseDTO[], loading: boolean }
};

export interface ProblemSelectorProps {
  extend?: boolean,
  onSelect: (selectedUsers: ProblemBasicSummaryListResponseDTO) => void,
  companyKey?: string,
}
