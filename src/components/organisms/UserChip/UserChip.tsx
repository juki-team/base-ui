import { forwardRef } from 'react';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { classNames } from '../../helpers';
import { UserNicknameLink } from '../UserNicknameLink/UserNicknameLink';
import { UserChipProps, UserMockChipProps } from './types';

export function UserMockChip(props: UserMockChipProps) {
  const { className } = props;

  const nickname = 'nickname';
  const onlyNickname = true;

  return (
    <div className={classNames('jk-row nowrap center fr-4', className)}>
      <div
        className={classNames('jk-user-profile-img bc-bk', { huge: !onlyNickname })}
        style={{
          height: onlyNickname ? 24 : 50,
          width: onlyNickname ? 24 : 50,
        }}
      />
      &nbsp;
      <div className="jk-col flex-1">
        <div className="fw-bd">{nickname}</div>
      </div>
    </div>
  );
}

export const UserChip = forwardRef<HTMLDivElement, UserChipProps>(function UserChipCmp(props, ref) {
  const { imageUrl, email, familyName, nickname, givenName, className, companyKey, withoutLink, children, onlyImage } = props;

  const { Image } = useUIStore((store) => store.components);
  const userCompanyKey = useUserStore((store) => store.company.key);

  const onlyNickname = !givenName && !familyName && !email;

  const image = (
    <span className={classNames('jk-user-profile-img pn-re', { large: !onlyNickname })}>
      <Image src={imageUrl} alt={nickname} fill className="br-50-pc" />
    </span>
  );

  return (
    <div ref={ref} className={classNames('jk-row nowrap center', className)}>
      {withoutLink ? (
        <>
          {image}
          {!onlyImage && (
            <>
              &nbsp;
              <div className="jk-col flex-1">
                <div className="fw-bd">{nickname}</div>
              </div>
            </>
          )}
        </>
      ) : (
        <UserNicknameLink nickname={nickname} companyKey={companyKey}>
          <div className="jk-row nowrap">
            {image}
            {!onlyImage && (
              <>
                &nbsp;
                <div className="jk-col flex-1">
                  <div className="fw-bd">{nickname}</div>
                  {userCompanyKey !== companyKey && (
                    <div className="jk-tag bc-ht-lt tx-t cr-tx-sc" style={{ padding: '1px 2px' }}>
                      {companyKey}
                    </div>
                  )}
                  {(!!givenName || !!familyName) && (
                    <div className="fw-lt ta-cr tx-s" style={{ lineHeight: 1 }}>
                      {givenName} {familyName}
                    </div>
                  )}
                  {!!email && (
                    <div className="fw-lt tx-s" style={{ lineHeight: 1 }}>
                      {email}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </UserNicknameLink>
      )}
      {children}
    </div>
  );
});
