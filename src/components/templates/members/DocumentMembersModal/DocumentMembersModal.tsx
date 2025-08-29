import { EntityMembersResponseDTO, Status } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { useStableState } from '../../../../hooks';
import { Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader } from '../../../molecules';
import { DocumentMembersContent } from '../DocumentMembersContent';
import { DocumentCustomMembersContentProps } from '../types';

export interface DocumentMembersModalProps extends BasicModalProps, Pick<DocumentCustomMembersContentProps, 'entityAccess' | 'documentOwner' | 'members' | 'administrators' | 'managers' | 'participants' | 'guests' | 'spectators'> {
  documentName: ReactNode,
  onSave: (members: EntityMembersResponseDTO, close: () => void) => Promise<void>,
}

export const DocumentMembersModal = (props: DocumentMembersModalProps) => {
  
  const {
    documentName,
    members: initialMembers,
    documentOwner,
    administrators,
    managers,
    participants,
    guests,
    spectators,
    entityAccess,
    onClose,
    onSave,
    isOpen,
  } = props;
  
  const [ members, setMembers ] = useStableState(initialMembers);
  const [ loading, setLoading ] = useState(false);
  
  const done = JSON.stringify(members) === JSON.stringify(initialMembers);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => null : onClose}
      closeOnClickOverlay={done}
      closeOnKeyEscape={done}
      className="wh-ao"
    >
      <div className="jk-col stretch gap jk-pg-md">
        <div className="jk-row left extend">
          <h3><T className="tt-se">share</T>&nbsp;{documentName}</h3>
        </div>
        <DocumentMembersContent
          {...{
            members,
            setMembers,
            documentOwner,
            administrators,
            managers,
            participants,
            guests,
            spectators,
            entityAccess,
          }}
        />
        <div className="jk-row-col gap block">
          <ButtonLoader type="light" onClick={onClose} disabled={loading}>
            <T className="tt-se">close</T>
          </ButtonLoader>
          <ButtonLoader
            disabled={done}
            type="primary"
            submit
            onClick={async (setLoaderStatus) => {
              setLoaderStatus(Status.LOADING);
              setLoading(true);
              await onSave(members, onClose);
              setLoading(false);
              setLoaderStatus(Status.SUCCESS);
            }}
          >
            <T className="tt-se">save</T>
          </ButtonLoader>
        </div>
      </div>
    </Modal>
  );
};
