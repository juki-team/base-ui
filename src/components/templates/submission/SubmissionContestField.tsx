import { ContestTab } from '../../../enums';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { TextField } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import type { SubmissionContestFieldProps } from './types';

export const SubmissionContestField = (props: SubmissionContestFieldProps) => {
  
  const { record: { contest }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  const userCompanyKey = useUserStore(state => state.company.key);
  
  const origin = contest ? getJudgeOrigin(contest.company.key, userCompanyKey) : '';
  
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
