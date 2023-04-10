import {
  CodeEditorTestCasesType,
  ProfileSetting,
  PROGRAMMING_LANGUAGE,
  SocketEvent,
  SocketEventRunResponseDTO,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useEffect, useMemo, useState } from 'react';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES, CodeEditor, Portal, SplitPane, T } from '../../components';
import { classNames } from '../../helpers';
import { useJkSocket, useJukiUI, useJukiUser } from '../../hooks';
import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import { TestCases } from './TestCases';
import { CodeRunnerEditorProps } from './types';

export const CodeRunnerEditor = <T, >({
  readOnly,
  sourceCode,
  languages = CODE_EDITOR_PROGRAMMING_LANGUAGES.map(lang => ({
    value: lang as T,
    label: PROGRAMMING_LANGUAGE[lang]?.label || lang,
  })),
  language,
  onChange,
  middleButtons,
  testCases,
  tabSize = 4,
  fontSize = 14,
  timeLimit = 1000,
  memoryLimit = 512000,
  expandPosition,
  className,
}: CodeRunnerEditorProps<T>) => {
  const [ runId, setRunId ] = useState('');
  const { user: { settings: { [ProfileSetting.THEME]: preferredTheme } } } = useJukiUser();
  const { pop } = useJkSocket(SocketEvent.RUN);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ direction, setDirection ] = useState<'row' | 'column'>('row');
  const [ expanded, setExpanded ] = useState(false);
  const { viewPortSize } = useJukiUI();
  const [ runStatus, setRunStatus ] = useState<{
    [key: string]: { [key: number]: SocketEventRunResponseDTO }
  }>({});
  useEffect(() => {
    const data = pop();
    if (data?.success) {
      setRunStatus(prevState => ({
        ...prevState,
        [data?.content?.runId]: { ...prevState[data?.content?.runId], [data?.content?.messageTimestamp]: data.content },
      }));
    }
  }, [ pop ]);
  
  const currentRunStatus = runStatus[runId];
  
  const lastRunStatus: SocketEventRunResponseDTO = useMemo(() => {
    return Object.values(currentRunStatus || {}).sort((a, b) => a.messageTimestamp - b.messageTimestamp).at(-1) || {
      status: SubmissionRunStatus.NONE,
      runId: '',
      messageTimestamp: 0,
      log: { log: '', err: '', out: '', inputKey: '' },
    };
  }, [ currentRunStatus ]);
  
  useEffect(() => {
    const fillTestCases = (newTestCases: CodeEditorTestCasesType, status: SubmissionRunStatus, err: string, out: string, log: string) => {
      for (const testKey in newTestCases) {
        newTestCases[testKey] = {
          ...newTestCases[testKey],
          status,
          err,
          out,
          log,
        };
      }
      if (JSON.stringify(testCases) !== JSON.stringify(newTestCases)) {
        onChange?.({ testCases: newTestCases });
      }
    };
    const status = lastRunStatus.status || SubmissionRunStatus.NONE;
    const inputKey = lastRunStatus?.log?.inputKey;
    const newTestCases: CodeEditorTestCasesType = { ...testCases };
    switch (status) {
      case SubmissionRunStatus.RECEIVED:
      case SubmissionRunStatus.COMPILING:
      case SubmissionRunStatus.RUNNING_TEST_CASES:
      case SubmissionRunStatus.FAILED:
      case SubmissionRunStatus.COMPILED:
      case SubmissionRunStatus.COMPILATION_ERROR:
        fillTestCases(
          newTestCases,
          status,
          lastRunStatus.log?.err || '',
          lastRunStatus.log?.out || '',
          lastRunStatus.log?.log || '',
        );
        break;
      case SubmissionRunStatus.RUNNING_TEST_CASE:
      case SubmissionRunStatus.EXECUTED_TEST_CASE:
      case SubmissionRunStatus.FAILED_TEST_CASE:
        if (inputKey && newTestCases[inputKey]) {
          newTestCases[inputKey] = {
            ...newTestCases[inputKey],
            status,
            out: lastRunStatus.log?.out || '',
            log: lastRunStatus.log?.log || '',
            err: lastRunStatus.log?.err || '',
          };
          if (JSON.stringify(testCases) !== JSON.stringify(newTestCases)) {
            onChange?.({ testCases: newTestCases });
          }
        }
        break;
      default:
    }
  }, [ lastRunStatus, onChange, testCases ]);
  
  const isMobileViewPort = viewPortSize === 'sm';
  
  const body = (
    <div
      className={classNames(
        'jk-code-mirror-editor-layout jk-border-radius-inline',
        { 'elevation-3': expanded },
        className,
      )}
    >
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onChange={onChange}
        tabSize={tabSize}
        fontSize={fontSize}
      />
      <Header
        language={language}
        languages={languages}
        sourceCode={sourceCode}
        testCases={testCases || {}}
        centerOptions={({ widthContainer }) => middleButtons?.({
          readOnly,
          sourceCode,
          languages,
          language,
          testCases,
          widthContainer,
        })}
        setShowSettings={setShowSettings}
        setRunId={setRunId}
        onChange={onChange}
        timeLimit={timeLimit}
        memoryLimit={memoryLimit}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
      />
      <div className="editor-stdio-content">
        <SplitPane
          direction={direction}
          minSize={80}
          onlyFirstPane={!testCases}
          closableSecondPane={testCases ? {
            align: 'right',
            expandLabel: <T className="label tx-t">test cases</T>,
          } : undefined}
          closableFirstPane={(testCases && isMobileViewPort) ? {
            align: 'right',
            expandLabel: <T className="label tx-t">code editor</T>,
          } : undefined}
          toggleOption
          onChangeDirection={setDirection}
          onePanelAtATime={isMobileViewPort}
        >
          <div className="editor-layout">
            <CodeEditor
              theme={preferredTheme}
              onChange={(props) => onChange?.(props)}
              language={language}
              readOnly={false}
              sourceCode={sourceCode}
              tabSize={tabSize}
              fontSize={fontSize}
            />
          </div>
          <TestCases
            testCases={testCases || {}}
            onChange={onChange}
            timeLimit={timeLimit}
            memoryLimit={memoryLimit}
            direction={direction}
          />
        </SplitPane>
      </div>
    </div>
  );
  
  if (expanded) {
    return (
      <Portal>
        <div style={{ position: 'absolute', ...expandPosition }} className="jk-code-mirror-editor-expanded-layout">
          {body}
        </div>
      </Portal>
    );
  }
  return body;
};

export * from './types';
