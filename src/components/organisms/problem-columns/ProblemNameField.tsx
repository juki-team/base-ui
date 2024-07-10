import React, { ReactNode, useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { Modal, T, Tooltip, VoidIcon } from '../../atoms';
import { ProblemView } from '../../templates';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemStatus } from './ProblemStatus';
import { ProblemDataViewerType } from './types';

export const ProblemNameField: DataViewerHeadersType<ProblemDataViewerType>['Field'] = (props) => {
  
  const { record: { name, user, viewProblemUrl, isManager, problem }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  console.log({ viewProblemUrl });
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      {modal}
      <div className="jk-row nowrap">
        {(isManager === true && problem) ? (
          <div
            className="jk-row link fw-bd"
            onClick={() => {
              setModal(
                <Modal
                  isOpen
                  onClose={() => setModal(null)}
                  closeWhenClickOutside
                  closeWhenKeyEscape
                  portalClassName="jk-modal-bc-wd"
                >
                  <div className="jk-pg-sm pn-re">
                    <ProblemView problem={problem} infoPlacement="name" />
                  </div>
                </Modal>,
              );
            }}
          >
            {name}
          </div>
        ) : (
          <Link href={{ pathname: viewProblemUrl }}>
            <div className="jk-row link fw-bd">{name}</div>
          </Link>
        )}
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <Tooltip
            content={<T className="tt-se ws-np">you are editor</T>}
            placement="top"
            withPortal
          >
            <div className="jk-row tx-s cr-py">
              &nbsp;<VoidIcon size="small" filledSquare letter="E" />
            </div>
          </Tooltip>
        )}
      </div>
    </Field>
  );
};

export const getProblemNameHeader = (): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'problem name',
  headClassName: 'left',
  index: 'name',
  Field: ProblemNameField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'center',
  minWidth: 300,
});
