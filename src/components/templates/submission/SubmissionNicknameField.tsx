import { useUserStore } from '../../../stores/user/useUserStore';

import { useJukiUI } from '../../hooks/useJukiUI';
import { FieldText } from '../../organisms/FieldText/FieldText';
import { UserNicknameLink } from '../../organisms/UserNicknameLink/UserNicknameLink';
import type { SubmissionNicknameFieldProps } from './types';

export const SubmissionNicknameField = ({
                                          record: {
                                            user: {
                                              imageUrl,
                                              nickname,
                                              company: { key: companyKey },
                                            },
                                          },
                                        }: SubmissionNicknameFieldProps) => {
  
  const { components: { Image } } = useJukiUI();
  const key = useUserStore(state => state.company.key);
  
  return (
    <FieldText
      className="gap"
      text={
        <>
          <Image src={imageUrl} className="jk-user-profile-img large" alt={nickname} height={36} width={36} />
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            <div className="jk-col">
              <div className="link">{nickname}</div>
              {key !== companyKey && (
                <div className="jk-tag bc-io tx-t" style={{ padding: '1px 2px' }}>{companyKey}</div>
              )}
            </div>
          </UserNicknameLink>
        </>
      }
      label="user nickname"
    />
  );
};
