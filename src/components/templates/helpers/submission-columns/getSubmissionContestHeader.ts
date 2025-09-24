import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionContestField } from '../../submission/SubmissionContestField';

export const getSubmissionContestHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'contest',
  index: 'contestKeys',
  Field: SubmissionContestField,
  sort: true,
  cardPosition: 'top',
  minWidth: 280,
});
