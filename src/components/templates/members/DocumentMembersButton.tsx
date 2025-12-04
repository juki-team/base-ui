import {
  cleanRequest,
  type ContentResponseType,
  ENTITY_ACCESS,
  type EntityMembersDTO,
  getDocumentAccess,
  HTTPMethod,
} from '@juki-team/commons';
import { PropsWithChildren, useState } from 'react';
import { Button, CopyToClipboard, T } from '../../atoms';
import { EditIcon, ShareIcon } from '../../atoms/server';
import { authorizedRequest } from '../../helpers';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { ButtonAction } from '../../molecules';
import { DocumentMembersModal } from './DocumentMembersModal/DocumentMembersModal';
import type { DocumentMembersButtonProps } from './types';

export function DocumentMembersButton(props: PropsWithChildren<DocumentMembersButtonProps>) {
  
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
    children,
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
  
  const button = children || (
    <Button key="share" icon={<ShareIcon />}>
      <T className="tt-se">share</T>
    </Button>
  );
  
  const actionButtons = [
    {
      children: button,
      buttons: [
        {
          children: (
            <div>
              <div style={{ maxWidth: 256 }} className="jk-pg-xsm bc-we jk-br-ie">
                <div className="fw-bd">
                  <T className="tt-se">access</T>: <T className="tt-se">{entityAccess?.[documentAccess]?.name ?? ENTITY_ACCESS[documentAccess]?.label}</T>
                </div>
                <T className="tt-se">
                  {entityAccess?.[documentAccess]?.description ?? ENTITY_ACCESS[documentAccess]?.description}
                </T>
              </div>
              {(copyLink || isAdministrator) && (
                <div className="jk-row gap nowrap">
                  {copyLink && (
                    <CopyToClipboard text={copyLink()} className="flex-1" size="small">
                      <T className="tt-se">copy link</T>
                    </CopyToClipboard>
                  )}
                  {isAdministrator && (
                    <Button size="small" icon={<EditIcon />} onClick={() => setShow(true)} className="flex-1">
                      <T className="tt-se">edit</T>
                    </Button>
                  )}
                </div>
              )}
            </div>
          ),
        },
      ],
    },
  ];
  
  return (
    <>
      <ButtonAction
        {...actionButtons[0]}
        className="top center"
        placement="bottom"
        popoverClassName="jk-pg-xsm bc-we jk-br-ie elevation-1"
      />
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
