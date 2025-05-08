import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { Field } from '../../../organisms/DataViewer/Field';
import { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionRejudgeButton } from '../../submission/SubmissionRejudgeButton';

export const getSubmissionRejudgeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'rejudge',
  index: 'rejudge',
  Field: ({ record: { submitId } }) => (
    <Field>
      <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
        <SubmissionRejudgeButton submissionId={submitId} />
      </div>
    </Field>
  ),
  cardPosition: 'bottom',
  minWidth: 180,
});
