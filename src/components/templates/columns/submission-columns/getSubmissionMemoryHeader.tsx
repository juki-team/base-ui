import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { FieldText } from '../../../organisms';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionMemory } from '../../../organisms/_layz_/SubmitView/commons/SubmissionMemory';

export function getSubmissionMemoryHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'memory',
    index: 'memoryUsed',
    Field: ({ record: { memoryUsed, verdict }, isCard }) => (
      isCard ? null :
        <FieldText text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />} label="memory used" />
    ),
    sort: true,
    // filter: { type: 'text-auto' }, // TODO filter by integer
    cardPosition: 'center',
    minWidth: 120,
  };
}
