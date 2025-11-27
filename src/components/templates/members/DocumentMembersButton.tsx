import {
  cleanRequest,
  type ContentResponseType,
  ENTITY_ACCESS,
  type EntityMembersDTO,
  getDocumentAccess,
  HTTPMethod,
} from '@juki-team/commons';
import { useState } from 'react';
import { Button, CopyToClipboard, Popover, T } from '../../atoms';
import { ContentCopyIcon, EditIcon, InfoIIcon } from '../../atoms/server';
import { authorizedRequest } from '../../helpers';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { ButtonAction } from '../../molecules';
import { DocumentMembersModal } from './DocumentMembersModal/DocumentMembersModal';
import type { DocumentMembersButtonProps } from './types';

export function DocumentMembersButton(props: DocumentMembersButtonProps) {
  
  const {
    isAdministrator,
    members,
    documentOwner,
    documentName,
    onSave: initialOnSave,
    saveUrl,
    reloadDocument,
    copyLink,
    entityAccess,
    administrators,
    managers,
    participants,
    spectators,
    guests,
  } = props;
  
  const [ show, setShow ] = useState(false);
  const { notifyResponse } = useJukiNotification();
  const documentAccess = getDocumentAccess({ members });
  
  const onSave = initialOnSave ?? (async (members, close) => {
    const worksheetToPatch: { members: EntityMembersDTO } = {
      members: {
        rankAdministrators: members.rankAdministrators,
        administrators: Object.keys(members.administrators),
        rankManagers: members.rankManagers,
        managers: Object.keys(members.managers),
        rankGuests: members.rankGuests,
        guests: Object.keys(members.guests),
        rankSpectators: members.rankSpectators,
        spectators: Object.keys(members.spectators),
        rankParticipants: members.rankParticipants,
        participants: Object.keys(members.participants),
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
            <T className="tt-se">access</T>: <T className="tt-se">{entityAccess?.[documentAccess]?.name ?? ENTITY_ACCESS[documentAccess]?.label}</T>
          </div>
          <T className="tt-se">
            {entityAccess?.[documentAccess]?.description ?? ENTITY_ACCESS[documentAccess]?.description}
          </T>
        </div>
      }
    >
      <div className="jk-row">
        <InfoIIcon circle />
      </div>
    </Popover>
  );
  
  const button = (
    <Button size="small" key="share">
      <div className="jk-row gap nowrap">
        <T className="tt-se">share</T>
        {info}
      </div>
    </Button>
  );
  
  const actionButtons = [
    {
      children: button,
      buttons: [
        {
          children: button,
        },
        ...(copyLink ? [ {
          children: (
            <CopyToClipboard text={copyLink()} tooltip="" noStyling key="copy-link">
              <Button size="small" icon={<ContentCopyIcon />} type="void" className="bc-g6">
                <T className="tt-se">copy link</T>
              </Button>
            </CopyToClipboard>
          ),
        } ] : []),
        ...(isAdministrator ? [ {
          children: (
            <Button size="small" icon={<EditIcon />} onClick={() => setShow(true)} key="edit">
              <T className="tt-se">edit</T>
            </Button>
          ),
        } ] : []),
      ],
    },
  ];
  
  return (
    <>
      <ButtonAction {...actionButtons[0]} className="top center" placement="top" />
      <DocumentMembersModal
        isOpen={show}
        onClose={() => setShow(false)}
        members={members}
        documentName={documentName}
        documentOwner={documentOwner}
        onSave={onSave}
        administrators={administrators}
        managers={managers}
        participants={participants}
        spectators={spectators}
        guests={guests}
      />
    </>
  );
}
