import { getDataOfTestCase, ONE_SECOND, SubmissionRunStatus } from '@juki-team/commons';
import React from 'react';
import { classNames } from '../../../../helpers';
import { T } from '../../../atoms';
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
  
  const time = <div data-tooltip-id="jk-tooltip" data-tooltip-content="time used">{timeUsed} <T>ms</T></div>;
  const memory = <div data-tooltip-id="jk-tooltip" data-tooltip-content="memory used">{memoryUsed} <T>KB</T></div>;
  const code = <div data-tooltip-id="jk-tooltip" data-tooltip-content="exit code">{exitCode}</div>;
  
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
  
  return (
    <div className="border-bottom-highlight-light">
      <div className="jk-pg-xsm cr-g2 jk-row gap left tx-t" style={{ lineHeight: 1 }}>
        {timeLimitExceeded && <T className="tt-se cr-er">time limit exceeded</T>}
        <span className={classNames('tt-se', { 'cr-er': timeLimitExceeded })}>
          {time}
        </span>
        |
        {memoryLimitExceeded && <T className="tt-se cr-er">memory limit exceeded</T>}
        <span className={classNames('tt-se', { 'cr-er': memoryLimitExceeded })}>
          {memory}
        </span>
        |
        {runtimeError && !timeLimitExceeded && !memoryLimitExceeded && <T className="tt-se cr-er">runtime error</T>}
        <span className={classNames('tt-se', { 'cr-er': runtimeError })}>
          {code}
        </span>
      </div>
    </div>
  );
};
