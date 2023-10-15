import React, { cloneElement, ReactElement } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { UserChipProps } from './types';

export const UserChip = ({ imageUrl, email, familyName, nickname, givenName, className }: UserChipProps) => {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <div className={classNames('jk-row nowrap center jk-pg-sm-tb', className)}>
      <Image src={imageUrl} className="jk-user-profile-img huge" alt={nickname} height={50} width={50} />
      <div className="jk-col flex-1" style={{ lineHeight: 1.2 }}>
        <UserNicknameLink nickname={nickname}>
          <div className="link fw-bd">{nickname}</div>
        </UserNicknameLink>
        {(!!givenName || !!familyName) && <div className="fw-lar">{givenName} {familyName}</div>}
        {!!email && <div className="fw-lr">{email}</div>}
      </div>
    </div>
  );
};

export const UserNicknameLink = ({ children, nickname }: { nickname: string, children: ReactElement }) => {
  const { router: { setSearchParams } } = useJukiUI();
  return cloneElement(
    children,
    { onClick: () => setSearchParams({ name: QueryParamKey.USER_PREVIEW, value: nickname }) },
  );
};

export * from './types';