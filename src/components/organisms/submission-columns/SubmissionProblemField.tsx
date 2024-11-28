import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUI } from '../../../hooks';
import { jukiAppRotes } from '../../../settings';
import { ContestTab } from '../../../types';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionProblemField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = ({ record: { problem: { key: problemKey, name: problemName }, contest }, isCard }) => {
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiAppRotes.JUDGE().contests.view({
            key: contest.key,
            tab: ContestTab.PROBLEM,
            subTab: contest.problemIndex,
          })}
          // target={props?.blankTarget ? '_blank' : ''} // TODO: check
        >
          <div className="jk-col link">
            {contest.name}
            <div className="jk-row">
              ({contest.problemIndex || '-'})&nbsp;{problemName}
              {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={jukiAppRotes.JUDGE().problems.view({ key: problemKey })}
          // target={props?.blankTarget ? '_blank' : ''}
        >
          <div className="jk-row link">
            {/*{problemKey}*/}
            {problemName}
            {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
          </div>
        </Link>
      )}
      label="problem"
    />
  );
};

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  onlyProblem?: boolean,
}

export const getSubmissionProblemHeader = (props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'problem',
  index: 'problemKeys',
  Field: SubmissionProblemField,
  sort: true,
  filter: props?.header?.filter,
  cardPosition: 'top',
  minWidth: 280,
});
