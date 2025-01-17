import { ContentResponseType, ProblemDataResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiApiSocketManager, jukiAppRoutes } from '../../../settings';
import { Modal, OpenInNewIcon, VoidIcon } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { ProblemView } from '../../templates';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemStatus } from './ProblemStatus';

export const ProblemNameLinkField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, user, key, company: { key: companyKey } }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = getJudgeOrigin(companyKey);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      <div className="jk-row nowrap">
        <Link href={jukiAppRoutes.JUDGE(origin).problems.view({ key })} className="link">
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{name}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
        </Link>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <>
            &nbsp;
            <div
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are editor"
              className="jk-row tx-s cr-pl"
            >
              <VoidIcon size="small" filledSquare letter="E" letterColor="var(--t-color-primary-text)" />
            </div>
          </>
        )}
      </div>
    </Field>
  );
};

export const ProblemNameModalField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, user, key }, isCard } = props;
  
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      {modal}
      <div className="jk-row nowrap">
        <div
          className="jk-row link fw-bd"
          onClick={() => {
            setModal(
              <Modal
                isOpen
                onClose={() => setModal(null)}
                // portalClassName="jk-modal-bc-wd jk-modal-height-expanded" // TODO:
              >
                <FetcherLayer<ContentResponseType<ProblemDataResponseDTO>>
                  url={jukiApiSocketManager.API_V1.problem.getData({ params: { key } }).url}
                >
                  {data => (
                    <ProblemView problem={data.data.content} infoPlacement="name" />
                  )}
                </FetcherLayer>
              </Modal>,
            );
          }}
        >
          {name}
        </div>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <>
            &nbsp;
            <div
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are editor"
              data-tooltip-t-class-name="tt-se ws-np"
              className="jk-row tx-s cr-py"
            >
              <VoidIcon size="small" filledSquare letter="E" />
            </div>
          </>
        )}
      </div>
    </Field>
  );
};

export const getProblemNameHeader = (modal: boolean, props?: Partial<DataViewerHeadersType<ProblemSummaryListResponseDTO>>): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'problem name',
  headClassName: 'left',
  index: 'name',
  Field: modal ? ProblemNameModalField : ProblemNameLinkField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'center',
  minWidth: 300,
  ...props,
});
