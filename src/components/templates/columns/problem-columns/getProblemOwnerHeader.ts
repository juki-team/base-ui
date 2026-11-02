import { type ProblemSummaryListResponseDto } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemCrawlerField } from '../../problem/ProblemCrawlerField';
import { ProblemOwnerField } from '../../problem/ProblemOwnerField';

export function getProblemOwnerHeader(isForeignProblem: boolean): DataViewerHeadersType<ProblemSummaryListResponseDto> {
  return {
    head: isForeignProblem ? 'crawler' : 'owner',
    index: 'owner',
    Field: isForeignProblem ? ProblemCrawlerField : ProblemOwnerField,
    sort: true,
    cardPosition: 'bottom',
    minWidth: 200,
  };
}
