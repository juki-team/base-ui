import {
  EntityState,
  Judge,
  ProblemDataResponseDTO,
  ProblemScoringMode,
  ProblemType,
  ProblemUserType,
} from '@juki-team/commons';

export interface ProblemDataViewerType {
  companyKey: string,
  id: string | undefined,
  key: string,
  judge: Judge,
  isManager: boolean | undefined,
  scoringMode: ProblemScoringMode,
  type: ProblemType,
  viewProblemUrl: string,
  name: string,
  user: ProblemUserType,
  ownerNickname: string,
  ownerImageUrl: string,
  ownerCompanyKey: string,
  tags: string[],
  state: EntityState | undefined,
  problem: ProblemDataResponseDTO | undefined,
}
