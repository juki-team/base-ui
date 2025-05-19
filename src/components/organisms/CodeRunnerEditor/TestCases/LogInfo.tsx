import { getDataOfTestCase } from '@juki-team/commons';
import React from 'react';
import { classNames } from '../../../../helpers';
import { T } from '../../../atoms';
import { LogInfoProps } from '../types';

export const LogInfo = ({ testCase, timeLimit, memoryLimit }: LogInfoProps) => {
  
  const {
    timeUsed,
    timeLimitExceeded,
    memoryUsed,
    memoryLimitExceeded,
    exitCode,
    runtimeError,
  } = getDataOfTestCase(testCase, timeLimit, memoryLimit);
  
  const time = <div data-tooltip-id="jk-tooltip" data-tooltip-content="time used">{timeUsed} <T>ms</T></div>;
  const memory = <div data-tooltip-id="jk-tooltip" data-tooltip-content="memory used">{memoryUsed} <T>KB</T></div>;
  const code = <div data-tooltip-id="jk-tooltip" data-tooltip-content="exit code">{exitCode}</div>;
  
  return (
    <div className="border-bottom-highlight-light">
      <div className="jk-pg-xsm cr-g2 jk-row gap left tx-t" style={{ lineHeight: 1 }}>
        <span className={classNames('tt-se', { 'cr-er': timeLimitExceeded })}>
          {timeLimitExceeded
            ? <><T>time limit exceeded</T> ({time})</>
            : time
          }
        </span>
        |
        <span className={classNames('tt-se', { 'cr-er': memoryLimitExceeded })}>
          {memoryLimitExceeded
            ? <><T>memory limit exceeded</T> ({memory})</>
            : memory
          }
        </span>
        |
        <span className={classNames('tt-se', { 'cr-er': runtimeError })}>
          {runtimeError && !timeLimit && !memoryLimit
            ? <><T>runtime error</T> ({code})</>
            : code
          }
        </span>
      </div>
    </div>
  );
};
