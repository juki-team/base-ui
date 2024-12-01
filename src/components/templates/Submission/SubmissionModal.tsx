import React from 'react';
import { useJukiRouter } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { SubmissionContentModal } from './SubmissionContentModal';

export const SubmissionModal = () => {
  
  const { searchParams, deleteSearchParams } = useJukiRouter();
  
  return (
    <SubmissionContentModal
      submitId={searchParams.get(QueryParamKey.SUBMISSION) as string}
      isOpen={!!searchParams.get(QueryParamKey.SUBMISSION)}
      onClose={() => deleteSearchParams({ name: QueryParamKey.SUBMISSION })}
    />
  );
};
