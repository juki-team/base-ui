import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionContestField } from '../../submission/SubmissionContestField';

export function getSubmissionContestHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'contest',
    index: 'contestKeys',
    Field: SubmissionContestField,
    sort: true,
    cardPosition: 'top',
    minWidth: 280,
  };
}
