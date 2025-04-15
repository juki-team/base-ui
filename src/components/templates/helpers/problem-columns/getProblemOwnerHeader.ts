import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemCrawlerField } from '../../problem/ProblemCrawlerField';
import { ProblemOwnerField } from '../../problem/ProblemOwnerField';

export const getProblemOwnerHeader = (isForeignProblem: boolean): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: isForeignProblem ? 'crawler' : 'owner',
  index: 'owner',
  Field: isForeignProblem ? ProblemCrawlerField : ProblemOwnerField,
  sort: true,
  cardPosition: 'bottom',
  minWidth: 200,
});
