import React from 'react';
import { classNames } from '../../../../helpers';
import { T } from '../../../atoms';
import { LogInfoProps } from '../types';
import { getErrors } from '../utils';

export const LogInfo = ({ testCase, timeLimit, memoryLimit }: LogInfoProps) => {
  
  const {
    timeUsed,
    timeLimitExceeded,
    memoryUsed,
    memoryLimitExceeded,
    exitCode,
    runtimeError,
  } = getErrors(testCase, timeLimit, memoryLimit);
  
  return (
    <>
      <div className="content-log">
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': timeLimitExceeded })}>
          {timeLimitExceeded
            ? <><T>time limit exceeded</T> ({timeUsed} <T>ms</T>)</>
            : <><T>used time</T>: {timeUsed} <T>ms</T></>
          },
        </span>
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': memoryLimitExceeded })}>
          {memoryLimitExceeded
            ? <><T>memory limit exceeded</T> ({memoryUsed} <T>KB</T>)</>
            : <><T>used memory</T>: {memoryUsed} <T>KB</T></>
          },
        </span>
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': runtimeError })}>
          {runtimeError && !timeLimit && !memoryLimit
            ? <><T>runtime error</T> (<T>exit code</T>: {exitCode})</>
            : <><T>exit code</T>: {exitCode}</>
          }
        </span>
      </div>
    </>
  );
};
