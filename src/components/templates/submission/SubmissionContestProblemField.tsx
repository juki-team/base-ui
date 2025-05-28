import React from 'react';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI, useUserStore } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ContestTab } from '../../../types';
import { TextField } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import { SubmissionContestProblemFieldProps } from './types';

export const SubmissionContestProblemField = (props: SubmissionContestProblemFieldProps) => {
  
  const {
    record: { problem: { key: problemKey, name: problemName, company: { key: problemCompanyKey } }, contest },
    isCard,
  } = props;
  
  const { components: { Link } } = useJukiUI();
  const userCompanyKey = useUserStore(state => state.company.key);
  
  const origin = getJudgeOrigin(contest ? contest.company.key : problemCompanyKey, userCompanyKey);
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiAppRoutes.JUDGE(origin).contests.view({
            key: contest.key,
            tab: ContestTab.PROBLEMS,
            subTab: contest.problemIndex,
          })}
          target={origin ? '_blank' : undefined}
          className="link"
        >
          <div className="jk-col">
            <div className="jk-row">
              {contest.name}&nbsp;({contest.problemIndex || '-'})
            </div>
            <div className="jk-row">
              {problemName}&nbsp;{!!origin && <OpenInNewIcon size="small" />}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={jukiAppRoutes.JUDGE(origin).problems.view({ key: problemKey })}
          target={origin ? '_blank' : undefined}
          className="link jk-row"
        >
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{problemName}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
        </Link>
      )}
      label="problem / contest"
    />
  );
};
