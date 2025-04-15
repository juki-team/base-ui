import React, { useEffect } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI, usePreload } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { UserChipProps } from './types';
import { UserNicknameLink } from './UserNicknameLink';

export const UserChip = (props: UserChipProps) => {
  
  const { imageUrl, email, familyName, nickname, givenName, className, companyKey, withoutLink } = props;
  
  const { components: { Image } } = useJukiUI();
  const preload = usePreload();
  
  const onlyNickname = !givenName && !familyName && !email;
  
  useEffect(() => {
    if (!withoutLink) {
      void preload(jukiApiSocketManager.API_V1.user.getSummary({ params: { nickname, companyKey } }).url);
    }
  }, [ companyKey, nickname, preload, withoutLink ]);
  
  return (
    <div className={classNames('jk-row nowrap center', className)}>
      <Image
        src={imageUrl}
        className={classNames('jk-user-profile-img ', { huge: !onlyNickname })}
        alt={nickname}
        height={onlyNickname ? 24 : 50}
        width={onlyNickname ? 24 : 50}
      />
      &nbsp;
      <div className="jk-col flex-1" style={{ lineHeight: 1.2 }}>
        {withoutLink ? (
          <div className="fw-bd ">{nickname}</div>
        ) : (
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            <div className="link fw-bd ">{nickname}</div>
          </UserNicknameLink>
        )}
        {(!!givenName || !!familyName) && <div className="fw-lr ta-cr">{givenName} {familyName}</div>}
        {!!email && <div className="fw-lr">{email}</div>}
      </div>
    </div>
  );
};
