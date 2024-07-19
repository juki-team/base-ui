import { PROBLEM_VERDICT, SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { SubmissionInfo } from '../../templates/Submission/SubmissionInfo';
import { SubmissionListenerVerdict } from '../../templates/Submission/SubmissionListenerVerdict';
import { DataViewerHeadersType, Field, TextField } from '../DataViewer';

export const getSubmissionVerdictHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'verdict',
  index: 'verdict',
  Field: ({ record: { submitId, points, status, verdict, user: { canViewSourceCode }, processedCases }, isCard }) => (
    <Field>
      <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
        <TextField
          text={
            <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
              <SubmissionListenerVerdict
                verdict={verdict}
                points={points}
                status={status}
                submitId={submitId}
                processedCases={processedCases}
              />
            </SubmissionInfo>
          }
          label="verdict"
        />
      </div>
    </Field>
  ),
  sort: true,
  filter: {
    type: 'select',
    options: Object.values(PROBLEM_VERDICT)
      .map(({ value, label }) => (
        { label: <T className="tt-se">{label}</T>, value }
      )),
  },
  cardPosition: 'bottom',
  minWidth: 220,
});
