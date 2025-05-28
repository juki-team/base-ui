import { ContentResponseType, Status, SubmissionRunStatus } from '@juki-team/commons';
import React from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification, useMutate } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { T } from '../../atoms';
import { RefreshIcon } from '../../atoms/server';
import { ButtonLoader } from '../../molecules';
import { ButtonLoaderOnClickType } from '../../molecules/ButtonLoader/types';
import { SubmissionRejudgeButtonProps } from './types';

export const SubmissionRejudgeButton = ({ submissionId }: SubmissionRejudgeButtonProps) => {
  
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const rejudgeSubmission = (submissionId: string): ButtonLoaderOnClickType => async (setLoaderStatus) => {
    setLoaderStatus(Status.LOADING);
    
    const { url, ...options } = jukiApiSocketManager.API_V1.submission.rejudge({ params: { id: submissionId } });
    const response = cleanRequest<ContentResponseType<{ listCount: number, status: SubmissionRunStatus.RECEIVED }>>(
      await authorizedRequest(url, options));
    notifyResponse(response, setLoaderStatus);
  };
  
  return (
    <ButtonLoader
      onClick={async (...props) => {
        await rejudgeSubmission(submissionId)(...props);
        await mutate(new RegExp(`${jukiApiSocketManager.SERVICE_API_V1_URL}/submission`, 'g'));
      }}
      size="tiny"
      icon={<RefreshIcon />}
      type="light"
    >
      <T className="tt-se">rejudge</T>
    </ButtonLoader>
  );
};
