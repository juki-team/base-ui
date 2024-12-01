import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { CheckIcon } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ContestNameLinkField: DataViewerHeadersType<ContestSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, key, user }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <Field className="jk-row left block">
      {user.isGuest || user.isAdministrator || user.isParticipant || user.isManager || user.isSpectator ? (
        <Link href={jukiAppRoutes.JUDGE().contests.view({ key })}>
          <div className={classNames('gap nowrap link fw-bd space-between', { 'jk-col': isCard, 'jk-row': !isCard })}>
            <div style={{ textAlign: isCard ? undefined : 'left' }}>{name}</div>
            {user.isAdministrator ? (
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="you are admin"
                data-tooltip-t-class-name="tt-se ws-np"
                className="jk-tag tx-s fw-bd letter-tag"
              >
                A
              </div>
            ) : user.isManager ? (
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="you are judge"
                data-tooltip-t-class-name="tt-se ws-np"
                className="jk-tag tx-s fw-bd letter-tag"
              >
                J
              </div>
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
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="you are guest"
                data-tooltip-t-class-name="tt-se ws-np"
                className="jk-tag tx-s fw-bd letter-tag"
              >
                G
              </div>
            ) : user.isSpectator && (
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="you are spectator"
                data-tooltip-t-class-name="tt-se ws-np"
                className="jk-tag tx-s fw-bd letter-tag"
              >
                S
              </div>
            )}
          </div>
        </Link>
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
