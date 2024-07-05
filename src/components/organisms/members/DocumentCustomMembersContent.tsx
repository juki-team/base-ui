import {
  EntityMembersRank,
  EntityMembersResponseDTO,
  MemberType,
  UserBasicInfoResponseDTO,
  UserSummaryResponseDTO,
} from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useJukiUser } from '../../../hooks';
import { InfoIcon, T, Tooltip } from '../../atoms';
import { UserChip } from '../UserChip';
import { UsersSelector } from '../UsersSelector';


const PrintUsers = ({ members }: { members?: EntityMembersResponseDTO['spectators'] }) => {
  const users = Object.values(members || {});
  
  if (!users.length) {
    return <div className="jk-row extend"><T className="fw-lr">nobody</T></div>;
  }
  
  return (
    <div className="jk-row left gap">
      {users.map(({ nickname, imageUrl }) => (
        <UserChip imageUrl={imageUrl} nickname={nickname} key={nickname} />
      ))}
    </div>
  );
};

export interface DocumentCustomMembersContentProps {
  members: EntityMembersResponseDTO,
  setMembers: Dispatch<SetStateAction<EntityMembersResponseDTO>>,
  documentOwner: UserBasicInfoResponseDTO,
  labels?: {
    administrators?: { name?: string, description?: string },
    managers?: { name?: string, description?: string },
    participants?: { name?: string, description?: string },
    guests?: { name?: string, description?: string },
    spectators?: { name?: string, description?: string },
  }
  administrators?: boolean,
  managers?: boolean,
  participants?: boolean,
  guests?: boolean,
  spectators?: boolean,
}

