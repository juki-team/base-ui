import { ENTITY_ACCESS, EntityAccess, EntityMembersRank, getDocumentAccess } from '@juki-team/commons';
import React from 'react';
import { Select, T } from '../../atoms';
import { GlobeIcon, LockIcon, LockPersonIcon, PublicIcon } from '../../server';
import { DocumentCustomMembersContent } from './DocumentCustomMembersContent';
import { DocumentMembersContentProps } from './types';

const FileAccessIcons = {
  [EntityAccess.PRIVATE]: <LockIcon />,
  [EntityAccess.RESTRICTED]: <LockPersonIcon />,
  [EntityAccess.PUBLIC]: <PublicIcon />,
  [EntityAccess.EXPOSED]: <GlobeIcon />,
};

export const DocumentMembersContent = (props: DocumentMembersContentProps) => {
  
  const { members, setMembers, documentOwner, administrators, managers, participants, guests, spectators } = props;
  
  const documentAccess = getDocumentAccess({ members });
  
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
            selectedOption={{ value: documentAccess }}
            expand
            onChange={setMembers ? ({ value }) => {
              setMembers(prevState => {
                const currentMembers = { ...prevState };
                currentMembers.rankAdministrators = administrators?.closeable ? EntityMembersRank.CLOSE : EntityMembersRank.NONE;
                currentMembers.rankGuests = guests?.closeable
                  ? (currentMembers.rankGuests === EntityMembersRank.CLOSE ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN)
                  : EntityMembersRank.NONE;
                currentMembers.rankParticipants = participants?.closeable
                  ? (currentMembers.rankParticipants === EntityMembersRank.CLOSE ? EntityMembersRank.CLOSE : EntityMembersRank.OPEN)
                  : EntityMembersRank.NONE;
                switch (value) {
                  case EntityAccess.EXPOSED:
                    currentMembers.rankManagers = EntityMembersRank.OPEN;
                    currentMembers.rankSpectators = EntityMembersRank.OPEN;
                    break;
                  case EntityAccess.PUBLIC:
                    currentMembers.rankManagers = EntityMembersRank.CLOSE;
                    currentMembers.rankSpectators = EntityMembersRank.OPEN;
                    // for (const userId of managersIds) {
                    //   managers[userId] = {
                    //     joinedAtTimestamp: members.managers?.[userId]?.joinedAtTimestamp ?? now,
                    //     lastVisitTimestamp: members.managers?.[userId]?.lastVisitTimestamp ?? null,
                    //     userId,
                    //   };
                    // }
                    break;
                  case EntityAccess.RESTRICTED:
                    currentMembers.rankManagers = EntityMembersRank.CLOSE;
                    currentMembers.rankSpectators = EntityMembersRank.CLOSE;
                    // for (const userId of managersIds) {
                    //   managers[userId] = {
                    //     joinedAtTimestamp: members.managers?.[userId]?.joinedAtTimestamp ?? now,
                    //     lastVisitTimestamp: members.managers?.[userId]?.lastVisitTimestamp ?? null,
                    //     userId,
                    //   };
                    // }
                    // for (const userId of spectatorsIds) {
                    //   spectators[userId] = {
                    //     joinedAtTimestamp: members.spectators?.[userId]?.joinedAtTimestamp ?? now,
                    //     lastVisitTimestamp: members.spectators?.[userId]?.lastVisitTimestamp ?? null,
                    //     userId,
                    //   };
                    // }
                    break;
                  case EntityAccess.PRIVATE:
                    currentMembers.rankAdministrators = EntityMembersRank.NONE;
                    currentMembers.rankManagers = EntityMembersRank.NONE; // <-
                    currentMembers.rankGuests = EntityMembersRank.NONE;
                    currentMembers.rankSpectators = EntityMembersRank.NONE; // <-
                    currentMembers.rankParticipants = EntityMembersRank.NONE;
                }
                return currentMembers;
              });
            } : undefined}
          />
        </div>
      </div>
      <DocumentCustomMembersContent
        members={members}
        setMembers={setMembers}
        documentOwner={documentOwner}
        administrators={administrators}
        managers={managers}
        participants={participants}
        guests={guests}
        spectators={spectators}
        key="members"
      />
      {/*{(documentAccess === EntityAccess.RESTRICTED || documentAccess === EntityAccess.PUBLIC) && (*/}
      {/*  <>*/}
      {/*    <div className="jk-col stretch extend gap">*/}
      {/*      <T className="fw-bd tt-se">people with access</T>*/}
      {/*      <div className="jk-row gap space-between extend hover-highlight gap-full-borders jk-br-ie">*/}
      {/*        <UserChip*/}
      {/*          imageUrl={documentOwner.imageUrl}*/}
      {/*          nickname={documentOwner.nickname}*/}
      {/*          // givenName={documentOwner.givenName}*/}
      {/*          // familyName={documentOwner.familyName}*/}
      {/*          className="flex-1"*/}
      {/*        />*/}
      {/*        <Select options={[ { value: 'owner', label: <T>owner</T> } ]} selectedOption={{ value: 'owner' }} />*/}
      {/*      </div>*/}
      {/*      {[*/}
      {/*        ...Object.values(members.managers).map(mem => ({ ...mem, role: FileMemberRole.EDITOR })),*/}
      {/*        ...Object.values(members.spectators).map(mem => ({ ...mem, role: FileMemberRole.VIEWER })),*/}
      {/*      ].map(({ nickname, imageUrl, company, role }) => (*/}
      {/*        <div*/}
      {/*          key={nickname}*/}
      {/*          className="jk-row gap space-between extend hover-highlight gap-full-borders jk-br-ie"*/}
      {/*        >*/}
      {/*          <UserChip*/}
      {/*            imageUrl={imageUrl}*/}
      {/*            nickname={nickname}*/}
      {/*            className="flex-1"*/}
      {/*          />*/}
      {/*          <Select<FileMemberRole | 'remove', ReactNode, ReactNode>*/}
      {/*            options={[*/}
      {/*              ...(documentAccess === EntityAccess.RESTRICTED ? [ {*/}
      {/*                value: FileMemberRole.VIEWER,*/}
      {/*                label: <T>viewer</T>,*/}
      {/*              } ] : []),*/}
      {/*              { value: FileMemberRole.EDITOR, label: <T>editor</T> },*/}
      {/*            ]}*/}
      {/*            selectedOption={{ value: role }}*/}
      {/*            onChange={setMembers ? ({ value }) => {*/}
      {/*              const { [nickname]: _1, ...newManagers } = members.managers;*/}
      {/*              const { [nickname]: _2, ...newSpectators } = members.spectators;*/}
      {/*              if (value === FileMemberRole.EDITOR) {*/}
      {/*                newManagers[nickname] = { nickname, imageUrl, company, type: MemberType.USER };*/}
      {/*              } else {*/}
      {/*                newSpectators[nickname] = { nickname, imageUrl, company, type: MemberType.USER };*/}
      {/*              }*/}
      {/*              setMembers(prevState => ({ ...prevState, managers: newManagers, spectators: newSpectators }));*/}
      {/*            } : undefined}*/}
      {/*          />*/}
      {/*          {setMembers && (*/}
      {/*            <Button*/}
      {/*              onClick={() => {*/}
      {/*                const { [nickname]: _1, ...newManagers } = members.managers;*/}
      {/*                const { [nickname]: _2, ...newSpectators } = members.spectators;*/}
      {/*                setMembers(prevState => ({ ...prevState, managers: newManagers, spectators: newSpectators }));*/}
      {/*              }}*/}
      {/*              icon={*/}
      {/*                <div data-tooltip-id="jk-tooltip" data-tooltip-content="remove access"><DeleteIcon /></div>*/}
      {/*              }*/}
      {/*              size="small"*/}
      {/*              type="light"*/}
      {/*            />*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    {setMembers && (*/}
      {/*      <div>*/}
      {/*        <T className="fw-bd tt-se">add people</T>*/}
      {/*        <UsersSelector*/}
      {/*          companyKey={companyKey}*/}
      {/*          selectedUsers={[]}*/}
      {/*          onChangeSelectedUsers={([ user ]) => {*/}
      {/*            if (user && !members.managers[user.nickname] && !members.spectators[user.nickname]) {*/}
      {/*              const role = documentAccess === EntityAccess.PUBLIC ? FileMemberRole.EDITOR : FileMemberRole.VIEWER;*/}
      {/*              if (role === FileMemberRole.EDITOR) {*/}
      {/*                const newManagers = { ...members.managers };*/}
      {/*                newManagers[user.nickname] = {*/}
      {/*                  nickname: user.nickname,*/}
      {/*                  imageUrl: user.imageUrl,*/}
      {/*                  company: user.company,*/}
      {/*                  type: MemberType.USER,*/}
      {/*                };*/}
      {/*                setMembers(prevState => ({ ...prevState, managers: newManagers }));*/}
      {/*              } else {*/}
      {/*                const newSpectators = { ...members.spectators };*/}
      {/*                newSpectators[user.nickname] = {*/}
      {/*                  nickname: user.nickname,*/}
      {/*                  imageUrl: user.imageUrl,*/}
      {/*                  company: user.company,*/}
      {/*                  type: MemberType.USER,*/}
      {/*                };*/}
      {/*                setMembers(prevState => ({ ...prevState, spectators: newSpectators }));*/}
      {/*              }*/}
      {/*            }*/}
      {/*          }}*/}
      {/*          maxUsersSelection={1}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};
