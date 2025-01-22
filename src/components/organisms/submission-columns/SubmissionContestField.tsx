import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ContestTab } from '../../../types';
import { OpenInNewIcon } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionContestField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { contest }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = contest ? getJudgeOrigin(contest.company.key) : '';
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiAppRoutes.JUDGE(origin).contests.view({
            key: contest.key,
            tab: ContestTab.PROBLEM,
            subTab: contest.problemIndex,
          })}
          target={origin ? '_blank' : undefined}
          className="link jk-row"
        >
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{contest.name}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
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
