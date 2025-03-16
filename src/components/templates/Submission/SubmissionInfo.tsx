import React, { PropsWithChildren } from 'react';
import { classNames } from '../../../helpers';
import { useRouterStore } from '../../../hooks';
import { QueryParamKey } from '../../../types';

export interface SubmissionInfoProps {
  submitId: string,
  canViewSourceCode: boolean,
}

export const SubmissionInfo = ({ submitId, canViewSourceCode, children }: PropsWithChildren<SubmissionInfoProps>) => {
  
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  
  return (
    <span
      className={classNames({ link: canViewSourceCode })}
      onClick={() => canViewSourceCode && setSearchParams({ name: QueryParamKey.SUBMISSION, value: submitId })}
    >
      {children}
    </span>
  );
};
