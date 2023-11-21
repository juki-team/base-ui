import React from 'react';
import { classNames } from '../../../../helpers';
import { T } from '../../../atoms';
import { LogInfoProps } from '../types';
import { getErrors } from '../utils';

export const LogInfo = ({ testCase, timeLimit, memoryLimit }: LogInfoProps) => {
  
  const dataLogs = testCase?.log?.split?.('\n');
  const { timeLimitExceeded, memoryLimitExceeded, runtimeError } = getErrors(testCase, timeLimit, memoryLimit);
  
  return (
    <>
      <div className="content-log">
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': timeLimitExceeded })}>
          {timeLimitExceeded
            ? <><T>time limit exceeded</T> ({dataLogs[0]} <T>ms</T>)</>
            : <><T>used time</T>: {dataLogs[0]} <T>ms</T></>
          },
        </span>
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': memoryLimitExceeded })}>
          {memoryLimitExceeded
            ? <><T>memory limit exceeded</T> ({dataLogs[1]} <T>KB</T>)</>
            : <><T>used memory</T>: {dataLogs[1]} <T>KB</T></>
          },
        </span>
        <span className={classNames('text-log tx-t tt-se', { 'cr-er': runtimeError })}>
          {runtimeError && !timeLimit && !memoryLimit
            ? <><T>runtime error</T> (<T>exit code</T>: {dataLogs[2]})</>
            : <><T>exit code</T>: {dataLogs[2]}</>
          }
        </span>
      </div>
    </>
  );
};
