import { ProblemSummaryListResponseDTO } from '@juki-team/commons';

export type JudgeDataType = {
  [key: string]: { problems: ProblemSummaryListResponseDTO[], loading: true }
};

export interface ProblemSelectorProps {
  extend?: boolean,
  onSelect: (selectedUsers: ProblemSummaryListResponseDTO) => void,
  companyKey?: string,
}
