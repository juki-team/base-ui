import type { SubmissionSummaryListResponseDTO } from '@juki-team/commons/dto';
import { SubmissionRejudgeButton } from '../../../molecules/SubmissionRejudgeButton/SubmissionRejudgeButton';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionRetrieveButton } from '../../submission/SubmissionRetrieveButton';

export function getSubmissionRejudgeHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'rejudge',
    index: 'rejudge',
    Field: ({ record: { submitId, problem } }) => (
      <div className="jk-table-field">
        <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
          {problem.judge.isSubmitSupported ? (
            <SubmissionRejudgeButton submissionId={submitId} />
          ) : (
            <SubmissionRetrieveButton submissionId={submitId} />
          )}
        </div>
      </div>
    ),
    cardPosition: 'bottom',
    minWidth: 180,
  };
}
