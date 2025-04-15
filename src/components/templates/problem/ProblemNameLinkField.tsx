import React from 'react';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { Field } from '../../organisms';
import { OpenInNewIcon, VoidIcon } from '../../server';
import { ProblemStatus } from './ProblemStatus';
import { ProblemNameLinkFieldProps } from './types';

export const ProblemNameLinkField = (props: ProblemNameLinkFieldProps) => {
  
  const { record: { name, shortname, user, key, company: { key: companyKey } }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = getJudgeOrigin(companyKey);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      <div className="jk-row nowrap">
        <Link
          href={jukiAppRoutes.JUDGE(origin).problems.view({ key })}
          className={classNames('link jk-row nowrap', { 'ta-lt': !isCard })}
          target={origin ? '_blank' : undefined}
        >
          <div
            style={{
              textAlign: isCard ? undefined : 'left',
              display: 'inline',
            }}
          >
            {(shortname ? `[${shortname}] ` : '') + name}
          </div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
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
              className="cr-py"
              letterColor="var(--t-color-primary-text)"
            />
          </>
        )}
      </div>
    </Field>
  );
};
