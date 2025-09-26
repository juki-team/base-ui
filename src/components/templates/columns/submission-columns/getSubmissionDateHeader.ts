import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionDateField } from '../../submission/SubmissionDateField';

export function getSubmissionDateHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'date',
    index: 'timestamp',
    Field: SubmissionDateField,
    sort: true,
    filter: {
      type: 'date-range',
      pickerType: 'year-month-day-hours-minutes',
    },
    cardPosition: 'center',
    minWidth: 180,
  };
}
