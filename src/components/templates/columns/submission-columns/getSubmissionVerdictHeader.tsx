import { PROBLEM_VERDICT, type  SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { T } from '../../../atoms';
import { AcUnitIcon, LockIcon } from '../../../atoms/server';
import { FieldText } from '../../../organisms';
import { SubmissionListenerVerdict } from '../../../organisms/_layz_/SubmitView/commons/SubmissionListenerVerdict';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { SubmissionInfo } from '../../submission/commons/SubmissionInfo';

export function getSubmissionVerdictHeader(): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'verdict',
    index: 'verdicts',
    Field: ({ record: submit }) => (
      <FieldText
        text={
          <>
            <SubmissionInfo submitId={submit.submitId} canViewSourceCode={submit.user.canViewSourceCode}>
              <SubmissionListenerVerdict submit={submit} />
            </SubmissionInfo>
            {submit.contest && (
              <div className="jk-row gap">
                {submit.contest.isFrozen && (
                  <div
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="this submission is within the Frozen period, it is not shown on the scoreboard"
                    className="jk-row"
                  >
                    <AcUnitIcon size="tiny" className="cr-io" />
                  </div>
                )}
                {submit.contest.isQuiet && (
                  <div
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="this submission is within the silent period, it is not shown on the scoreboard and the verdict is not visible to participants"
                    className="jk-row"
                  >
                    <LockIcon size="tiny" className="cr-el" />
                  </div>
                )}
              </div>
            )}
          </>
        }
        label="verdict"
        className="jk-col"
      />
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
