import { Status, type SubmissionRunStatus } from '@juki-team/commons/enums';
import { cleanRequest } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { JUKI_SERVICE_V2_URL } from '../../../constants/settings';
import { jukiApiManager } from '../../../settings';
import { T } from '../../atoms';
import { RefreshIcon } from '../../atoms/server';
import { authorizedRequest } from '../../helpers/fetch';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useMatchMutate } from '../../hooks/useMatchMutate';
import { ButtonLoader } from '../../molecules';
import type { ButtonLoaderOnClickType } from '../../types';
import type { SubmissionRetrieveButtonProps } from './types';

export function SubmissionRetrieveButton({ submissionId }: SubmissionRetrieveButtonProps) {
  const { notifyResponse } = useJukiNotification();
  const mutate = useMatchMutate();
  const rejudgeSubmission =
    (submissionId: string): ButtonLoaderOnClickType =>
    async (setLoaderStatus) => {
      setLoaderStatus(Status.LOADING);

      const { url, ...options } = jukiApiManager.apiV2.submission.retrieve({ params: { id: submissionId } });
      const response = cleanRequest<ContentResponse<{ listCount: number; status: typeof SubmissionRunStatus.RECEIVED }>>(
        await authorizedRequest(url, options),
      );
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
      type="secondary"
    >
      <T className="tt-se">retrieve</T>
    </ButtonLoader>
  );
}
