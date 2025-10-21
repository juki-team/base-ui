import {
  isSubmissionRunStatusMessageWebSocketResponseEventDTO,
  PROBLEM_VERDICT,
  ProblemVerdict,
  SubmissionRunStatus,
  SubmissionRunStatusWebSocketResponseEventDTO,
  type SubmissionSummaryListResponseDTO,
  SubscribeSubmissionRunStatusWebSocketEventDTO,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { T } from 'components/atoms';
import { useEffect, useRef, useState } from 'react';
import { JUKI_SERVICE_V2_URL } from '../../../../../constants/settings';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { useWebsocketStore } from '../../../../../stores/websocket/useWebsocketStore';
import { useCheckAndStartServices } from '../../../../hooks/useCheckAndStartServices';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { useMutate } from '../../../../hooks/useMutate';
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
}

export const SubmissionListenerVerdict = ({ submit }: SubmissionListenerVerdictProps) => {
  
  const { contest, problem, points, status, verdict, submitId, processedCases, user } = submit;
  
  useCheckAndStartServices();
  
  const sessionId = useUserStore(state => state.user.sessionId);
  const mutate = useMutate();
  const [ submissionData, setSubmissionData ] = useState<SubmissionRunStatusWebSocketResponseEventDTO | undefined>(undefined);
  const { addSuccessNotification, addErrorNotification } = useJukiNotification();
  
  const notifiedRef = useRef(false);
  
  useEffect(() => {
    if (!notifiedRef.current && submissionData && submissionData?.verdict && submissionData?.verdict !== ProblemVerdict.PENDING && user.canViewSourceCode) {
      notifiedRef.current = true;
      const verdict = submissionData.verdict;
      const points = submissionData?.points || 0;
      const header = contest ?
        <div className="jk-col tx-s">
          <div><T className="tt-se">contest</T>: {contest.name}</div>
          <div>({contest.problemIndex}) {problem.name}</div>
        </div>
        : <div className="tx-s">{problem.name}</div>;
      if (verdict === ProblemVerdict.AC) {
        addSuccessNotification(
          <div className="jk-col">
            {header}
            <T className="tt-ce">{PROBLEM_VERDICT[ProblemVerdict.AC].label}</T>
          </div>,
          contest?.isFrozen || contest?.isQuiet,
        );
      } else if (verdict === ProblemVerdict.PA) {
        addSuccessNotification(
          <div className="jk-col">
            {header}
            <div>
              <T className="tt-ce">{PROBLEM_VERDICT[ProblemVerdict.PA].label}</T>
              &bnsp;
              ({points} <T>pts.</T>)
            </div>
          </div>,
          contest?.isFrozen || contest?.isQuiet,
        );
      } else if (Object.keys(PROBLEM_VERDICT).includes(verdict)) {
        addErrorNotification(
          <div className="jk-col">
            {header}
            <T className="tt-ce">{PROBLEM_VERDICT[verdict].label}</T>
          </div>,
          contest?.isFrozen || contest?.isQuiet,
        );
      } else {
        addErrorNotification(
          <div className="jk-col">
            {header}
            {verdict}
          </div>,
          contest?.isFrozen || contest?.isQuiet,
        );
      }
    }
  }, [ addErrorNotification, addSuccessNotification, contest, problem.name, submissionData, user.canViewSourceCode ]);
  
  const subscribeToEvent = useWebsocketStore(store => store.subscribeToEvent);
  
  useEffect(() => {
    const event: SubscribeSubmissionRunStatusWebSocketEventDTO = {
      event: WebSocketSubscriptionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
      sessionId,
      submitId,
    };
    return subscribeToEvent(event, (message) => {
      const data = message.data;
      if (isSubmissionRunStatusMessageWebSocketResponseEventDTO(data)) {
        if (data.status === SubmissionRunStatus.COMPLETED || data.status === SubmissionRunStatus.RECEIVED) {
          void mutate(new RegExp(`${JUKI_SERVICE_V2_URL}/submission`, 'g'));
        }
        const nextStatus = data.status;
        const nextSampleCase = !!data.testInfo?.sampleCase;
        setSubmissionData((prevState) => {
          if (!prevState || nextStatus === SubmissionRunStatus.RECEIVED) {
            notifiedRef.current = false;
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
  }, [ mutate, sessionId, submitId, subscribeToEvent ]);
  
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
