import {
  CodeEditorTestCasesType,
  ProfileSetting,
  PROGRAMMING_LANGUAGE,
  SocketEvent,
  SocketEventRunResponseDTO,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiSocket } from '../../../hooks/useJukiSocket';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { Portal, T } from '../../atoms';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES, CodeEditor, CodeEditorPropertiesType, SplitPane } from '../../molecules';
import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import { TestCases } from './TestCases';
import { CodeRunnerEditorProps } from './types';

export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => {
  
  const {
    readOnly,
    sourceCode,
    languages = CODE_EDITOR_PROGRAMMING_LANGUAGES.map(lang => ({
      value: lang as T,
      label: PROGRAMMING_LANGUAGE[lang]?.label || lang,
    })),
    language,
    onChange: _onChange,
    centerButtons,
    rightButtons,
    testCases,
    tabSize = 4,
    fontSize = 14,
    timeLimit = 1000,
    memoryLimit = 512000,
    expandPosition,
    className,
    enableAddCustomSampleCases,
    enableAddSampleCases,
  } = props;
  
  const onChangeRef = useRef(_onChange);
  onChangeRef.current = readOnly ? undefined : _onChange;
  const [ isRunning, setIsRunning ] = useState(false);
  const [ runId, setRunId ] = useState('');
  const { user: { settings: { [ProfileSetting.THEME]: preferredTheme } } } = useJukiUser();
  const { pop } = useJukiSocket(SocketEvent.RUN);
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
        onChangeRef.current?.({ testCases: newTestCases });
      }
    };
    const status = lastRunStatus.status || SubmissionRunStatus.NONE;
    const inputKey = lastRunStatus?.log?.inputKey;
    const newTestCases: CodeEditorTestCasesType = { ...testCases };
    switch (status) {
      case SubmissionRunStatus.FAILED:
        fillTestCases(
          newTestCases,
          status,
          lastRunStatus.log?.err || '',
          lastRunStatus.log?.out || '',
          lastRunStatus.log?.log || '',
        );
        break;
      case SubmissionRunStatus.COMPILING:
      case SubmissionRunStatus.RUNNING_TEST_CASES:
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
            onChangeRef.current?.({ testCases: newTestCases });
          }
        }
        break;
      default:
    }
    switch (status) {
      case SubmissionRunStatus.RECEIVED:
        setIsRunning(true);
        onChangeRef.current?.({ isRunning: true });
        break;
      case SubmissionRunStatus.FAILED:
      case SubmissionRunStatus.COMPILATION_ERROR:
      case SubmissionRunStatus.COMPLETED:
        setIsRunning(false);
        onChangeRef.current?.({ isRunning: false });
        break;
      default:
    }
  }, [ lastRunStatus, testCases ]);
  const codeEditorOnChange = useCallback((props: CodeEditorPropertiesType<T>) => {
    onChangeRef.current?.({ ...props, isRunning: false });
    setIsRunning(false);
  }, []);
  
  const isMobileViewPort = viewPortSize === 'sm';
  
  const firstChild = useMemo(() => (
    <div className="editor-layout">
      <CodeEditor
        theme={preferredTheme}
        onChange={codeEditorOnChange}
        language={language}
        readOnly={readOnly}
        sourceCode={sourceCode}
        tabSize={tabSize}
        fontSize={fontSize}
      />
    </div>
  ), [ preferredTheme, codeEditorOnChange, language, sourceCode, tabSize, fontSize ]);
  
  const withTestCases = !!testCases;
  
  const closableSecondPane = useMemo(() => (
    withTestCases
      ? { align: 'right' as 'right', expandLabel: <T className="label tx-t">test cases</T> }
      : undefined
  ), [ withTestCases ]);
  
  const closableFirstPane = useMemo(() => (
    (withTestCases && isMobileViewPort)
      ? { align: 'right' as 'right', expandLabel: <T className="label tx-t">code editor</T> }
      : undefined
  ), [ withTestCases, isMobileViewPort ]);
  
  const secondChild = useMemo(() => (
    <TestCases
      testCases={testCases}
      onChange={onChangeRef.current}
      timeLimit={timeLimit}
      memoryLimit={memoryLimit}
      direction={direction}
      enableAddSampleCases={readOnly ? false : !!enableAddSampleCases}
      enableAddCustomSampleCases={readOnly ? false : !!enableAddCustomSampleCases}
    />
  ), [ testCases, timeLimit, memoryLimit, direction, readOnly, enableAddSampleCases, enableAddCustomSampleCases ]);
  
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
        onChange={onChangeRef.current}
        tabSize={tabSize}
        fontSize={fontSize}
      />
      <Header
        language={language}
        languages={languages}
        sourceCode={sourceCode}
        testCases={testCases || {}}
        centerOptions={({ widthContainer, twoRows, withLabels }) => centerButtons?.({
          isRunning,
          readOnly,
          sourceCode,
          languages,
          language,
          testCases: testCases || {},
          widthContainer,
          twoRows,
          withLabels,
        })}
        rightOptions={({ twoRows, withLabels }) => rightButtons?.({
          isRunning,
          readOnly,
          sourceCode,
          languages,
          language,
          testCases: testCases || {},
          twoRows,
          withLabels,
        })}
        setShowSettings={setShowSettings}
        setRunId={setRunId}
        onChange={onChangeRef.current}
        timeLimit={timeLimit}
        memoryLimit={memoryLimit}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
        isRunning={isRunning}
      />
      <div className="editor-stdio-content">
        <SplitPane
          direction={direction}
          minSize={80}
          onlyFirstPane={!testCases}
          closableSecondPane={closableSecondPane}
          closableFirstPane={closableFirstPane}
          toggleable
          onChangeDirection={setDirection}
          onePanelAtATime={isMobileViewPort}
        >
          {firstChild}
          {secondChild}
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
