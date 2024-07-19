import React, { PropsWithChildren } from 'react';
import { classNames } from '../../../helpers';
import { useJukiRouter } from '../../../hooks';
import { QueryParamKey } from '../../../types';


export interface SubmissionInfoProps {
  submitId: string,
  canViewSourceCode: boolean,
}

export const SubmissionInfo = ({ submitId, canViewSourceCode, children }: PropsWithChildren<SubmissionInfoProps>) => {
  
  const { setSearchParams } = useJukiRouter();
  
  return (
    <span
      className={classNames({ link: canViewSourceCode })}
      onClick={() => canViewSourceCode && setSearchParams({ name: QueryParamKey.SUBMISSION, value: submitId })}
    >
      {children}
    </span>
  );
};
