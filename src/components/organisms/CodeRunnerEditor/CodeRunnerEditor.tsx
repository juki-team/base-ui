import {
  CodeEditorTestCasesType,
  CodeEditorTestCaseType,
  isCodeRunStatusMessageWebSocketResponseEventDTO,
  ONE_SECOND,
  ProfileSetting,
  PROGRAMMING_LANGUAGE,
  SubmissionRunStatus,
  SubscribeCodeRunStatusWebSocketEventDTO,
  WebSocketActionEvent,
} from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES, RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { useCheckAndStartServices } from '../../../hooks/useCheckAndStartServices';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { jukiApiSocketManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Portal, T } from '../../atoms';
import { CodeEditor, SplitPane } from '../../molecules';
import { CodeEditorPropertiesType } from '../../molecules/types';
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
    leftButtons,
    centerButtons,
    rightButtons,
    testCases,
    tabSize = 4,
    fontSize = 14,
    timeLimit = ONE_SECOND,
    memoryLimit = 1048576, // 1GB
    expandPosition,
    className,
    enableAddCustomSampleCases,
    enableAddSampleCases,
    withoutRunCodeButton,
    onlyCodeEditor,
  } = props;
  
  useCheckAndStartServices();
  const onChangeRef = useRef(_onChange);
  onChangeRef.current = readOnly ? undefined : _onChange;
  const [ isRunning, setIsRunning ] = useState(false);
  const [ runId, setRunId ] = useState('');
  const sessionId = useUserStore(state => state.user.sessionId);
  const preferredTheme = useUserStore(state => state.user.settings[ProfileSetting.THEME]);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ direction, setDirection ] = useState<'row' | 'column'>('row');
  const [ expanded, setExpanded ] = useState(false);
  const { viewPortSize } = useJukiUI();
  const { width: headerWidthContainer = 0, ref: headerRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  useEffect(() => {
    if (!runId) {
      return;
    }
    const event: SubscribeCodeRunStatusWebSocketEventDTO = {
      event: WebSocketActionEvent.SUBSCRIBE_CODE_RUN_STATUS,
      sessionId,
      runId,
    };
    jukiApiSocketManager.SOCKET.subscribe(event, (data) => {
      if (isCodeRunStatusMessageWebSocketResponseEventDTO(data)) {
        const fillTestCases = (status: SubmissionRunStatus, err: string, out: string, log: string) => {
          onChangeRef.current?.({
            onTestCasesChange: (prevState) => {
              const newTestCases: CodeEditorTestCasesType = { ...prevState };
              for (const testKey in newTestCases) {
                if (prevState[testKey]?.messageTimestamp && prevState[testKey].messageTimestamp > data.messageTimestamp) {
                  continue;
                }
                newTestCases[testKey] = {
                  ...newTestCases[testKey],
                  status,
                  err,
                  out,
                  log,
                  messageTimestamp: data.messageTimestamp,
                };
              }
              return newTestCases;
            },
          });
        };
        const status = data.status || SubmissionRunStatus.NONE;
        const inputKey = data?.log?.inputKey;
        
        switch (status) {
          case SubmissionRunStatus.FAILED:
          case SubmissionRunStatus.COMPILING:
          // case SubmissionRunStatus.RUNNING_TEST_CASES:
          case SubmissionRunStatus.COMPILED:
          case SubmissionRunStatus.COMPILATION_ERROR:
            fillTestCases(
              status,
              data.log?.err || '',
              data.log?.out || '',
              data.log?.log || '',
            );
            break;
          case SubmissionRunStatus.RUNNING_TEST_CASE:
          case SubmissionRunStatus.EXECUTED_TEST_CASE:
          case SubmissionRunStatus.FAILED_TEST_CASE:
            onChangeRef.current?.({
              onTestCasesChange: (prevState) => {
                const newTestCases: CodeEditorTestCasesType = { ...prevState };
                if (inputKey && newTestCases[inputKey]) {
                  const testCase: CodeEditorTestCaseType = {
                    ...newTestCases[inputKey],
                    status,
                    out: data.log?.out || '',
                    log: data.log?.log || '',
                    err: data.log?.err || '',
                    messageTimestamp: data.messageTimestamp,
                  };
                  
                  if (prevState[testCase.key]?.messageTimestamp && prevState[testCase.key].messageTimestamp > testCase.messageTimestamp) {
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
        onChangeRef.current?.({ codeRunStatus: status });
      }
    });
    
    return () => {
      jukiApiSocketManager.SOCKET.unsubscribeAll(event);
    };
  }, [ runId, sessionId ]);
  
  const codeEditorOnChange = useCallback((props: CodeEditorPropertiesType<T>) => {
    onChangeRef.current?.({ ...props, isRunning: false });
    setIsRunning(false);
  }, []);
  
  const isMobileViewPort = viewPortSize === 'sm';
  
  const firstChild = useMemo(() => (
    <div className="editor-layout ht-100">
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
  
  const withTestCases = !!testCases;
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
      testCases={testCases}
      onChange={onChangeRef.current}
      timeLimit={timeLimit}
      memoryLimit={memoryLimit}
      direction={direction}
      enableAddSampleCases={readOnly ? false : !!enableAddSampleCases}
      enableAddCustomSampleCases={readOnly ? false : !!enableAddCustomSampleCases}
      isRunning={isRunning}
    />
  ), [ testCases, timeLimit, memoryLimit, direction, readOnly, enableAddSampleCases, enableAddCustomSampleCases, isRunning ]);
  
  const body = (
    <div
      className={classNames(
        'jk-code-mirror-editor-layout jk-border-radius-inline jk-col nowrap stretch bc-we ht-100 wh-100 pn-re',
        { 'elevation-1': expanded },
        className,
      )}
      style={{ overflow: expanded ? 'hidden' : undefined }}
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
        testCases={testCases || {}}
        leftOptions={({ widthContainer, twoRows, withLabels }) => leftButtons?.({
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
      <div className="flex-1 ow-hn">
        {onlyCodeEditor ? (
          firstChild
        ) : (
          <SplitPane
            direction={direction}
            minSize={80}
            onlyFirstPane={!testCases}
            closableSecondPane={closableSecondPane}
            closableFirstPane={closableFirstPane}
            toggleable
            onChangeDirection={setDirection}
            onePanelAtATime={isMobileViewPort}
            className="ht-100"
          >
            {firstChild}
            {secondChild}
          </SplitPane>
        )}
      </div>
    </div>
  );
  
  if (expanded) {
    return (
      <Portal>
        <div className="jk-overlay jk-overlay-backdrop">
          <div style={{ position: 'absolute', ...expandPosition }} className="jk-code-mirror-editor-expanded-layout">
            {body}
          </div>
        </div>
      </Portal>
    );
  }
  
  return body;
};
