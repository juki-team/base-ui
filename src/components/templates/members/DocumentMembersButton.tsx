import { ContentResponseType, DocumentMembersDTO, ENTITY_ACCESS, HTTPMethod } from '@juki-team/commons';
import React, { useState } from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification, useUserStore } from '../../../hooks';
import { Button, Popover, T } from '../../atoms';
import { InfoIcon } from '../../server';
import { DocumentMembersModal } from './DocumentMembersModal/DocumentMembersModal';
import { DocumentMembersButtonProps } from './types';

export const DocumentMembersButton = (props: DocumentMembersButtonProps) => {
  
  const {
    documentMembers,
    documentOwner,
    documentName,
    onSave: initialOnSave,
    saveUrl,
    reloadDocument,
  } = props;
  
  const [ show, setShow ] = useState(false);
  const nickname = useUserStore(state => state.user.nickname);
  const { notifyResponse } = useJukiNotification();
  
  const onSave = initialOnSave ?? (async (members, close) => {
    const worksheetToPatch: { members: DocumentMembersDTO } = {
      members: {
        access: members.access,
        managers: Object.keys(members.managers),
        spectators: Object.keys(members.spectators),
      },
    };
    const response = cleanRequest<ContentResponseType<string>>(
      await authorizedRequest(saveUrl!, {
        method: HTTPMethod.PUT,
        body: JSON.stringify(worksheetToPatch),
      }));
    await reloadDocument?.();
    notifyResponse(response);
    close();
  });
  
  const info = (
    <Popover
      content={
        <div style={{ width: 120 }}>
          <div className="fw-bd"><T className="tt-se">{ENTITY_ACCESS[documentMembers.access].label}</T></div>
          <T className="tt-se">{ENTITY_ACCESS[documentMembers.access].description}</T>
        </div>
      }
    >
      <div className="jk-row">
        <InfoIcon />
      </div>
    </Popover>
  );
  
  if (nickname !== documentOwner.nickname) {
    return info;
  }
  
  return (
    <>
      <Button size="small" onClick={() => setShow(true)}>
        <div className="jk-row gap nowrap">
          <T>share</T>
          {info}
        </div>
      </Button>
      <DocumentMembersModal
        isOpen={show}
        onClose={() => setShow(false)}
        documentMembers={documentMembers}
        documentName={documentName}
        documentOwner={documentOwner}
        onSave={onSave}
      />
    </>
  );
};
