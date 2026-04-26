import type { SubmissionSummaryListResponseDTO } from '@juki-team/commons/dto';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { SubmissionTimeField } from '../../submission/SubmissionTimeField';

export function getSubmissionTimeHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'time',
    index: 'timeUsed',
    Field: SubmissionTimeField,
    sort: true,
    // filter: { type: 'text-auto' }, // TODO filter by integer
    cardPosition: 'center',
    minWidth: 120,
  };
}
