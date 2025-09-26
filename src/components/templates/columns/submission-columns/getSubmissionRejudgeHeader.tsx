import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { Field } from '../../../organisms';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionRejudgeButton } from '../../../organisms/_layz_/SubmissionModal/commons/SubmissionRejudgeButton';
import { SubmissionRetrieveButton } from '../../submission/SubmissionRetrieveButton';

export function getSubmissionRejudgeHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
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
  };
}
