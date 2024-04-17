import { CodeEditorTestCaseType, ProblemVerdict, SubmissionTestCaseType } from '@juki-team/commons';

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

export const getVerdictFromTestCase = (testCaseValue: CodeEditorTestCaseType, timeLimit: number, memoryLimit: number): ProblemVerdict => {
  const { timeLimitExceeded, memoryLimitExceeded, runtimeError } = getErrors(testCaseValue, timeLimit, memoryLimit);
  
  return (
    timeLimitExceeded
      ? ProblemVerdict.TLE
      : memoryLimitExceeded
        ? ProblemVerdict.MLE
        : runtimeError
          ? ProblemVerdict.RE
          : testCaseValue.out === testCaseValue.testOut
            ? ProblemVerdict.AC
            : testCaseValue.withPE && testCaseValue.out.split(' ').join('').split('\n').join('') === testCaseValue.testOut.split(' ').join('').split('\n').join('')
              ? ProblemVerdict.PE
              : ProblemVerdict.WA
  );
}
