import {
  isSubmissionRunStatusMessageWebSocketResponseEventDTO,
  PROBLEM_VERDICT,
  ProblemVerdict,
  SubmissionRunStatus,
  SubscribeSubmissionRunStatusWebSocketEventDTO,
  UnsubscribeSubmissionRunStatusWebSocketEventDTO,
  WebSocketActionEvent,
} from '@juki-team/commons';
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { T } from '../../components/atoms/T';
import { useJukiUser, useMutate } from '../../hooks';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { jukiApiSocketManager } from '../../settings';
import { TasksContext } from './context';
import { SocketSubmissions, SubmissionToCheck } from './types';

export const JukiTasksProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const { addErrorNotification, addSuccessNotification } = useJukiNotification();
  const [ submissions, setSubmissions ] = useState<SocketSubmissions>({});
  const [ submissionsToCheck, setSubmissionsToCheck ] = useState<SubmissionToCheck[]>([]);
  const { user: { sessionId } } = useJukiUser();
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
        sessionId,
        submitId: submissionId,
      };
      jukiApiSocketManager.SOCKET.unsubscribeAll(event);
      submissionIdListenerCount.current[submissionId] = 0;
    }
  }, [ sessionId ]);
  
  const listenSubmission = useCallback((submissionToCheck: SubmissionToCheck, withNotification: boolean) => {
    if (withNotification) {
      setSubmissionsToCheck(prevState => [ ...prevState, submissionToCheck ]);
    }
    const event: SubscribeSubmissionRunStatusWebSocketEventDTO = {
      event: WebSocketActionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
      sessionId,
      submitId: submissionToCheck.id,
    };
    submissionIdListenerCount.current[submissionToCheck.id] = (submissionIdListenerCount.current[submissionToCheck.id] ?? 0) + 1;
    jukiApiSocketManager.SOCKET.send(event, (data) => {
      if (isSubmissionRunStatusMessageWebSocketResponseEventDTO(data)) {
        if (data.status === SubmissionRunStatus.COMPLETED || data.status === SubmissionRunStatus.RECEIVED) {
          void mutate(new RegExp(`${jukiApiSocketManager.SERVICE_API_V1_URL}/submission`, 'g'));
        }
        const nextStatus = data.status;
        const submitId = data.submitId;
        setSubmissions((prevState) => {
          const submissionData = prevState[submitId];
          const currentStatus = prevState[submitId]?.status;
          
          if (!submissionData) {
            return { ...prevState, [submitId]: data };
          }
          
          if (data.messageTimestamp > submissionData.messageTimestamp) {
            return { ...prevState, [submitId]: data };
          }
          
          if (
            [ SubmissionRunStatus.COMPILING, SubmissionRunStatus.COMPILED, SubmissionRunStatus.FAILED ]
              .includes(nextStatus)
            && (data.messageTimestamp > submissionData.messageTimestamp)
          ) {
            return { ...prevState, [submitId]: data };
          }
          if (
            [
              SubmissionRunStatus.FETCHING_TEST_CASES,
              SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES,
              SubmissionRunStatus.RUNNING_TEST_CASES,
              SubmissionRunStatus.EXECUTED_TEST_CASE,
            ].includes(nextStatus) && (
              [
                SubmissionRunStatus.COMPILING,
                SubmissionRunStatus.COMPILED,
                SubmissionRunStatus.FAILED,
                SubmissionRunStatus.FETCHING_TEST_CASES,
                SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES,
                SubmissionRunStatus.RUNNING_TEST_CASES,
                SubmissionRunStatus.EXECUTED_TEST_CASE,
              ].includes(currentStatus)
            )
            && (data.messageTimestamp > submissionData.messageTimestamp)
          ) {
            return {
              ...prevState,
              [submitId]: {
                ...data,
              },
            };
          }
          
          if (
            [
              SubmissionRunStatus.GRADING,
              SubmissionRunStatus.COMPLETED,
            ].includes(nextStatus) && (
              [
                SubmissionRunStatus.RECEIVED,
                SubmissionRunStatus.COMPILING,
                SubmissionRunStatus.COMPILED,
                SubmissionRunStatus.FAILED,
                SubmissionRunStatus.FETCHING_TEST_CASES,
                SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES,
                SubmissionRunStatus.RUNNING_TEST_CASES,
                SubmissionRunStatus.EXECUTED_TEST_CASE,
                SubmissionRunStatus.GRADING,
              ].includes(currentStatus)
            )
          ) {
            return { ...prevState, [submitId]: data };
          }
          return prevState;
        });
      }
    });
  }, [ mutate, sessionId ]);
  
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
