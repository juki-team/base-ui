import {
  DocumentMembersResponseDTO,
  ENTITY_ACCESS,
  EntityAccess,
  FileMemberRole,
  MemberType,
  UserCompanyBasicInfoResponseDTO,
} from '@juki-team/commons';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { useUserStore } from '../../../hooks';
import { Button, Select, T } from '../../atoms';
import { DeleteIcon, GlobeIcon, LockIcon, LockPersonIcon, PublicIcon } from '../../server';
import { UserChip } from '../UserChip';
import { UsersSelector } from '../UsersSelector';

export interface DocumentMembersContentProps {
  members: DocumentMembersResponseDTO,
  setMembers?: Dispatch<SetStateAction<DocumentMembersResponseDTO>>,
  documentOwner: UserCompanyBasicInfoResponseDTO,
}

export const DocumentMembersContent = ({ members, setMembers, documentOwner }: DocumentMembersContentProps) => {
  
  const companyKey = useUserStore(state => state.company.key);
  
  const FileAccessIcons = {
    [EntityAccess.PRIVATE]: <LockIcon />,
    [EntityAccess.RESTRICTED]: <LockPersonIcon />,
    [EntityAccess.PUBLIC]: <PublicIcon />,
    [EntityAccess.EXPOSED]: <GlobeIcon />,
  };
  
  return (
    <div className="jk-col gap stretch gap">
      <div>
        <T className="fw-bd tt-se">access type</T>
        <div>
          <Select
            options={Object.values(ENTITY_ACCESS).map(fileAccess => ({
              value: fileAccess.value,
              label: (
                <div className="jk-row gap left jk-pg-sm">
                  <div className="jk-col left stretch" style={{ maxWidth: 300 }}>
                    <div className="jk-row gap left">{FileAccessIcons[fileAccess.value]}<T className="tt-se fw-bd">{fileAccess.label}</T>
                    </div>
                    <T className="tt-se">{fileAccess.description}</T>
                  </div>
                </div>
              ),
            }))}
            selectedOption={{ value: members.access }}
            extend
            onChange={setMembers ? ({ value }) => {
              setMembers(prevState => ({ ...prevState, access: value }));
            } : undefined}
          />
        </div>
      </div>
      {(members.access === EntityAccess.RESTRICTED || members.access === EntityAccess.PUBLIC) && (
        <>
          <div className="jk-col stretch extend">
            <T className="fw-bd tt-se">People with access</T>
            <div className="jk-row gap space-between extend hover-highlight gap-full-borders jk-br-ie">
              <UserChip
                imageUrl={documentOwner.imageUrl}
                nickname={documentOwner.nickname}
                // givenName={documentOwner.givenName}
                // familyName={documentOwner.familyName}
                className="flex-1"
              />
              <Select options={[ { value: 'owner', label: <T>owner</T> } ]} selectedOption={{ value: 'owner' }} />
            </div>
            {[
              ...Object.values(members.managers).map(mem => ({ ...mem, role: FileMemberRole.EDITOR })),
              ...Object.values(members.spectators).map(mem => ({ ...mem, role: FileMemberRole.VIEWER })),
            ].map(({ nickname, imageUrl, company, role }) => (
              <div
                key={nickname}
                className="jk-row gap space-between extend hover-highlight gap-full-borders jk-br-ie"
              >
                <UserChip
                  imageUrl={imageUrl}
                  nickname={nickname}
                  className="flex-1"
                />
                <Select<FileMemberRole | 'remove', ReactNode, ReactNode>
                  options={[
                    ...(members.access === EntityAccess.RESTRICTED ? [ {
                      value: FileMemberRole.VIEWER,
                      label: <T>viewer</T>,
                    } ] : []),
                    { value: FileMemberRole.EDITOR, label: <T>editor</T> },
                  ]}
                  selectedOption={{ value: role }}
                  onChange={setMembers ? ({ value }) => {
                    const { [nickname]: _1, ...newManagers } = members.managers;
                    const { [nickname]: _2, ...newSpectators } = members.spectators;
                    if (value === FileMemberRole.EDITOR) {
                      newManagers[nickname] = { nickname, imageUrl, company, type: MemberType.USER };
                    } else {
                      newSpectators[nickname] = { nickname, imageUrl, company, type: MemberType.USER };
                    }
                    setMembers(prevState => ({ ...prevState, managers: newManagers, spectators: newSpectators }));
                  } : undefined}
                />
                {setMembers && (
                  <Button
                    onClick={() => {
                      const { [nickname]: _1, ...newManagers } = members.managers;
                      const { [nickname]: _2, ...newSpectators } = members.spectators;
                      setMembers(prevState => ({ ...prevState, managers: newManagers, spectators: newSpectators }));
                    }}
                    icon={
                      <div data-tooltip-id="jk-tooltip" data-tooltip-content="remove access"><DeleteIcon /></div>
                    }
                    size="small"
                    type="light"
                  />
                )}
              </div>
            ))}
          </div>
          {setMembers && (
            <div>
              <T className="fw-bd tt-se">add people</T>
              <UsersSelector
                companyKey={companyKey}
                selectedUsers={[]}
                onChangeSelectedUsers={([ user ]) => {
                  if (user && !members.managers[user.nickname] && !members.spectators[user.nickname]) {
                    const role = members.access === EntityAccess.PUBLIC ? FileMemberRole.EDITOR : FileMemberRole.VIEWER;
                    if (role === FileMemberRole.EDITOR) {
                      const newManagers = { ...members.managers };
                      newManagers[user.nickname] = {
                        nickname: user.nickname,
                        imageUrl: user.imageUrl,
                        company: user.company,
                        type: MemberType.USER,
                      };
                      setMembers(prevState => ({ ...prevState, managers: newManagers }));
                    } else {
                      const newSpectators = { ...members.spectators };
                      newSpectators[user.nickname] = {
                        nickname: user.nickname,
                        imageUrl: user.imageUrl,
                        company: user.company,
                        type: MemberType.USER,
                      };
                      setMembers(prevState => ({ ...prevState, spectators: newSpectators }));
                    }
                  }
                }}
                maxUsersSelection={1}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
