import {
  ContentResponseType,
  Status,
  SubmissionRunStatus,
  SubmissionSummaryListResponseDTO,
} from '@juki-team/commons';
import React from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification, useSWR } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { ReloadIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { ButtonLoaderOnClickType } from '../../molecules/types';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const SubmissionRejudgeButton = ({ submissionId }: { submissionId: string }) => {
  
  const { notifyResponse } = useJukiNotification();
  const { matchMutate } = useSWR();
  const rejudgeSubmission = (submissionId: string): ButtonLoaderOnClickType => async (setLoaderStatus, loaderStatus, event) => {
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
        await matchMutate(new RegExp(`${jukiApiSocketManager.SERVICE_API_V1_URL}/submission`, 'g'));
      }}
      size="tiny"
      icon={<ReloadIcon />}
      type="light"
    >
      <T>rejudge</T>
    </ButtonLoader>
  );
};

export const getSubmissionRejudgeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'rejudge',
  index: 'rejudge',
  Field: ({ record: { submitId }, isCard }) => (
    <Field>
      <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
        <SubmissionRejudgeButton submissionId={submitId} />
      </div>
    </Field>
  ),
  cardPosition: 'bottom',
  minWidth: 180,
});
