import { PROBLEM_VERDICT, ProblemVerdict, SocketEvent, SubmissionRunStatus } from '@juki-team/commons';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { T } from '../../components';
import { useJukiNotification, useJukiUser } from '../../hooks';
import { TasksContext } from './context';
import { SocketSubmissions, SubmissionToCheck } from './types';

export const JukiTasksProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const { addErrorNotification, addSuccessNotification } = useJukiNotification();
  const [ submissions, setSubmissions ] = useState<SocketSubmissions>({});
  const [ submissionsToCheck, setSubmissionsToCheck ] = useState<SubmissionToCheck[]>([]);
  const { socket } = useJukiUser();
  
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
  
  const listenSubmission = useCallback((submissionToCheck: SubmissionToCheck) => {
    setSubmissionsToCheck(prevState => [ ...prevState, submissionToCheck ]);
    socket.subscribe(SocketEvent.SUBMISSION, submissionToCheck.id);
    socket.onMessage(SocketEvent.SUBMISSION, submissionToCheck.id, (data) => {
      const submitId = data?.content?.submitId;
      if (submitId) {
        setSubmissions((prevState) => {
          const submissionData = prevState[submitId];
          const currentStatus = prevState[submitId]?.status;
          const nextStatus = data.content.status;
          if (!submissionData) {
            return { ...prevState, [submitId]: data.content };
          }
          if (
            [ SubmissionRunStatus.COMPILING, SubmissionRunStatus.COMPILED, SubmissionRunStatus.FAILED ]
              .includes(nextStatus)
            && (data.content.messageTimestamp > submissionData.messageTimestamp)
          ) {
            return { ...prevState, [submitId]: data.content };
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
            && (data.content.messageTimestamp > submissionData.messageTimestamp)
          ) {
            return {
              ...prevState,
              [submitId]: {
                ...data.content,
                
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
            return { ...prevState, [submitId]: data.content };
          }
          return prevState;
        });
      }
    });
  }, [ socket ]);
  
  return (
    <TasksContext.Provider
      value={{
        listenSubmission,
        submissions,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
