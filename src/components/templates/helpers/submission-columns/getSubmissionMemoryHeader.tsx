import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { TextField } from '../../../organisms/DataViewer/TextField';
import type { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionMemory } from '../../submission/commons/SubmissionMemory';

export const getSubmissionMemoryHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'memory',
  index: 'memoryUsed',
  Field: ({ record: { memoryUsed, verdict }, isCard }) => (
    isCard ? null :
      <TextField text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />} label="memory used" />
  ),
  sort: true,
  // filter: { type: 'text-auto' }, // TODO filter by integer
  cardPosition: 'center',
  minWidth: 120,
});
