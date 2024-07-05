import { ProblemScoringMode, ProblemType, ProblemUserType } from '@juki-team/commons';

export interface ProblemDataViewer {
  key: string,
  id: string | undefined,
  scoringMode: ProblemScoringMode,
  type: ProblemType,
  viewProblemUrl: string,
  name: string,
  user: ProblemUserType,
  ownerNickname: string,
  ownerImageUrl: string,
  ownerCompanyKey: string,
  tags: string[],
}
