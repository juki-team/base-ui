import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { DataViewerHeadersType, DateField } from '../DataViewer';

export const getSubmissionDateHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'date',
  index: 'timestamp',
  Field: ({ record: { timestamp }, isCard }) => (
    <DateField className="jk-row" date={new Date(timestamp)} label="date" twoLines={!isCard} />
  ),
  sort: true,
  filter: {
    type: 'date-range',
    pickerType: 'year-month-day-hours-minutes',
  },
  cardPosition: 'center',
  minWidth: 180,
});
