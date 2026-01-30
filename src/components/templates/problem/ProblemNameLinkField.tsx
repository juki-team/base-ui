import { jukiAppRoutes } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { classNames } from '../../helpers';
import { Field } from '../../organisms';
import { VoidIcon } from '../../server';
import { ProblemStatus } from './ProblemStatus';
import type { ProblemNameLinkFieldProps } from './types';

export function ProblemNameLinkField(props: ProblemNameLinkFieldProps) {
  
  const { record: { name, shortname, user, key }, isCard } = props;
  
  const { Link } = useUIStore(store => store.components);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      <div className="jk-row nowrap">
        <Link
          href={jukiAppRoutes.JUDGE().problems.view({ key })}
          className={classNames('link jk-row nowrap', { 'ta-lt': !isCard })}
        >
          <div
            style={{
              textAlign: isCard ? undefined : 'left',
              display: 'inline',
            }}
          >
            {(shortname ? `[${shortname}] ` : '') + name}
          </div>
        </Link>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <>
            &nbsp;
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are editor"
              size="small"
              filledSquare
              letter="E"
              className="cr-tx-ht"
              letterColor="var(--cr-tx-ht-it)"
            />
          </>
        )}
      </div>
    </Field>
  );
}
