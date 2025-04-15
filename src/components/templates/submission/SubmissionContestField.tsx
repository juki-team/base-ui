import React from 'react';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ContestTab } from '../../../types';
import { TextField } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import { SubmissionContestFieldProps } from './types';

export const SubmissionContestField = (props: SubmissionContestFieldProps) => {
  
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
