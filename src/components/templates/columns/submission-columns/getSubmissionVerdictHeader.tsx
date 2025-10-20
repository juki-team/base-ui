import { PROBLEM_VERDICT, type  SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { T } from '../../../atoms';
import { Field, FieldText } from '../../../organisms';
import { SubmissionListenerVerdict } from '../../../organisms/_layz_/SubmitView/commons/SubmissionListenerVerdict';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { SubmissionInfo } from '../../submission/commons/SubmissionInfo';

export function getSubmissionVerdictHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'verdict',
    index: 'verdicts',
    Field: ({
              record: {
                submitId,
                points,
                status,
                verdict,
                user: { canViewSourceCode },
                processedCases,
                contest,
                problem,
              },
            }) => (
      <Field>
        <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
          <FieldText
            text={
              <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
                <SubmissionListenerVerdict
                  verdict={verdict}
                  points={points}
                  status={status}
                  submitId={submitId}
                  contest={contest}
                  problem={problem}
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
  } as DataViewerHeadersType<SubmissionSummaryListResponseDTO>;
}
