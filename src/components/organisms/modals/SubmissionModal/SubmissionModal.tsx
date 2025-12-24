import { QueryParamKey } from '../../../../enums';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { SubmissionContentModal } from './SubmissionContentModal';

export function SubmissionModal() {
  
  const searchParams = useRouterStore(state => state.searchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  
  return (
    <SubmissionContentModal
      submitId={searchParams.get(QueryParamKey.SUBMISSION) as string}
      isOpen={!!searchParams.get(QueryParamKey.SUBMISSION)}
      onClose={() => deleteSearchParams({ name: QueryParamKey.SUBMISSION })}
    />
  );
}
