import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUI, useUserStore } from '../../../hooks';
import { OptionType } from '../../molecules/types';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { UserNicknameLink } from '../UserChip';

export const SubmissionNicknameField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = ({ record: { user: { imageUrl, nickname, company: { key: companyKey } } }, isCard }) => {
  
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

export const getSubmissionNicknameHeader = (options: OptionType<string>[] | void): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'nickname',
  index: 'nicknames',
  Field: SubmissionNicknameField,
  sort: true,
  filter: options ? { type: 'select', options } : { type: 'text' },
  cardPosition: 'top',
  minWidth: 250,
});
