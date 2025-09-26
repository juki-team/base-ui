import { getDataOfTestCase, ONE_SECOND, SubmissionRunStatus } from '@juki-team/commons';
import { classNames } from '../../../../../../helpers';
import { T } from '../../../../../atoms';
import { LogInfoProps } from '../types';

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
      <div className="border-bottom-highlight-light">
        <div className="jk-pg-xsm cr-g2 jk-row gap left tx-t" style={{ lineHeight: 1 }}>
          <span className={classNames('tt-se cr-er')}>
            <T>compilation error</T>
        </span>
        </div>
      </div>
    );
  }
  
  const re = runtimeError && !timeLimitExceeded && !memoryLimitExceeded;
  
  return (
    <div className="border-bottom-highlight-light">
      <div className="jk-pg-xsm cr-g2 jk-row-col gap left tx-t" style={{ lineHeight: 1 }}>
        <div
          className={classNames('jk-br-ie', { 'cr-we bc-el': timeLimitExceeded, 'bc-hl': !timeLimitExceeded })}
          style={{ padding: '1px 2px' }}
        >
          {timeLimitExceeded ? <T className="tt-se">time limit exceeded</T> : <T className="tt-se">time used</T>}
          &nbsp;{timeUsed}&nbsp;<T>ms</T>
        </div>
        <div
          className={classNames('jk-br-ie', { 'cr-we bc-el': memoryLimitExceeded, 'bc-hl': !memoryLimitExceeded })}
          style={{ padding: '1px 2px' }}
        >
          {memoryLimitExceeded ? <T className="tt-se">memory limit exceeded</T> : <T className="tt-se">memory used</T>}
          &nbsp;{memoryUsed}&nbsp;<T>KB</T>
        </div>
        <div
          className={classNames('jk-br-ie', { 'cr-we bc-el': re, 'bc-hl': !re })}
          style={{ padding: '1px 2px' }}
        >
          {re ? <T className="tt-se">runtime error</T> : <T className="tt-se">exit code</T>}
          &nbsp;{exitCode}
        </div>
      </div>
    </div>
  );
};
