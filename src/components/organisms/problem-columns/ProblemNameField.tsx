import { ContentResponseType, ProblemDataResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiApiSocketManager, jukiAppRoutes } from '../../../settings';
import { Modal } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { OpenInNewIcon, VoidIcon } from '../../server';
import { ProblemView } from '../../templates/ProblemView';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemStatus } from './ProblemStatus';

export const ProblemNameLinkField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
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

export const ProblemNameModalField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, user, key, shortname }, isCard } = props;
  
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      {modal}
      <div className="jk-row nowrap">
        <div
          className={classNames('jk-row link', { 'ta-lt': !isCard })}
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
                    <ProblemView
                      problem={data.data.content}
                      infoPlacement="name"
                      codeEditorStoreKey={data.data.content.key}
                    />
                  )}
                </FetcherLayer>
              </Modal>,
            );
          }}
        >
          {(shortname ? `[${shortname}] ` : '') + name}
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
