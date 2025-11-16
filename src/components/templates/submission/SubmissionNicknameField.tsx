import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { FieldText, UserNicknameLink } from '../../organisms';
import type { SubmissionNicknameFieldProps } from './types';

export function SubmissionNicknameField({
                                          record: {
                                            user: {
                                              imageUrl,
                                              nickname,
                                              company: { key: companyKey },
                                            },
                                          },
                                        }: SubmissionNicknameFieldProps) {
  
  const { Image } = useUIStore(store => store.components);
  const key = useUserStore(state => state.company.key);
  
  return (
    <FieldText
      className="gap"
      text={
        <>
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            <Image src={imageUrl} className="jk-user-profile-img large" alt={nickname} height={36} width={36} />
          </UserNicknameLink>
          <div className="jk-col">
            <UserNicknameLink nickname={nickname} companyKey={companyKey}>
              <div className="link">{nickname}</div>
            </UserNicknameLink>
            {key !== companyKey && (
              <div className="jk-tag bc-io tx-t" style={{ padding: '1px 2px' }}>{companyKey}</div>
            )}
          </div>
        </>
      }
      label="user nickname"
    />
  );
}
