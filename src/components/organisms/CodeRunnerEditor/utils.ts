import { SubmissionTestCaseType } from '@juki-team/commons';

export const getErrors = (testCase: SubmissionTestCaseType, timeLimit: number, memoryLimit: number) => {
  
  const dataLogs = testCase?.log?.split('\n');
  const timeUsed = +dataLogs?.[0];
  const timeLimitExceeded = timeUsed > timeLimit;
  const memoryUsed = +dataLogs?.[1];
  const memoryLimitExceeded = memoryUsed > memoryLimit;
  const exitCode = dataLogs?.[2];
  const runtimeError = exitCode !== '0';
  
  return {
    timeUsed,
    timeLimitExceeded: timeLimitExceeded,
    memoryUsed,
    memoryLimitExceeded: memoryLimitExceeded,
    exitCode,
    runtimeError,
    failed: !!testCase?.log && (timeLimitExceeded || memoryLimitExceeded || runtimeError),
  };
};
