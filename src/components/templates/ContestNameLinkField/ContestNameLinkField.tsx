import { jukiAppRoutes } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { classNames } from '../../helpers/commons';
import { getJudgeOrigin } from '../../helpers/problem';
import { CheckIcon } from '../../atoms/server/icons/google/CheckIcon';
import { OpenInNewIcon } from '../../atoms/server/icons/google/OpenInNewIcon';
import { VoidIcon } from '../../atoms/server/icons/google/VoidIcon';
import type { ContestNameLinkFieldProps } from './types';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
export function ContestNameLinkField(props: ContestNameLinkFieldProps) {
  const {
    record: {
      name,
      key,
      user,
      organization: { key: organizationKey },
    },
    isCard,
  } = props;

  const { Link } = useUIStore((store) => store.components);
  const userOrganizationKey = useUserStore((state) => state.organization.key);

  const origin = getJudgeOrigin(organizationKey, userOrganizationKey);

  return (
    <div className="jk-table-field jk-row left block">
      {user.isGuest || user.isAdministrator || user.isParticipant || user.isManager || user.isSpectator ? (
        <div className={classNames('gap nowrap', { 'jk-col': isCard, 'jk-row left': !isCard })}>
          <Link
            href={jukiAppRoutes.JUDGE(origin).contests.view({ key })}
            className={classNames('link jk-row nowrap', { 'ta-lt': !isCard })}
            target={origin ? '_blank' : undefined}
          >
            <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{name}</div>
            &nbsp;
            {!!origin && <OpenInNewIcon size="small" />}
          </Link>
          {user.isAdministrator ? (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are admin"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare
              letter="A"
              className="cr-tx-ht"
              letterColor="var(--cr-tx-ht-it)"
            />
          ) : user.isManager ? (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are judge"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare
              letter="J"
              className="cr-tx-ht"
              letterColor="var(--cr-tx-ht-it)"
            />
          ) : user.isParticipant ? (
            <div>
              <CheckIcon
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="registered"
                data-tooltip-t-class-name="tt-se ws-np"
                filledCircle
                className="cr-ss"
              />
            </div>
          ) : user.isGuest ? (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are guest"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare
              letter="G"
              className="cr-tx-ht"
              letterColor="var(--cr-tx-ht-it)"
            />
          ) : (
            user.isSpectator && (
              <VoidIcon
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="you are spectator"
                data-tooltip-t-class-name="tt-se ws-np"
                size="small"
                filledSquare
                letter="S"
                className="cr-tx-ht"
                letterColor="var(--cr-tx-ht-it)"
              />
            )
          )}
        </div>
      ) : (
        <div className={classNames('jk-row gap fw-bd', { center: isCard, left: !isCard })}>{name}</div>
      )}
    </div>
  );
}
