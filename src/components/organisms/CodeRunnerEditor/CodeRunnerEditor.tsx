import {
  CodeEditorTestCasesType,
  ProfileSetting,
  PROGRAMMING_LANGUAGE,
  SocketEvent,
  SocketEventCodeRunStatusResponseDTO,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { jukiApiSocketManager } from '../../../settings';
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
    testCases: _testCases,
    tabSize = 4,
    fontSize = 14,
    timeLimit = 1000,
    memoryLimit = 512000,
    expandPosition,
    className,
    enableAddCustomSampleCases,
    enableAddSampleCases,
    withoutRunCodeButton,
  } = props;
  
  const onChangeRef = useRef(_onChange);
  onChangeRef.current = readOnly ? undefined : _onChange;
  const [ isRunning, setIsRunning ] = useState(false);
  const [ runId, setRunId ] = useState('');
  const { user: { settings: { [ProfileSetting.THEME]: preferredTheme } } } = useJukiUser();
  const [ showSettings, setShowSettings ] = useState(false);
  const [ direction, setDirection ] = useState<'row' | 'column'>('row');
  const [ expanded, setExpanded ] = useState(false);
  const { viewPortSize } = useJukiUI();
  const { width: headerWidthContainer = 0, ref: headerRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const testCasesRef = useRef(_testCases);
  testCasesRef.current = _testCases;
  useEffect(() => {
    jukiApiSocketManager.SOCKET.onMessage(SocketEvent.CODE_RUN_STATUS, runId, (data) => {
      if (data?.id && data?.messageTimestamp) {
        const lastRunStatus: SocketEventCodeRunStatusResponseDTO = data as SocketEventCodeRunStatusResponseDTO;
        const fillTestCases = (status: SubmissionRunStatus, err: string, out: string, log: string) => {
          const newTestCases: CodeEditorTestCasesType = { ...testCasesRef.current };
          for (const testKey in newTestCases) {
            newTestCases[testKey] = {
              ...newTestCases[testKey],
              status,
              err,
              out,
              log,
              messageTimestamp: lastRunStatus.messageTimestamp,
            };
          }
          onChangeRef.current?.({ testCases: newTestCases });
        };
        const status = lastRunStatus.status || SubmissionRunStatus.NONE;
        const inputKey = lastRunStatus?.log?.inputKey;
        if (!!testCasesRef.current?.[inputKey]?.messageTimestamp && lastRunStatus.messageTimestamp < (testCasesRef.current[inputKey].messageTimestamp ?? 0)) {
          return;
        }
        switch (status) {
          case SubmissionRunStatus.FAILED:
          case SubmissionRunStatus.COMPILING:
          // case SubmissionRunStatus.RUNNING_TEST_CASES:
          case SubmissionRunStatus.COMPILED:
          case SubmissionRunStatus.COMPILATION_ERROR:
            fillTestCases(
              status,
              lastRunStatus.log?.err || '',
              lastRunStatus.log?.out || '',
              lastRunStatus.log?.log || '',
            );
            break;
          case SubmissionRunStatus.RUNNING_TEST_CASE:
          case SubmissionRunStatus.EXECUTED_TEST_CASE:
          case SubmissionRunStatus.FAILED_TEST_CASE:
            const newTestCases: CodeEditorTestCasesType = { ...testCasesRef.current };
            if (inputKey && newTestCases[inputKey]) {
              newTestCases[inputKey] = {
                ...newTestCases[inputKey],
                status,
                out: lastRunStatus.log?.out || '',
                log: lastRunStatus.log?.log || '',
                err: lastRunStatus.log?.err || '',
                messageTimestamp: lastRunStatus.messageTimestamp,
              };
            }
            onChangeRef.current?.({ testCases: newTestCases });
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
      }
    });
  }, [ runId ]);
  useEffect(() => {
    jukiApiSocketManager.SOCKET.subscribe(SocketEvent.CODE_RUN_STATUS, runId);
    return () => {
      jukiApiSocketManager.SOCKET.unsubscribe(SocketEvent.CODE_RUN_STATUS, runId);
    };
  }, [ runId ]);
  
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
  ), [ preferredTheme, codeEditorOnChange, language, readOnly, sourceCode, tabSize, fontSize ]);
  
  const withTestCases = !!_testCases;
  const twoRows = headerWidthContainer < (withoutRunCodeButton ? 340 : 420);
  
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
      testCases={_testCases}
      onChange={onChangeRef.current}
      timeLimit={timeLimit}
      memoryLimit={memoryLimit}
      direction={direction}
      enableAddSampleCases={readOnly ? false : !!enableAddSampleCases}
      enableAddCustomSampleCases={readOnly ? false : !!enableAddCustomSampleCases}
      isRunning={isRunning}
    />
  ), [ _testCases, timeLimit, memoryLimit, direction, readOnly, enableAddSampleCases, enableAddCustomSampleCases, isRunning ]);
  
  const body = (
    <div
      className={classNames(
        'jk-code-mirror-editor-layout jk-border-radius-inline',
        { 'elevation-3': expanded },
        className,
      )}
      style={twoRows ? { '--options-header-height': '80px' } as CSSProperties : {}}
    >
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onChange={onChangeRef.current}
        tabSize={tabSize}
        fontSize={fontSize}
      />
      <Header
        headerRef={headerRef}
        headerWidthContainer={headerWidthContainer}
        twoRows={twoRows}
        language={language}
        languages={languages}
        sourceCode={sourceCode}
        testCases={_testCases || {}}
        centerOptions={({ widthContainer, twoRows, withLabels }) => centerButtons?.({
          isRunning,
          readOnly,
          sourceCode,
          languages,
          language,
          testCases: _testCases || {},
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
          testCases: _testCases || {},
          twoRows,
          withLabels,
        })}
        setShowSettings={setShowSettings}
        runId={runId}
        setRunId={setRunId}
        onChange={onChangeRef.current}
        timeLimit={timeLimit}
        memoryLimit={memoryLimit}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
        isRunning={isRunning}
        withoutRunCodeButton={!!withoutRunCodeButton}
        readOnly={!!readOnly}
      />
      <div className="editor-stdio-content">
        <SplitPane
          direction={direction}
          minSize={80}
          onlyFirstPane={!_testCases}
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
        <div style={{ position: 'absolute' }} className="jk-code-mirror-editor-expanded-layout">
          {body}
        </div>
      </Portal>
    );
  }
  
  return body;
};
