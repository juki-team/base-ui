import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { CheckIcon, OpenInNewIcon, VoidIcon } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ContestNameLinkField: DataViewerHeadersType<ContestSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, key, user, company: { key: companyKey } }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = getJudgeOrigin(companyKey);
  
  return (
    <Field className="jk-row left block">
      {user.isGuest || user.isAdministrator || user.isParticipant || user.isManager || user.isSpectator ? (
        <div className={classNames('gap nowrap fw-bd space-between', { 'jk-col': isCard, 'jk-row': !isCard })}>
          <Link href={jukiAppRoutes.JUDGE(origin).contests.view({ key })} className="link">
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
              filledSquare letter="A"
              letterColor="var(--t-color-primary-text)"
            />
          ) : user.isManager ? (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are judge"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare letter="J"
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
              filledSquare letter="G"
              letterColor="var(--t-color-primary-text)"
            />
          ) : user.isSpectator && (
            <VoidIcon
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are spectator"
              data-tooltip-t-class-name="tt-se ws-np"
              size="small"
              filledSquare letter="S"
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

export const getContestNameHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'contest name',
  headClassName: 'left',
  index: 'name',
  Field: ContestNameLinkField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  minWidth: 320,
});
