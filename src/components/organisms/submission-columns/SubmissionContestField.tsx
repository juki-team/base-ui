import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { useJukiUI } from '../../../hooks';
import { ContestTab } from '../../../types';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionContestField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = ({ record: { problem: { key: problemKey, name: problemName }, contest }, isCard }) => {
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiSettings.ROUTES.contests().view({
            key: contest.key,
            tab: ContestTab.PROBLEM,
            subTab: contest.problemIndex,
          })}
          // target={props?.blankTarget ? '_blank' : ''}
        >
          <div className="jk-row link">
            {contest.name} ({contest.problemIndex})
            {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
          </div>
        </Link>
      ) : <div className="jk-row">-</div>}
      label="contest"
    />
  );
};

export const getSubmissionContestHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'contest',
  index: 'contestKeys',
  Field: SubmissionContestField,
  sort: true,
  cardPosition: 'top',
  minWidth: 280,
});
