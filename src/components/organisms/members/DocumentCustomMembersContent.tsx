import {
  EntityMembersRank,
  EntityMembersResponseDTO,
  MemberType,
  UserBasicInfoResponseDTO,
  UserSummaryResponseDTO,
} from '@juki-team/commons';
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUser } from '../../../hooks';
import { InfoIcon, InputToggle, T, Tooltip } from '../../atoms';
import { UserChip } from '../UserChip';
import { UsersSelector } from '../UsersSelector';

const PrintUsers = ({ members }: { members?: EntityMembersResponseDTO['spectators'] }) => {
  const users = Object.values(members || {});
  
  if (!users.length) {
    return <div className="jk-row extend left"><T className="fw-lr tt-se">nobody</T></div>;
  }
  
  return (
    <div className="jk-row left gap">
      {users.map(({ nickname, imageUrl, companyKey }) => (
        <UserChip imageUrl={imageUrl} nickname={nickname} key={nickname} companyKey={companyKey} />
      ))}
    </div>
  );
};

export interface DocumentCustomMembersContentProps {
  members: EntityMembersResponseDTO,
  setMembers?: Dispatch<SetStateAction<EntityMembersResponseDTO>>,
  documentOwner: UserBasicInfoResponseDTO,
  administrators?: { name?: string, description?: ReactNode, closeable?: boolean, readonly?: boolean },
  managers?: { name?: string, description?: ReactNode, closeable?: boolean, readonly?: boolean },
  participants?: { name?: string, description?: ReactNode, closeable?: boolean, readonly?: boolean },
  guests?: { name?: string, description?: ReactNode, closeable?: boolean, readonly?: boolean },
  spectators?: { name?: string, description?: ReactNode, closeable?: boolean, readonly?: boolean },
}

