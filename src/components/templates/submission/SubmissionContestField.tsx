import { ContestTab } from '../../../enums';
import { jukiAppRoutes } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { getJudgeOrigin } from '../../helpers';
import { FieldText } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import type { SubmissionContestFieldProps } from './types';

export function SubmissionContestField(props: SubmissionContestFieldProps) {
  const {
    record: { contest },
    isCard,
  } = props;

  const { Link } = useUIStore((store) => store.components);
  const userOrganizationKey = useUserStore((state) => state.organization.key);

  const origin = contest ? getJudgeOrigin(contest.organization.key, userOrganizationKey) : '';

  return (
    <FieldText
      text={
        contest ? (
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
        ) : (
          <div className="jk-row">-</div>
        )
      }
      label="contest"
    />
  );
}
