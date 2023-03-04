import React, { cloneElement, ReactElement } from 'react';
import { useJukiUI } from '../../hooks';
import { UserChipProps } from './types';

export const UserChip = ({ imageUrl, email, familyName, nickname, givenName }: UserChipProps) => {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <div className="jk-row nowrap center gap">
      <Image src={imageUrl} className="jk-user-profile-img huge" alt={nickname} height={50} width={50} />
      <div className="jk-col">
        <div>{givenName} {familyName}</div>
        <UserNicknameLink nickname={nickname}>
          <div className="link">{nickname}</div>
        </UserNicknameLink>
        <div>{email}</div>
      </div>
    </div>
  );
};

export enum SearchParamKey {
  USER_PREVIEW = 'user_preview',
}

export const UserNicknameLink = ({ children, nickname }: { nickname: string, children: ReactElement }) => {
  const { router: { setSearchParam } } = useJukiUI();
  return cloneElement(children, { onClick: () => setSearchParam({ name: SearchParamKey.USER_PREVIEW, value: nickname }) });
};

export * from './types';
