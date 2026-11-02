import { ProblemBasicSummaryListResponseDto } from '@juki-team/commons';

export type JudgeDataType = {
  [key: string]: { problems: ProblemBasicSummaryListResponseDto[], loading: boolean }
};

export interface ProblemSelectorProps {
  extend?: boolean,
  onSelect: (selectedUsers: ProblemBasicSummaryListResponseDto) => void,
  organizationKey?: string,
}
