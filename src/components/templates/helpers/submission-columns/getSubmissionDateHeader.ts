import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionDateField } from '../../submission/SubmissionDateField';

export const getSubmissionDateHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
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
});