export const DocumentCustomMembersContent = (props: DocumentCustomMembersContentProps) => {
  
  const {
    members,
    setMembers,
    documentOwner,
    labels,
    administrators,
    managers,
    participants,
    guests,
    spectators,
  } = props;
  const { company: { key: companyKey } } = useJukiUser();
  console.log({ members });
  
  useEffect(() => {
    setMembers(prevState => {
      let rankAdministrators;
      let newAdministrators;
      if (administrators === undefined) {
        rankAdministrators = EntityMembersRank.NONE;
        newAdministrators = {};
      } else {
        rankAdministrators = prevState.rankAdministrators;
        if (rankAdministrators === EntityMembersRank.NONE) {
          rankAdministrators = Object.keys(prevState.administrators).length === 0 ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN;
        }
        if (rankAdministrators === EntityMembersRank.OPEN) {
          newAdministrators = {};
        } else {
          newAdministrators = prevState.administrators;
        }
      }
      
      let rankManagers;
      let newManagers;
      if (managers === undefined) {
        rankManagers = EntityMembersRank.NONE;
        newManagers = {};
      } else {
        rankManagers = prevState.rankManagers;
        if (rankManagers === EntityMembersRank.NONE) {
          rankManagers = Object.keys(prevState.managers).length === 0 ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN;
        }
        if (rankManagers === EntityMembersRank.OPEN) {
          newManagers = {};
        } else {
          newManagers = prevState.managers;
        }
      }
      
      let rankParticipants;
      let newParticipants;
      if (participants === undefined) {
        rankParticipants = EntityMembersRank.NONE;
        newParticipants = {};
      } else {
        rankParticipants = prevState.rankParticipants;
        if (rankParticipants === EntityMembersRank.NONE) {
          rankParticipants = Object.keys(prevState.participants).length === 0 ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN;
        }
        if (rankParticipants === EntityMembersRank.OPEN) {
          newParticipants = {};
        } else {
          newParticipants = prevState.participants;
        }
      }
      
      let rankGuests;
      let newGuests;
      if (guests === undefined) {
        rankGuests = EntityMembersRank.NONE;
        newGuests = {};
      } else {
        rankGuests = prevState.rankGuests;
        if (rankGuests === EntityMembersRank.NONE) {
          rankGuests = Object.keys(prevState.guests).length === 0 ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN;
        }
        if (rankGuests === EntityMembersRank.OPEN) {
          newGuests = {};
        } else {
          newGuests = prevState.guests;
        }
      }
      
      let rankSpectators;
      let newSpectators;
      if (spectators === undefined) {
        rankSpectators = EntityMembersRank.NONE;
        newSpectators = {};
      } else {
        rankSpectators = prevState.rankSpectators;
        if (rankSpectators === EntityMembersRank.NONE) {
          rankSpectators = Object.keys(prevState.spectators).length === 0 ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN;
        }
        if (rankSpectators === EntityMembersRank.OPEN) {
          newSpectators = {};
        } else {
          newSpectators = prevState.spectators;
        }
      }
      
      const newMembers: EntityMembersResponseDTO = {
        rankAdministrators,
        administrators: newAdministrators,
        rankManagers,
        managers: newManagers,
        rankParticipants,
        participants: newParticipants,
        rankGuests,
        guests: newGuests,
        rankSpectators,
        spectators: newSpectators,
      };
      
      return newMembers;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ administrators, guests, managers, participants, spectators ]);
  
  return (
    <div className="jk-col gap stretch gap">
      <div>
        <T className="tt-se fw-bd">owner</T>
        <div className="jk-row">
          <UserChip nickname={documentOwner.nickname} imageUrl={documentOwner.imageUrl} />
        </div>
      </div>
      {administrators !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{labels?.administrators?.name || 'administrators'}</T>
            {!!labels?.administrators?.description && (
              <Tooltip content={<T>{labels?.administrators?.description || ''}</T>}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
          </div>
          {administrators ? (
            <UsersSelector
              selectedUsers={Object.keys(members.administrators ?? {})}
              onChangeSelectedUsers={(selectedUsers: UserSummaryResponseDTO[]) => {
                const administrators: EntityMembersResponseDTO['administrators'] = {};
                for (const user of selectedUsers) {
                  administrators[user.nickname] = {
                    imageUrl: user.imageUrl,
                    nickname: user.nickname,
                    companyKey: user.companyKey,
                    type: MemberType.USER,
                  };
                }
                setMembers(prevState => ({ ...prevState, administrators }));
              }}
              companyKey={companyKey}
            />
          ) : <PrintUsers members={members.managers} />}
        </div>
      )}
      {managers !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{labels?.managers?.name || 'managers'}</T>
            {!!labels?.managers?.description && (
              <Tooltip content={<T>{labels?.managers?.description || ''}</T>}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
          </div>
          {managers ? (
            <UsersSelector
              selectedUsers={Object.keys(members.managers ?? {})}
              onChangeSelectedUsers={(selectedUsers: UserSummaryResponseDTO[]) => {
                const managers: EntityMembersResponseDTO['managers'] = {};
                for (const user of selectedUsers) {
                  managers[user.nickname] = {
                    imageUrl: user.imageUrl,
                    nickname: user.nickname,
                    companyKey: user.companyKey,
                    type: MemberType.USER,
                  };
                }
                setMembers(prevState => ({ ...prevState, managers }));
              }}
              companyKey={companyKey}
            />
          ) : <PrintUsers members={members.managers} />}
        </div>
      )}
      {participants !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{labels?.participants?.name || 'participants'}</T>
            {!!labels?.participants?.description && (
              <Tooltip content={<T>{labels?.participants?.description || ''}</T>}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
          </div>
          {participants ? (
            <UsersSelector
              selectedUsers={Object.keys(members.participants ?? {})}
              onChangeSelectedUsers={(selectedUsers: UserSummaryResponseDTO[]) => {
                const participants: EntityMembersResponseDTO['participants'] = {};
                for (const user of selectedUsers) {
                  participants[user.nickname] = {
                    imageUrl: user.imageUrl,
                    nickname: user.nickname,
                    companyKey: user.companyKey,
                    type: MemberType.USER,
                  };
                }
                setMembers(prevState => ({ ...prevState, participants }));
              }}
              companyKey={companyKey}
            />
          ) : <PrintUsers members={members.participants} />}
        </div>
      )}
      {guests !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{labels?.guests?.name || 'guests'}</T>
            {!!labels?.guests?.description && (
              <Tooltip content={<T>{labels?.guests?.description || ''}</T>}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
          </div>
          {guests ? (
            <UsersSelector
              selectedUsers={Object.keys(members.guests ?? {})}
              onChangeSelectedUsers={(selectedUsers: UserSummaryResponseDTO[]) => {
                const guests: EntityMembersResponseDTO['guests'] = {};
                for (const user of selectedUsers) {
                  guests[user.nickname] = {
                    imageUrl: user.imageUrl,
                    nickname: user.nickname,
                    companyKey: user.companyKey,
                    type: MemberType.USER,
                  };
                }
                setMembers(prevState => ({ ...prevState, guests }));
              }}
              companyKey={companyKey}
            />
          ) : <PrintUsers members={members.guests} />}
        </div>
      )}
      {spectators !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{labels?.spectators?.name || 'spectators'}</T>
            {!!labels?.spectators?.description && (
              <Tooltip content={<T>{labels?.spectators?.description || ''}</T>}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
          </div>
          {spectators ? (
            <UsersSelector
              selectedUsers={Object.keys(members.spectators ?? {})}
              onChangeSelectedUsers={(selectedUsers: UserSummaryResponseDTO[]) => {
                const spectators: EntityMembersResponseDTO['spectators'] = {};
                for (const user of selectedUsers) {
                  spectators[user.nickname] = {
                    imageUrl: user.imageUrl,
                    nickname: user.nickname,
                    companyKey: user.companyKey,
                    type: MemberType.USER,
                  };
                }
                setMembers(prevState => ({ ...prevState, spectators }));
              }}
              companyKey={companyKey}
            />
          ) : <PrintUsers members={members.spectators} />}
        </div>
      )}
    </div>
  );
};
