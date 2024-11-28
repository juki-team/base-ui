import React from 'react';
import { useJukiRouter } from '../../../hooks';
import { jukiAppRotes } from '../../../settings';
import { QueryParamKey } from '../../../types';
import { UserPreviewContentModal } from './UserPreviewContentModal';

export const UserPreviewModal = () => {
  
  const { searchParams, deleteSearchParams } = useJukiRouter();
  const userPreviewQuery = searchParams.getAll(QueryParamKey.USER_PREVIEW);
  const [ userPreviewNickname, userPreviewCompanyKey ] = Array.isArray(userPreviewQuery) ? userPreviewQuery as unknown as [ string, string ] : [ userPreviewQuery as string ];
  
  return (
    <UserPreviewContentModal
      isOpen={!!searchParams.get(QueryParamKey.USER_PREVIEW)}
      nickname={userPreviewNickname}
      companyKey={userPreviewCompanyKey}
      onClose={() => deleteSearchParams({ name: QueryParamKey.USER_PREVIEW })}
      userHref={jukiAppRotes.JUDGE().profiles.view({ nickname: userPreviewNickname })}
    />
  );
};
