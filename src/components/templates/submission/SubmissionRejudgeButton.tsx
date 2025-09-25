import { cleanRequest, type ContentResponseType, Status, SubmissionRunStatus } from '@juki-team/commons';
import { authorizedRequest } from '../../../helpers';
import { jukiApiManager } from '../../../settings';
import { T } from '../../atoms';
import { RefreshIcon } from '../../atoms/server';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useMutate } from '../../hooks/useMutate';
import { ButtonLoader } from '../../molecules';
import type { ButtonLoaderOnClickType } from '../../types';
import type { SubmissionRejudgeButtonProps } from './types';

export const SubmissionRejudgeButton = ({ submissionId }: SubmissionRejudgeButtonProps) => {
  
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const rejudgeSubmission = (submissionId: string): ButtonLoaderOnClickType => async (setLoaderStatus) => {
    setLoaderStatus(Status.LOADING);
    
    const { url, ...options } = jukiApiManager.API_V1.submission.rejudge({ params: { id: submissionId } });
    const response = cleanRequest<ContentResponseType<{ listCount: number, status: SubmissionRunStatus.RECEIVED }>>(
      await authorizedRequest(url, options));
    notifyResponse(response, setLoaderStatus);
  };
  
  return (
    <ButtonLoader
      onClick={async (...props) => {
        await rejudgeSubmission(submissionId)(...props);
        await mutate(new RegExp(`${jukiApiManager.SERVICE_API_V1_URL}/submission`, 'g'));
      }}
      size="tiny"
      icon={<RefreshIcon />}
      type="light"
    >
      <T className="tt-se">rejudge</T>
    </ButtonLoader>
  );
};
