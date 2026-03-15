import {
  cleanRequest,
  CodeEditorFiles,
  CodeEditorTestCase,
  CodeEditorTestCases,
  CodeLanguage,
  consoleWarn,
  ContentResponse,
  isCodeRunStatusMessageWebSocketResponseEventDTO,
  Status,
  SubmissionRunStatus,
  SubscribeCodeRunStatusWebSocketEventDTO,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { jukiApiManager } from '../../../../../../settings';
import { T } from '../../../../../atoms';
import { PlayArrowIcon } from '../../../../../atoms/server';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { useKeyDown } from '../../../../../hooks/useKeyDown';
import { useStableRef } from '../../../../../hooks/useStableRef';
import { useSubscribe } from '../../../../../hooks/useSubscribe';
import { ButtonLoader } from '../../../../../molecules';
import { SetLoaderStatusOnClickType } from '../../../../../types';
import { CodeRunnerEditorOnChangeType, Runner, RunState } from '../types';

interface RunCodeButtonProps<T> extends Runner {
  onRunStart: (id: string) => void;
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  withLabels: boolean;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  setRunState: Dispatch<SetStateAction<RunState>>;
}

export const RunCodeButton = <T,>(props: RunCodeButtonProps<T>) => {
  const {
    onRunStart,
    id: runId,
    onChangeRef,
    isRunning,
    timeLimit,
    memoryLimit,
    withLabels,
    files,
    currentFileName,
    testCases,
    setRunState,
  } = props;
  const { addErrorNotification } = useJukiNotification();
  const activeRunIdRef = useRef('');
  const currentFile = files[currentFileName];
  const event: Omit<SubscribeCodeRunStatusWebSocketEventDTO, 'clientId'> = {
    event: WebSocketSubscriptionEvent.SUBSCRIBE_CODE_RUN_STATUS,
    runId,
  };
  useSubscribe(
    event,
    (data) => {
      if (isCodeRunStatusMessageWebSocketResponseEventDTO(data)) {
        // Guard against stale messages from a previous run (#4)
        if (runId !== activeRunIdRef.current) return;
        const fillTestCases = (status: SubmissionRunStatus, err: string, out: string, log: string) => {
          onChangeRef.current?.({
            onTestCasesChange: (prevState) => {
              const newTestCases: CodeEditorTestCases = { ...prevState };
              for (const testKey in newTestCases) {
                if (prevState[testKey]?.messageTimestamp && prevState[testKey].messageTimestamp > data.messageTimestamp) {
                  continue;
                }
                if (newTestCases[testKey]) {
                  newTestCases[testKey] = {
                    ...newTestCases[testKey],
                    status,
                    err,
                    out,
                    log,
                    messageTimestamp: data.messageTimestamp,
                  };
                }
              }
              return newTestCases;
            },
          });
        };
        const status = data.status || SubmissionRunStatus.NONE;
        const inputKey = data?.log?.inputKey;

        switch (status) {
          case SubmissionRunStatus.RECEIVED:
          case SubmissionRunStatus.FAILED:
          case SubmissionRunStatus.COMPILING:
          case SubmissionRunStatus.COMPILED:
          case SubmissionRunStatus.COMPILATION_ERROR:
            fillTestCases(status, data.log?.err || '', data.log?.out || '', data.log?.log || '');
            break;
          // case SubmissionRunStatus.RUNNING_TEST_CASES:
          case SubmissionRunStatus.RUNNING_TEST_CASE:
          case SubmissionRunStatus.EXECUTED_TEST_CASE:
          case SubmissionRunStatus.FAILED_TEST_CASE:
            onChangeRef.current?.({
              onTestCasesChange: (prevState) => {
                const newTestCases: CodeEditorTestCases = { ...prevState };
                if (inputKey && newTestCases[inputKey]) {
                  const testCase: CodeEditorTestCase = {
                    ...newTestCases[inputKey],
                    status,
                    out: data.log?.out || '',
                    log: data.log?.log || '',
                    err: data.log?.err || '',
                    messageTimestamp: data.messageTimestamp,
                  };
                  const prev = prevState[testCase.key];
                  if (prev && prev.messageTimestamp > testCase.messageTimestamp) {
                    return prevState;
                  }
                  return { ...prevState, [testCase.key]: testCase };
                }
                return prevState;
              },
            });
            break;
          default:
        }
        switch (status) {
          case SubmissionRunStatus.RECEIVED:
            setRunState((prev) => ({ ...prev, running: true }));
            onChangeRef.current?.({ isRunning: true });
            break;
          case SubmissionRunStatus.FAILED:
          case SubmissionRunStatus.COMPILATION_ERROR:
          case SubmissionRunStatus.COMPLETED:
            setRunState((prev) => ({ ...prev, running: false }));
            onChangeRef.current?.({ isRunning: false });
            break;
          default:
        }
        onChangeRef.current?.({ codeRunStatus: status });
      }
    },
    () => !!runId,
  );

  const handleRunCode: (setLoaderStatus: SetLoaderStatusOnClickType) => Promise<void> = async (setStatus) => {
    const clean = (status: SubmissionRunStatus) => {
      const newTestCases: CodeEditorTestCases = {};
      for (const testKey in testCases) {
        if (testCases[testKey]) {
          newTestCases[testKey] = { ...testCases[testKey] };
          newTestCases[testKey].log = '0\n0\n0\n';
          newTestCases[testKey].out = '';
          newTestCases[testKey].err = '';
          newTestCases[testKey].status = status;
        }
      }
      onChangeRef?.current?.({ onTestCasesChange: () => newTestCases });
    };
    setStatus(Status.LOADING);
    clean(SubmissionRunStatus.RECEIVED);
    try {
      const runId = v4();
      onRunStart(runId);
      activeRunIdRef.current = runId;
      const { url, ...options } = jukiApiManager.API_V2.code.run({
        body: {
          runId,
          files: [
            ...Object.values(files).map(({ language, source, name }) => ({
              language: language as CodeLanguage,
              source,
              fullFileName: name,
              isInput: false,
              isEntryPoint: name === currentFileName,
              toCompile: name === currentFileName,
            })),
            ...Object.values(testCases).map((testCase) => ({
              fullFileName: `${testCase.key}.in`,
              language: CodeLanguage.TEXT,
              source: testCase.in,
              isInput: true,
              isEntryPoint: false,
              toCompile: false,
            })),
          ],
          timeLimit,
          memoryLimit,
          connectionId: '',
        },
      });
      const request = cleanRequest<ContentResponse<{ runId: string }>>(await authorizedRequest(url, options));

      if (request?.success && request?.content?.runId) {
        setStatus(Status.SUCCESS);
      } else {
        addErrorNotification(request?.message);
        onRunStart('');
        activeRunIdRef.current = '';
        clean(SubmissionRunStatus.NONE);
        consoleWarn('run code request failed', { request });
        setStatus(Status.ERROR);
      }
    } catch (error) {
      consoleWarn('error on run code', { error });
      clean(SubmissionRunStatus.NONE);
      setStatus(Status.ERROR);
    }
  };
  const handleRunCodeRef = useStableRef(handleRunCode);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e.shiftKey && !e.altKey && e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (setLoaderRef.current) {
          void handleRunCodeRef.current(setLoaderRef.current);
        }
        return;
      }
    },
    [handleRunCodeRef],
  );

  useKeyDown(handleKeyDown);

  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);

  useEffect(() => {
    if (isRunning) {
      setLoaderRef.current?.(Status.LOADING);
    } else {
      setLoaderRef.current?.(Status.NONE);
    }
  }, [isRunning]);

  return (
    <ButtonLoader
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={!withLabels ? 'run (Ctrl+Enter / ⌘+Enter)' : '(Ctrl+Enter / ⌘+Enter)'}
      size="small"
      icon={<PlayArrowIcon />}
      onClick={handleRunCode}
      setLoaderStatusRef={(setLoader) => (setLoaderRef.current = setLoader)}
      disabled={!currentFile}
    >
      {withLabels && <T className="tt-se">run</T>}
    </ButtonLoader>
  );
};
