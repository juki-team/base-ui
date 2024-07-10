import { getProblemJudgeKey, ProblemDataSystemResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { jukiSettings } from '../../../config';
import { ProblemDataViewerType } from './types';

const isProblemDataSystemResponseDTO = (problem: ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO): problem is ProblemDataSystemResponseDTO => {
  return problem.hasOwnProperty('id');
};

export const toProblemDataViewer = (problem: ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO): ProblemDataViewerType => ({
  companyKey: problem.companyKey,
  key: problem.key,
  judge: problem.judge,
  state: isProblemDataSystemResponseDTO(problem) ? problem.state : undefined,
  id: isProblemDataSystemResponseDTO(problem) ? problem.id : undefined,
  isManager: isProblemDataSystemResponseDTO(problem) ? problem.isManager : undefined,
  problem: isProblemDataSystemResponseDTO(problem) ? problem : undefined,
  scoringMode: problem.settings.mode,
  type: problem.settings.type,
  viewProblemUrl: jukiSettings.ROUTES.judge().problems.view(getProblemJudgeKey(problem.judge, problem.key)),
  name: problem.name,
  user: problem.user,
  ownerNickname: problem.owner.nickname,
  ownerImageUrl: problem.owner.imageUrl,
  ownerCompanyKey: problem.owner.companyKey,
  tags: problem.tags,
});
