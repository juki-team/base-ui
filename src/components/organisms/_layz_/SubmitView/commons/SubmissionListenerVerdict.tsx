import {
  isSubmissionRunStatusMessageWebSocketResponseEventDTO,
  type SubmissionDataResponseDTO,
  SubmissionRunStatus,
  SubmissionRunStatusWebSocketResponseEventDTO,
  SubscribeSubmissionRunStatusWebSocketEventDTO,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { useState } from 'react';
import { JUKI_SERVICE_V2_URL } from '../../../../../constants/settings';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { useCheckAndStartServices } from '../../../../hooks/useCheckAndStartServices';
import { useMutate } from '../../../../hooks/useMutate';
import { useWebsocketSub } from '../../../../hooks/UseWebsocketSub';
import { SubmissionVerdict, type SubmissionVerdictProps } from './SubmissionVerdict';

export interface ListenerVerdictProps extends Omit<SubmissionVerdictProps, 'submissionData'> {
  processedCases?: SubmissionDataResponseDTO['processedCases'],
}

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

export const SubmissionListenerVerdict = ({
                                            verdict,
                                            points,
                                            status,
                                            submitId,
                                            processedCases,
                                          }: ListenerVerdictProps) => {
  
  useCheckAndStartServices();
  
  const sessionId = useUserStore(state => state.user.sessionId);
  const mutate = useMutate();
  const [ submissionData, setSubmissionData ] = useState<SubmissionRunStatusWebSocketResponseEventDTO | undefined>(undefined);
  
  const event: SubscribeSubmissionRunStatusWebSocketEventDTO = {
    event: WebSocketSubscriptionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
    sessionId,
    submitId,
  };
  
  useWebsocketSub(event, (message) => {
    const data = message.data;
    if (isSubmissionRunStatusMessageWebSocketResponseEventDTO(data)) {
      if (data.status === SubmissionRunStatus.COMPLETED || data.status === SubmissionRunStatus.RECEIVED) {
        void mutate(new RegExp(`${JUKI_SERVICE_V2_URL}/submission`, 'g'));
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
  });
  
  return (
    <SubmissionVerdict
      verdict={verdict}
      points={points}
      status={status}
      submitId={submitId}
      submissionData={submissionData}
      processedCases={processedCases}
    />
  );
};
