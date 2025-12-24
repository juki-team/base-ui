import { QueryParamKey } from '../../../../enums';
import { jukiAppRoutes } from '../../../../settings';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { UserPreviewContentModal } from './UserPreviewContentModal';

export function UserPreviewModal() {
  
  const searchParams = useRouterStore(state => state.searchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  const userPreviewQuery = searchParams.getAll(QueryParamKey.USER_PREVIEW);
  const companyKey = useUserStore(store => store.company.key);
  const [ userPreviewNickname, userPreviewCompanyKey ] = Array.isArray(userPreviewQuery) ? userPreviewQuery as unknown as [ string, string ] : [ userPreviewQuery as string, companyKey ];
  
  return (
    <UserPreviewContentModal
      isOpen={!!searchParams.get(QueryParamKey.USER_PREVIEW)}
      nickname={userPreviewNickname}
      companyKey={userPreviewCompanyKey}
      onClose={() => deleteSearchParams({ name: QueryParamKey.USER_PREVIEW })}
      userHref={
        jukiAppRoutes.JUDGE().profiles.view({ nickname: userPreviewNickname, companyKey: userPreviewCompanyKey })
      }
    />
  );
}
