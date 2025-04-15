import { DocumentMembersResponseDTO, Status, UserCompanyBasicInfoResponseDTO } from '@juki-team/commons';
import React, { useState } from 'react';
import { Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader } from '../../../molecules';
import { DocumentMembersContent } from '../DocumentMembersContent';

export interface DocumentMembersModalProps extends BasicModalProps {
  documentName: string,
  documentMembers: DocumentMembersResponseDTO,
  documentOwner: UserCompanyBasicInfoResponseDTO,
  onSave: (members: DocumentMembersResponseDTO, close: () => void) => Promise<void>,
}

export const DocumentMembersModal = (props: DocumentMembersModalProps) => {
  
  const { documentName, documentMembers, documentOwner, onClose, onSave, isOpen } = props;
  
  const [ members, setMembers ] = useState(documentMembers);
  
  const [ loading, setLoading ] = useState(false);
  const done = JSON.stringify(documentMembers) === JSON.stringify(members);
  
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
          <h3><T>share</T>&nbsp;{`"${documentName}"`}</h3>
        </div>
        <DocumentMembersContent members={members} setMembers={setMembers} documentOwner={documentOwner} />
        <div className="jk-row-col gap block">
          <ButtonLoader type="light" onClick={onClose} disabled={loading}>
            <T>close</T>
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
            <T>save</T>
          </ButtonLoader>
        </div>
      </div>
    </Modal>
  );
};
