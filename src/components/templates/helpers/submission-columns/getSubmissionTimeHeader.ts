import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/types';
import { SubmissionTimeField } from '../../submission/SubmissionTimeField';

export const getSubmissionTimeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'time',
  index: 'timeUsed',
  Field: SubmissionTimeField,
  sort: true,
  // filter: { type: 'text-auto' }, // TODO filter by integer
  cardPosition: 'center',
  minWidth: 120,
});
