import { ProblemDataSystemResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { ProblemDataViewer } from './types';

const isProblemDataSystemResponseDTO = (problem: ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO): problem is ProblemDataSystemResponseDTO => {
  return problem.hasOwnProperty('id');
};

export const toProblemDataViewer = (problem: ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO): ProblemDataViewer => ({
  key: problem.key,
  id: isProblemDataSystemResponseDTO(problem) ? problem.id : undefined,
  scoringMode: problem.settings.mode,
  type: problem.settings.type,
  viewProblemUrl: '',
  name: problem.name,
  user: problem.user,
  ownerNickname: problem.owner.nickname,
  ownerImageUrl: problem.owner.imageUrl,
  ownerCompanyKey: problem.owner.companyKey,
  tags: problem.tags,
});
