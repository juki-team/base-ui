import React from 'react';
import { classNames } from '../../../helpers';
import { T } from '../../Translate';
import { LogInfoProps } from '../types';
import { getErrors } from '../utils';

export const LogInfo = ({ testCase, timeLimit, memoryLimit }: LogInfoProps) => {
  
  const dataLogs = testCase?.log?.split?.('\n');
  const { timeLimitExceded, memoryLimitExceded, runtimeError } = getErrors(testCase, timeLimit, memoryLimit);
  
  return (
    <>
      <div className="content-log">
        <span className={classNames('text-log text-xs text-sentence-case', { 'color-error': timeLimitExceded })}>
          {timeLimitExceded
            ? <><T>time limit exceeded</T> ({dataLogs[0]} <T>ms</T>)</>
            : <><T>used time</T>: {dataLogs[0]} <T>ms</T></>
          },
        </span>
        <span className={classNames('text-log text-xs text-sentence-case', { 'color-error': memoryLimitExceded })}>
          {memoryLimitExceded
            ? <><T>memory limit exceeded</T> ({dataLogs[1]} <T>KB</T>)</>
            : <><T>used memory</T>: {dataLogs[1]} <T>KB</T></>
          },
        </span>
        <span className={classNames('text-log text-xs text-sentence-case', { 'color-error': runtimeError })}>
          {runtimeError && !timeLimit && !memoryLimit
            ? <><T>runtime error</T> (<T>exit code</T>: {dataLogs[2]})</>
            : <><T>exit code</T>: {dataLogs[2]}</>
          }
        </span>
      </div>
      {testCase?.err && (
        <div className="content-log">
          <span className="color-white text-stderr">{testCase?.err}</span>
        </div>
      )}
    </>
  );
};