import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { SubmissionMemory } from '../../templates/Submission/SubmissionMemory';
import { DataViewerHeadersType, TextField } from '../DataViewer';

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
});
