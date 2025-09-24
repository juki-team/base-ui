import {
  isSubmissionRunStatusMessageWebSocketResponseEventDTO,
  PROBLEM_VERDICT,
  ProblemVerdict,
  SubmissionRunStatus,
  SubscribeSubmissionRunStatusWebSocketEventDTO,
  UnsubscribeSubmissionRunStatusWebSocketEventDTO,
  WebSocketActionEvent,
} from '@juki-team/commons';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { T } from '../../components/atoms/T/T';
import { useJukiNotification, useMutate } from '../../hooks';
import { jukiApiManager } from '../../settings';
import { useUserStore } from '../../stores/user/useUserStore';
import { useWebsocketStore } from '../../stores/websocket/useWebsocketStore';
import { TasksContext } from './context';
import { SocketSubmissions, SubmissionToCheck } from './types';

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

export const JukiTasksProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const { addErrorNotification, addSuccessNotification } = useJukiNotification();
  const [ submissions, setSubmissions ] = useState<SocketSubmissions>({});
  const [ submissionsToCheck, setSubmissionsToCheck ] = useState<SubmissionToCheck[]>([]);
  const userSessionId = useUserStore(state => state.user.sessionId);
  const websocket = useWebsocketStore(store => store.websocket);
  const submissionIdListenerCount = useRef<{ [key: string]: number }>({});
  const mutate = useMutate();
  
  useEffect(() => {
    for (const { id, problem, contest } of submissionsToCheck) {
      const submission = submissions[id];
      const verdict = submission?.verdict || null;
      const points = submission?.points || 0;
      const header = contest ?
        <div className="jk-col">
          <div><T className="tt-se">contest</T>: {contest.name}</div>
          <div>({contest.problemIndex}) {problem.name}</div>
        </div>
        : <div>{problem.name}</div>;
      if (verdict !== null && verdict !== ProblemVerdict.PENDING) {
        if (verdict === ProblemVerdict.AC) {
          addSuccessNotification(
            <div className="jk-col">
              {header}
              <T className="tt-ce">{PROBLEM_VERDICT[ProblemVerdict.AC].label}</T>
            </div>,
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
          );
        } else if (Object.keys(PROBLEM_VERDICT).includes(verdict)) {
          addErrorNotification(
            <div className="jk-col">
              {header}
              <T className="tt-ce">{PROBLEM_VERDICT[verdict].label}</T>
            </div>,
          );
        } else {
          addErrorNotification(
            <div className="jk-col">
              {header}
              {verdict}
            </div>,
          );
        }
        setSubmissionsToCheck(prevState => prevState.filter(({ id: pId }) => pId !== id));
      }
    }
  }, [ submissionsToCheck, submissions, addSuccessNotification, addErrorNotification ]);
  
  const unListenSubmission = useCallback((submissionId: string) => {
    if (!submissionIdListenerCount.current[submissionId]) {
      const event: UnsubscribeSubmissionRunStatusWebSocketEventDTO = {
        event: WebSocketActionEvent.UNSUBSCRIBE_SUBMISSION_RUN_STATUS,
        sessionId: userSessionId,
        submitId: submissionId,
      };
      websocket.unsubscribeAll(event);
      submissionIdListenerCount.current[submissionId] = 0;
    }
  }, [ userSessionId ]);
  
  const listenSubmission = useCallback((submissionToCheck: SubmissionToCheck, withNotification: boolean) => {
    if (withNotification) {
      setSubmissionsToCheck(prevState => [ ...prevState, submissionToCheck ]);
    }
    const event: SubscribeSubmissionRunStatusWebSocketEventDTO = {
      event: WebSocketActionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
      sessionId: userSessionId,
      submitId: submissionToCheck.id,
    };
    submissionIdListenerCount.current[submissionToCheck.id] = (submissionIdListenerCount.current[submissionToCheck.id] ?? 0) + 1;
    websocket.send(event, (data) => {
      if (isSubmissionRunStatusMessageWebSocketResponseEventDTO(data)) {
        if (data.status === SubmissionRunStatus.COMPLETED || data.status === SubmissionRunStatus.RECEIVED) {
          void mutate(new RegExp(`${jukiApiManager.SERVICE_API_V1_URL}/submission`, 'g'));
        }
        const nextStatus = data.status;
        const nextSampleCase = !!data.testInfo?.sampleCase;
        const submitId = data.submitId;
        setSubmissions((prevState) => {
          const submissionData = prevState[submitId];
          const currentStatus = prevState[submitId]?.status;
          const currentSampleCase = !!prevState[submitId]?.testInfo?.sampleCase;
          
          if (!submissionData || nextStatus === SubmissionRunStatus.RECEIVED) {
            return { ...prevState, [submitId]: data };
          }
          
          if (
            currentStatus &&
            (
              priority(nextSampleCase)[nextStatus] > priority(currentSampleCase)[currentStatus]
              || (priority(nextSampleCase)[nextStatus] === priority(currentSampleCase)[currentStatus] && data.messageTimestamp > submissionData.messageTimestamp)
            )
          ) {
            return { ...prevState, [submitId]: data };
          }
          
          return prevState;
        });
      }
    });
  }, [ mutate, userSessionId ]);
  
  return (
    <TasksContext.Provider
      value={{
        unListenSubmission,
        listenSubmission,
        submissions,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
