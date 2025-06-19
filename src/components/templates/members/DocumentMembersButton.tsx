import { ContentResponseType, DocumentMembersDTO, ENTITY_ACCESS, getUserKey, HTTPMethod } from '@juki-team/commons';
import React, { useState } from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, CopyToClipboard, Popover, T } from '../../atoms';
import { ContentCopyIcon } from '../../atoms/server';
import { ButtonAction } from '../../molecules/FloatToolbar/ButtonAction';
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
    copyLink,
  } = props;
  
  const [ show, setShow ] = useState(false);
  const nickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
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
      popoverClassName="bc-we jk-br-ie elevation-1"
      offset={4}
      content={
        <div style={{ maxWidth: 256 }} className="jk-pg-xsm tx-s">
          <div className="fw-bd">
            <T className="tt-se">access</T>: <T className="tt-se">{ENTITY_ACCESS[documentMembers.access].label}</T>
          </div>
          <T className="tt-se">{ENTITY_ACCESS[documentMembers.access].description}</T>
        </div>
      }
    >
      <div className="jk-row">
        <InfoIcon />
      </div>
    </Popover>
  );
  
  let button = (
    <Button size="small" onClick={() => setShow(true)}>
      <div className="jk-row gap nowrap">
        <T className="tt-se">share</T>
        {info}
      </div>
    </Button>
  );
  
  if (getUserKey(nickname, companyKey) !== getUserKey(documentOwner.nickname, documentOwner.company.key)) {
    button = info;
  }
  
  const actionButtons = [
    {
      children: button,
      buttons: [
        {
          children: button,
        },
        ...(copyLink ? [ {
          children: (
            <CopyToClipboard text={copyLink()} tooltip="" noStyling>
              <Button size="small" icon={<ContentCopyIcon />} type="void" className="bc-g6">
                <T className="tt-se">copy link</T>
              </Button>
            </CopyToClipboard>
          ),
        } ] : []),
      ],
    } ];
  
  return (
    <>
      <ButtonAction {...actionButtons[0]} className="top center" placement="top" />
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
