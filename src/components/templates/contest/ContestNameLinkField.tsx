import React from 'react';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { jukiAppRoutes } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Field } from '../../organisms';
import { CheckIcon, OpenInNewIcon, VoidIcon } from '../../server';
import { ContestNameLinkFieldProps } from './types';

export const ContestNameLinkField = (props: ContestNameLinkFieldProps) => {
  
  const { record: { name, key, user, company: { key: companyKey } }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  const userCompanyKey = useUserStore(state => state.company.key);
  
  const origin = getJudgeOrigin(companyKey, userCompanyKey);
  
  return (
    <Field className="jk-row left block">
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
              className="cr-py"
              letterColor="var(--t-color-primary-text)"
            />
          ) : user.isManager ? (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are judge"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare
              letter="J"
              className="cr-py"
              letterColor="var(--t-color-primary-text)"
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
              className="cr-py"
              letterColor="var(--t-color-primary-text)"
            />
          ) : user.isSpectator && (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are spectator"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare
              letter="S"
              className="cr-py"
              letterColor="var(--t-color-primary-text)"
            />
          )}
        </div>
      ) : (
        <div className={classNames('jk-row gap fw-bd', { center: isCard, left: !isCard })}>
          {name}
        </div>
      )}
    </Field>
  );
};
