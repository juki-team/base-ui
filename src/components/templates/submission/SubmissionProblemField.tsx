import { jukiAppRoutes } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { getJudgeOrigin } from '../../helpers/problem';
import { FieldText } from '../../organisms/FieldText/FieldText';
import { OpenInNewIcon } from '../../atoms/server/icons/google/OpenInNewIcon';
import type { SubmissionProblemFieldProps } from './types';

export function SubmissionProblemField(props: SubmissionProblemFieldProps) {
  const {
    record: {
      problem: {
        key: problemKey,
        name: problemName,
        organization: { key: problemOrganizationKey },
      },
    },
    isCard,
  } = props;

  const { Link } = useUIStore((store) => store.components);
  const userOrganizationKey = useUserStore((state) => state.organization.key);

  const origin = getJudgeOrigin(problemOrganizationKey, userOrganizationKey);

  return (
    <FieldText
      text={
        <Link
          href={jukiAppRoutes.JUDGE(origin).problems.view({ key: problemKey })}
          target={origin ? '_blank' : undefined}
          className="link jk-row"
        >
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{problemName}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
        </Link>
      }
      label="problem"
    />
  );
}
