import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { CheckIcon, Popover, T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ContestNameLinkField: DataViewerHeadersType<ContestSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, key, user }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <Field className="jk-row left block">
      {user.isGuest || user.isAdministrator || user.isParticipant || user.isManager || user.isSpectator ? (
        <Link href={jukiSettings.ROUTES.contests().view({ key })}>
          <div className={classNames('gap nowrap link fw-bd space-between', { 'jk-col': isCard, 'jk-row': !isCard })}>
            <div style={{ textAlign: isCard ? undefined : 'left' }}>{name}</div>
            {user.isAdministrator ? (
              <Popover
                content={<T className="tt-se ws-np">you are admin</T>}
                placement="top"
                showPopperArrow
              >
                <div className="jk-tag tx-s fw-bd letter-tag">A</div>
              </Popover>
            ) : user.isManager ? (
              <Popover
                content={<T className="tt-se ws-np">you are judge</T>}
                placement="top"
                showPopperArrow
              >
                <div className="jk-tag tx-s fw-bd letter-tag">J</div>
              </Popover>
            ) : user.isParticipant ? (
              <Popover
                content={<T className="tt-se ws-np">registered</T>}
                placement="top"
                showPopperArrow
              >
                <div><CheckIcon filledCircle className="cr-ss" /></div>
              </Popover>
            ) : user.isGuest ? (
              <Popover
                content={<T className="tt-se ws-np">you are guest</T>}
                placement="top"
                showPopperArrow
              >
                <div className="jk-tag tx-s fw-bd letter-tag">G</div>
              </Popover>
            ) : user.isSpectator && (
              <Popover
                content={<T className="tt-se ws-np">you are spectator</T>}
                placement="top"
                showPopperArrow
              >
                <div className="jk-tag tx-s fw-bd letter-tag">S</div>
              </Popover>
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
