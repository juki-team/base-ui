import { ContestTab } from '../../../enums';
import { jukiAppRoutes } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { getJudgeOrigin } from '../../helpers';
import { FieldText } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import type { SubmissionContestProblemFieldProps } from './types';

export function SubmissionContestProblemField(props: SubmissionContestProblemFieldProps) {
  
  const {
    record: { problem: { key: problemKey, name: problemName, company: { key: problemCompanyKey } }, contest },
    isCard,
  } = props;
  
  const { Link } = useUIStore(store => store.components);
  const userCompanyKey = useUserStore(state => state.company.key);
  
  const origin = getJudgeOrigin(contest ? contest.company.key : problemCompanyKey, userCompanyKey);
  
  return (
    <FieldText
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
}
