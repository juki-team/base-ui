import { getDataOfTestCase, ONE_SECOND, SubmissionRunStatus } from '@juki-team/commons';
import { T } from '../../../../../atoms';
import { classNames } from '../../../../../helpers';
import type { LogInfoProps } from '../types';

const otherLimits = [ SubmissionRunStatus.COMPILING, SubmissionRunStatus.COMPILED, SubmissionRunStatus.COMPILATION_ERROR ];

export const LogInfo = ({ testCase, timeLimit, memoryLimit }: LogInfoProps) => {
  
  const {
    timeUsed,
    timeLimitExceeded,
    memoryUsed,
    memoryLimitExceeded,
    exitCode,
    runtimeError,
  } = getDataOfTestCase(
    testCase,
    otherLimits.includes(testCase.status) ? 10 * ONE_SECOND : timeLimit,
    otherLimits.includes(testCase.status) ? 1048576 : memoryLimit,
  );
  
  if (testCase.status === SubmissionRunStatus.COMPILATION_ERROR) {
    return (
      <div className="jk-pg-xsm jk-row gap left tx-t" style={{ lineHeight: 1 }}>
          <span className={classNames('tt-se cr-er')}>
            <T>compilation error</T>
        </span>
      </div>
    );
  }
  
  const re = runtimeError && !timeLimitExceeded && !memoryLimitExceeded;
  
  return (
    <div className="jk-col gap left stretch tx-s" style={{ lineHeight: 1 }}>
      <div className={classNames('jk-row left', { 'cr-er': timeLimitExceeded })}>
        <T className="tt-se">time used</T>:&nbsp;{timeUsed}&nbsp;<T>ms</T>&nbsp;/&nbsp;{timeLimit}&nbsp;<T>ms</T>
      </div>
      {timeLimitExceeded && <T className="tt-se cr-er jk-pg-l">time limit exceeded</T>}
      <div className={classNames('jk-row left', { 'cr-er': memoryLimitExceeded })}>
        <T className="tt-se">memory used</T>:&nbsp;{memoryUsed}&nbsp;<T>KB</T>&nbsp;/&nbsp;{memoryLimit}&nbsp;
        <T>KB</T>
      </div>
      {memoryLimitExceeded && <T className="tt-se cr-er jk-pg-l">memory limit exceeded</T>}
      <div className={classNames('jk-row left', { 'cr-er': re })}>
        <T className="tt-se">exit code</T>:&nbsp;{exitCode}
      </div>
      {re && <T className="tt-se cr-er jk-pg-l">runtime error</T>}
    </div>
  );
};
