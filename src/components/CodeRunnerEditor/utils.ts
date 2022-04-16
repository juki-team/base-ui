import { SubmissionTestCaseType } from './types';

export const getErrors = (testCase: SubmissionTestCaseType, timeLimit: number, memoryLimit: number) => {
  const dataLogs = testCase?.log?.split('\n');
  const timeLimitExceded = +dataLogs?.[0] > timeLimit;
  const memoryLimitExceded = +dataLogs?.[1] > memoryLimit;
  const runtimeError = dataLogs?.[2] !== '0';
  return {
    timeLimitExceded,
    memoryLimitExceded,
    runtimeError,
    failed: !!testCase?.log && (timeLimitExceded || memoryLimitExceded || runtimeError),
  };
};
