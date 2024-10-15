import { ContentResponseType, ProblemDataResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { jukiSettings } from '../../../config';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { Modal, VoidIcon } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { ProblemView } from '../../templates';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemStatus } from './ProblemStatus';

export const ProblemNameLinkField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { name, user, key }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      <div className="jk-row nowrap">
        <Link href={jukiSettings.ROUTES.problems().view({ key })}>
          <div className="jk-row link fw-bd">{name}</div>
        </Link>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="you are editor"
            data-tooltip-t-class-name="tt-se ws-np"
            className="jk-row tx-s cr-py"
          >
            &nbsp;<VoidIcon size="small" filledSquare letter="E" />
          </div>
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
                closeWhenClickOutside
                closeWhenKeyEscape
                portalClassName="jk-modal-bc-wd jk-modal-height-expanded"
              >
                <FetcherLayer<ContentResponseType<ProblemDataResponseDTO>>
                  url={jukiSettings.API.problem.getData({ params: { key } }).url}
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
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="you are editor"
            data-tooltip-t-class-name="tt-se ws-np"
            className="jk-row tx-s cr-py"
          >
            &nbsp;<VoidIcon size="small" filledSquare letter="E" />
          </div>
        )}
      </div>
    </Field>
  );
};

export const getProblemNameHeader = (modal: boolean): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'problem name',
  headClassName: 'left',
  index: 'name',
  Field: modal ? ProblemNameModalField : ProblemNameLinkField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'center',
  minWidth: 300,
});
