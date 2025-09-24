import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { Field } from '../../../organisms/DataViewer/Field';
import type { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionRejudgeButton } from '../../submission/SubmissionRejudgeButton';
import { SubmissionRetrieveButton } from '../../submission/SubmissionRetrieveButton';

export const getSubmissionRejudgeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'rejudge',
  index: 'rejudge',
  Field: ({ record: { submitId, problem } }) => (
    <Field>
      <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
        {problem.judge.isSubmitSupported
          ? <SubmissionRejudgeButton submissionId={submitId} />
          : <SubmissionRetrieveButton submissionId={submitId} />}
      </div>
    </Field>
  ),
  cardPosition: 'bottom',
  minWidth: 180,
});
