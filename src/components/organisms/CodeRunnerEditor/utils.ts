import { SubmissionTestCaseType } from '@juki-team/commons';

export const getErrors = (testCase: SubmissionTestCaseType, timeLimit: number, memoryLimit: number) => {
  const dataLogs = testCase?.log?.split('\n');
  const timeLimitExceeded = +dataLogs?.[0] > timeLimit;
  const memoryLimitExceeded = +dataLogs?.[1] > memoryLimit;
  const runtimeError = dataLogs?.[2] !== '0';
  return {
    timeLimitExceeded: timeLimitExceeded,
    memoryLimitExceeded: memoryLimitExceeded,
    runtimeError,
    failed: !!testCase?.log && (timeLimitExceeded || memoryLimitExceeded || runtimeError),
  };
};
