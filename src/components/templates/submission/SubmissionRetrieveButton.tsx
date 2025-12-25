import { cleanRequest, type ContentResponseType, Status, SubmissionRunStatus } from '@juki-team/commons';
import { JUKI_SERVICE_V2_URL } from '../../../constants/settings';
import { jukiApiManager } from '../../../settings';
import { T } from '../../atoms';
import { RefreshIcon } from '../../atoms/server';
import { authorizedRequest } from '../../helpers';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useMutate } from '../../hooks/useMutate';
import { ButtonLoader } from '../../molecules';
import type { ButtonLoaderOnClickType } from '../../types';
import type { SubmissionRetrieveButtonProps } from './types';

export function SubmissionRetrieveButton({ submissionId }: SubmissionRetrieveButtonProps) {
  
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const rejudgeSubmission = (submissionId: string): ButtonLoaderOnClickType => async (setLoaderStatus) => {
    setLoaderStatus(Status.LOADING);
    
    const { url, ...options } = jukiApiManager.API_V2.submission.retrieve({ params: { id: submissionId } });
    const response = cleanRequest<ContentResponseType<{ listCount: number, status: SubmissionRunStatus.RECEIVED }>>(
      await authorizedRequest(url, options));
    notifyResponse(response, setLoaderStatus);
  };
  
  return (
    <ButtonLoader
      onClick={async (...props) => {
        await rejudgeSubmission(submissionId)(...props);
        await mutate(new RegExp(`${JUKI_SERVICE_V2_URL}/submission`));
      }}
      size="tiny"
      icon={<RefreshIcon />}
      type="light"
    >
      <T className="tt-se">retrieve</T>
    </ButtonLoader>
  );
}
