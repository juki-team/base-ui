import { getJudgeOrigin } from '../../helpers';
import { jukiAppRoutes } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { useJukiUI } from '../../hooks/useJukiUI';
import { FieldText } from '../../organisms';
import { OpenInNewIcon } from '../../server';
import type { SubmissionProblemFieldProps } from './types';

export function SubmissionProblemField(props: SubmissionProblemFieldProps) {
  
  const {
    record: {
      problem: { key: problemKey, name: problemName, company: { key: problemCompanyKey } },
    },
    isCard,
  } = props;
  
  const { components: { Link } } = useJukiUI();
  const userCompanyKey = useUserStore(state => state.company.key);
  
  const origin = getJudgeOrigin(problemCompanyKey, userCompanyKey);
  
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
