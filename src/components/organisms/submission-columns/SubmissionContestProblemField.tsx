import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ContestTab } from '../../../types';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionContestProblemField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = ({ record: { problem: { key: problemKey, name: problemName }, contest }, isCard }) => {
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiAppRoutes.JUDGE().contests.view({
            key: contest.key,
            tab: ContestTab.PROBLEM,
            subTab: contest.problemIndex,
          })}
          // target={props?.blankTarget ? '_blank' : ''} // TODO: check
        >
          <div className="jk-col link">
            <div className="jk-row">
              {contest.name}&nbsp;({contest.problemIndex || '-'})
            </div>
            <div className="jk-row">
              {problemName}
              {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={jukiAppRoutes.JUDGE().problems.view({ key: problemKey })}
          // target={props?.blankTarget ? '_blank' : ''}
        >
          <div className="jk-row link">
            {problemName}
            {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
          </div>
        </Link>
      )}
      label="problem / contest"
    />
  );
};

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  onlyProblem?: boolean,
  // blankTarget?: boolean,
}

export const getSubmissionContestProblemHeader = (props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'problem',
  index: 'problemKeys',
  Field: SubmissionContestProblemField,
  sort: true,
  filter: props?.header?.filter,
  cardPosition: 'top',
  minWidth: 280,
});
