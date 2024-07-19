import { PROGRAMMING_LANGUAGE, SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { SubmissionInfo } from '../../templates/Submission/SubmissionInfo';
import { SubmissionMemory } from '../../templates/Submission/SubmissionMemory';
import { SubmissionTime } from '../../templates/Submission/SubmissionTime';
import { DataViewerHeadersType, Field, TextField } from '../DataViewer';

export const getSubmissionTimeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'time',
  index: 'timeUsed',
  Field: ({ record: { timeUsed, submitId, user: { canViewSourceCode }, language, verdict, memoryUsed }, isCard }) => (
    isCard ? (
        <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
          <Field className="jk-row gap nowrap cr-g1">
            <TextField
              text={<div className="jk-col extend">{PROGRAMMING_LANGUAGE[language]?.label || language}</div>}
              label="language"
            />
            <TextField
              text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />}
              label="time used"
            />
            <TextField
              text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />}
              label="memory used"
            />
          </Field>
        </SubmissionInfo>
      ) :
      <TextField text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />} label="time used" />
  ),
  sort: true,
  // filter: { type: 'text-auto' }, // TODO filter by integer
  cardPosition: 'center',
});
