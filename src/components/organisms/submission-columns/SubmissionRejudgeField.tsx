import {
  ContentResponseType,
  Status,
  SubmissionRunStatus,
  SubmissionSummaryListResponseDTO,
} from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification, useSWR } from '../../../hooks';
import { ReloadIcon, T } from '../../atoms';
import { ButtonLoader, ButtonLoaderOnClickType } from '../../molecules';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const RejudgeButton = ({ submissionId }: { submissionId: string }) => {
  
  const { notifyResponse } = useJukiNotification();
  const { matchMutate } = useSWR();
  const rejudgeSubmission = (submissionId: string): ButtonLoaderOnClickType => async (setLoaderStatus, loaderStatus, event) => {
    setLoaderStatus(Status.LOADING);
    const { url, ...options } = jukiSettings.API.submission.rejudge({ params: { id: submissionId } });
    const response = cleanRequest<ContentResponseType<{ listCount: number, status: SubmissionRunStatus.RECEIVED }>>(
      await authorizedRequest(url, options));
    notifyResponse(response, setLoaderStatus);
  };
  
  return (
    <ButtonLoader
      onClick={async (...props) => {
        await rejudgeSubmission(submissionId)(...props);
        await matchMutate(new RegExp(`^${jukiSettings.SERVICE_API_URL}/submission`, 'g'));
      }}
      size="tiny"
      icon={<ReloadIcon />}
    >
      <T>rejudge</T>
    </ButtonLoader>
  );
};

export const getSubmissionRejudgeHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'actions',
  index: 'actions',
  Field: ({ record: { submitId }, isCard }) => (
    <Field>
      <div className="jk-col nowrap extend" style={{ padding: '4px 0', boxSizing: 'border-box' }}>
        <RejudgeButton submissionId={submitId} />
      </div>
    </Field>
  ),
  cardPosition: 'bottom',
  minWidth: 160,
});
