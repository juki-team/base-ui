import { Judge, ProblemSummaryListResponseDTO } from '@juki-team/commons';

export type JudgeDataType = {
  [key in Judge]: { problems: ProblemSummaryListResponseDTO[], loading: true }
};

export interface ProblemSelectorProps {
  extend?: boolean,
  onSelect: (selectedUsers: ProblemSummaryListResponseDTO) => void
}
