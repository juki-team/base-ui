import {
  isSubmissionRunStatusMessageWebSocketResponseEventDTO,
  SubmissionRunStatus,
  SubmissionRunStatusWebSocketResponseEventDTO,
  type SubmissionSummaryListResponseDTO,
  SubscribeSubmissionRunStatusWebSocketEventDTO,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { useState } from 'react';
import { JUKI_SERVICE_V2_URL } from '../../../../constants/settings';
import { useMutate } from '../../../hooks/useMutate';
import { useSubscribe } from '../../../hooks/useSubscribe';
import { SubmissionVerdict } from './SubmissionVerdict';

const priority = (isSample: boolean) => ({
  [SubmissionRunStatus.RECEIVED]: 0,
  [SubmissionRunStatus.COMPILING]: 1,
  [SubmissionRunStatus.COMPILED]: 2,
  [SubmissionRunStatus.COMPILATION_ERROR]: 3,
  [SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES]: 4,
  
  [SubmissionRunStatus.RUNNING_TEST_CASES]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.RUNNING_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.EXECUTED_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.FAILED_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.JUDGING_TEST_CASE]: 5 + (isSample ? 0 : 2),
  
  [SubmissionRunStatus.FETCHING_TEST_CASES]: 6,
  
  [SubmissionRunStatus.GRADING]: 8,
  [SubmissionRunStatus.FAILED]: 9,
  [SubmissionRunStatus.COMPLETED]: 10,
  [SubmissionRunStatus.NONE]: 10,
});

interface SubmissionListenerVerdictProps {
  submit: SubmissionSummaryListResponseDTO,
  className?: string,
}

export const SubmissionListenerVerdict = ({ submit, className }: SubmissionListenerVerdictProps) => {
  
  const { points, status, verdict, submitId, processedCases } = submit;
  
  const mutate = useMutate();
  const [ submissionData, setSubmissionData ] = useState<SubmissionRunStatusWebSocketResponseEventDTO | undefined>(undefined);
  
  const event: Omit<SubscribeSubmissionRunStatusWebSocketEventDTO, 'clientId'> = {
    event: WebSocketSubscriptionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
    submitId,
  };
  useSubscribe(
    event,
    (data) => {
      if (isSubmissionRunStatusMessageWebSocketResponseEventDTO(data)) {
        if (data.status === SubmissionRunStatus.COMPLETED || data.status === SubmissionRunStatus.RECEIVED) {
          void mutate(new RegExp(`${JUKI_SERVICE_V2_URL}/submission`));
        }
        const nextStatus = data.status;
        const nextSampleCase = !!data.testInfo?.sampleCase;
        setSubmissionData((prevState) => {
          if (!prevState || nextStatus === SubmissionRunStatus.RECEIVED) {
            return data;
          }
          const currentStatus = prevState?.status;
          const currentSampleCase = !!prevState?.testInfo?.sampleCase;
          
          if (
            currentStatus &&
            (
              priority(nextSampleCase)[nextStatus] > priority(currentSampleCase)[currentStatus]
              || (priority(nextSampleCase)[nextStatus] === priority(currentSampleCase)[currentStatus] && data.messageTimestamp > prevState.messageTimestamp)
            )
          ) {
            return data;
          }
          
          return prevState;
        });
      }
    },
  );
  
  return (
    <SubmissionVerdict
      verdict={verdict}
      points={points}
      status={status}
      submitId={submitId}
      submissionData={submissionData}
      processedCases={processedCases}
      className={className}
    />
  );
};
