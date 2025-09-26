import { type ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemCrawlerField } from '../../problem/ProblemCrawlerField';
import { ProblemOwnerField } from '../../problem/ProblemOwnerField';

export function getProblemOwnerHeader(isForeignProblem: boolean): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: isForeignProblem ? 'crawler' : 'owner',
    index: 'owner',
    Field: isForeignProblem ? ProblemCrawlerField : ProblemOwnerField,
    sort: true,
    cardPosition: 'bottom',
    minWidth: 200,
  };
}
