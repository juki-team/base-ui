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

export function UserChip(props: UserChipProps) {
  
  const { imageUrl, email, familyName, nickname, givenName, className, companyKey, withoutLink } = props;
  
  const { Image } = useUIStore(store => store.components);
  const userCompanyKey = useUserStore(store => store.company.key);
  
  const onlyNickname = !givenName && !familyName && !email;
  
  const image = (
    <Image
      src={imageUrl}
      className={classNames('jk-user-profile-img ', { huge: !onlyNickname })}
      alt={nickname}
      height={onlyNickname ? 24 : 50}
      width={onlyNickname ? 24 : 50}
    />
  );
  
  return (
    <div className={classNames('jk-row nowrap center', className)}>
      {withoutLink
        ? image
        : (
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            {image}
          </UserNicknameLink>
        )}
      &nbsp;
      <div className="jk-col flex-1">
        {withoutLink ? (
          <div className="fw-bd">{nickname}</div>
        ) : (
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            <div className="link fw-bd ">{nickname}</div>
          </UserNicknameLink>
        )}
        {(!!givenName || !!familyName) && <div className="fw-lr ta-cr">{givenName} {familyName}</div>}
        {!!email && <div className="fw-lr">{email}</div>}
        {userCompanyKey !== companyKey && (
          <div className="jk-tag bc-hl tx-t" style={{ padding: '1px 2px' }}>{companyKey}</div>
        )}
      </div>
    </div>
  );
}
