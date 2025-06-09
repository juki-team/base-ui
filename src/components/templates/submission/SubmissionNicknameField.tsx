import React from 'react';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useUserStore } from '../../../stores/user/useUserStore';
import { TextField } from '../../organisms/DataViewer/TextField';
import { UserNicknameLink } from '../../organisms/UserChip/UserNicknameLink';
import { SubmissionNicknameFieldProps } from './types';

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
    <TextField
      className="gap"
      text={
        <>
          <Image src={imageUrl} className="jk-user-profile-img large" alt={nickname} height={36} width={36} />
          <UserNicknameLink nickname={nickname} companyKey={companyKey}>
            <div className="jk-col">
              <div className="link">{nickname}</div>
              {key !== companyKey && (
                <div className="jk-tag info tx-t" style={{ padding: '1px 2px' }}>{companyKey}</div>
              )}
            </div>
          </UserNicknameLink>
        </>
      }
      label="user nickname"
    />
  );
};