export const DocumentCustomMembersContent = (props: DocumentCustomMembersContentProps) => {
  
  const {
    members,
    setMembers,
    documentOwner,
    administrators,
    managers,
    participants,
    guests,
    spectators,
  } = props;
  const { company: { key: companyKey } } = useJukiUser();
  
  useEffect(() => {
    setMembers?.(prevState => {
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
  
  const administratorsLabel = administrators?.name || 'administrators';
  const managersLabel = managers?.name || 'managers';
  const participantsLabel = participants?.name || 'participants';
  const guestsLabel = guests?.name || 'guests';
  const spectatorsLabel = spectators?.name || 'spectators';
  
  return (
    <div className="jk-col gap stretch gap">
      <div>
        <T className="tt-se fw-bd">owner</T>
        <div className="jk-row extend left">
          <UserChip nickname={documentOwner.nickname} imageUrl={documentOwner.imageUrl} />
        </div>
      </div>
      {administrators !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{administratorsLabel}</T>
            {!!administrators?.description && (
              <Tooltip content={administrators?.description || ''}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
            {administrators?.closeable && setMembers && (
              <InputToggle
                checked={members.rankAdministrators === EntityMembersRank.CLOSE}
                onChange={(value) => setMembers(prevState => ({
                  ...prevState,
                  rankAdministrators: value ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN,
                }))}
                leftLabel={
                  <T className={classNames({ 'fw-bd': members.rankAdministrators === EntityMembersRank.CLOSE })}>
                    open
                  </T>
                }
                rightLabel={
                  <T className={classNames({ 'fw-bd': members.rankAdministrators === EntityMembersRank.OPEN })}>
                    close
                  </T>
                }
                size="small"
              />
            )}
          </div>
          {members.rankAdministrators === EntityMembersRank.NONE ? (
            <T>not selectable</T>
          ) : members.rankAdministrators === EntityMembersRank.CLOSE ? (
            <T>{`only the following users will be ${administratorsLabel}`}</T>
          ) : (
            <T>{`all users will be ${administratorsLabel}`}</T>
          )}
          {members.rankAdministrators === EntityMembersRank.CLOSE && (
            administrators && setMembers ? (
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
            ) : <PrintUsers members={members.managers} />
          )}
        </div>
      )}
      {managers !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{managers?.name || 'managers'}</T>
            {!!managers?.description && (
              <Tooltip content={managers?.description || ''}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
            {managers?.closeable && setMembers && (
              <InputToggle
                checked={members.rankManagers === EntityMembersRank.CLOSE}
                onChange={(value) => setMembers(prevState => ({
                  ...prevState,
                  rankManagers: value ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN,
                }))}
                leftLabel={
                  <T className={classNames({ 'fw-bd': members.rankManagers === EntityMembersRank.CLOSE })}>
                    open
                  </T>
                }
                rightLabel={
                  <T className={classNames({ 'fw-bd': members.rankManagers === EntityMembersRank.OPEN })}>
                    close
                  </T>
                }
                size="small"
              />
            )}
          </div>
          {members.rankManagers === EntityMembersRank.NONE ? (
            <T>not selectable</T>
          ) : members.rankManagers === EntityMembersRank.CLOSE ? (
            <T>{`only the following users will be ${managersLabel}`}</T>
          ) : (
            <T>{`all users will be ${managersLabel}`}</T>
          )}
          {members.rankManagers === EntityMembersRank.CLOSE && (
            managers && setMembers ? (
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
            ) : <PrintUsers members={members.managers} />
          )}
        </div>
      )}
      {participants !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{participants?.name || 'participants'}</T>
            {!!participants?.description && (
              <Tooltip content={participants?.description || ''}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
            {participants?.closeable && setMembers && (
              <InputToggle
                checked={members.rankParticipants === EntityMembersRank.CLOSE}
                onChange={(value) => setMembers(prevState => ({
                  ...prevState,
                  rankParticipants: value ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN,
                }))}
                leftLabel={
                  <T className={classNames({ 'fw-bd': members.rankParticipants === EntityMembersRank.CLOSE })}>
                    open
                  </T>
                }
                rightLabel={
                  <T className={classNames({ 'fw-bd': members.rankParticipants === EntityMembersRank.OPEN })}>
                    close
                  </T>
                }
                size="small"
              />
            )}
          </div>
          {members.rankParticipants === EntityMembersRank.NONE ? (
            <T>not selectable</T>
          ) : members.rankParticipants === EntityMembersRank.CLOSE ? (
            <T>{`only the following users will be ${participantsLabel}`}</T>
          ) : (
            <T>{`all users will be ${participantsLabel}`}</T>
          )}
          {members.rankParticipants === EntityMembersRank.CLOSE && (
            participants && setMembers ? (
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
            ) : <PrintUsers members={members.participants} />
          )}
        </div>
      )}
      {guests !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{guests?.name || 'guests'}</T>
            {!!guests?.description && (
              <Tooltip content={guests?.description || ''}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
            {guests?.closeable && setMembers && (
              <InputToggle
                checked={members.rankGuests === EntityMembersRank.CLOSE}
                onChange={(value) => setMembers(prevState => ({
                  ...prevState,
                  rankGuests: value ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN,
                }))}
                leftLabel={
                  <T className={classNames({ 'fw-bd': members.rankGuests === EntityMembersRank.CLOSE })}>
                    open
                  </T>
                }
                rightLabel={
                  <T className={classNames({ 'fw-bd': members.rankGuests === EntityMembersRank.OPEN })}>
                    close
                  </T>
                }
                size="small"
              />
            )}
          </div>
          {members.rankGuests === EntityMembersRank.NONE ? (
            <T>not selectable</T>
          ) : members.rankGuests === EntityMembersRank.CLOSE ? (
            <T>{`only the following users will be ${guestsLabel}`}</T>
          ) : (
            <T>{`all users will be ${guestsLabel}`}</T>
          )}
          {members.rankGuests === EntityMembersRank.CLOSE && (
            guests && setMembers ? (
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
            ) : <PrintUsers members={members.guests} />
          )}
        </div>
      )}
      {spectators !== undefined && (
        <div>
          <div className="jk-row left gap">
            <T className="tt-se fw-bd">{spectators?.name || 'spectators'}</T>
            {!!spectators?.description && (
              <Tooltip content={spectators?.description || ''}>
                <div className="jk-row"><InfoIcon size="small" /></div>
              </Tooltip>
            )}
            {spectators?.closeable && setMembers && (
              <InputToggle
                checked={members.rankSpectators === EntityMembersRank.CLOSE}
                onChange={(value) => setMembers(prevState => ({
                  ...prevState,
                  rankSpectators: value ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN,
                }))}
                leftLabel={
                  <T className={classNames({ 'fw-bd': members.rankSpectators === EntityMembersRank.CLOSE })}>
                    open
                  </T>
                }
                rightLabel={
                  <T className={classNames({ 'fw-bd': members.rankSpectators === EntityMembersRank.OPEN })}>
                    close
                  </T>
                }
                size="small"
              />
            )}
          </div>
          {members.rankSpectators === EntityMembersRank.NONE ? (
            <T>not selectable</T>
          ) : members.rankSpectators === EntityMembersRank.CLOSE ? (
            <T>{`only the following users will be ${spectatorsLabel}`}</T>
          ) : (
            <T>{`all users will be ${spectatorsLabel}`}</T>
          )}
          {members.rankGuests === EntityMembersRank.CLOSE && (
            spectators && setMembers ? (
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
            ) : <PrintUsers members={members.spectators} />
          )}
        </div>
      )}
    </div>
  );
};
