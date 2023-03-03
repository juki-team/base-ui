import React from 'react';
import { UserChipProps } from './types';

export const UserChip = ({ imageUrl, email, familyName, nickname, givenName }: UserChipProps) => {
  
  return (
    <div className="jk-row nowrap center gap">
      {/*<ImageCmp src={imageUrl} className="jk-user-profile-img huge" alt={nickname} height={50} width={50} />*/}
      {/*<div className="jk-col">*/}
      {/*  <div>{givenName} {familyName}</div>*/}
      {/*  <UserNicknameLink nickname={nickname}>*/}
      {/*    <div className="link">{nickname}</div>*/}
      {/*  </UserNicknameLink>*/}
      {/*  <div>{email}</div>*/}
      {/*</div>*/}
    </div>
  );
};

export * from './types';
