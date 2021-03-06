import React, { useEffect, useState } from 'react';
import { classNames } from '../../helpers';
import { useJkSocket } from '../../hooks/useJkSocket';
import { SubmissionRunStatus } from '../../types';
import { Portal } from '../Basic';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES, CodeEditor, CodeEditorKeyMap, CodeEditorTheme } from '../CodeEditor';
import { SplitPane } from '../SplitPane';
import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import { TestCases } from './TestCases';
import { CodeEditorTestCasesType, CodeRunnerEditorProps, SubmissionTestCaseType } from './types';

export const CodeRunnerEditor = ({
  readOnly,
  sourceCode,
  languages = CODE_EDITOR_PROGRAMMING_LANGUAGES,
  language,
  keyMap = CodeEditorKeyMap.SUBLIME,
  onChange,
  theme = CodeEditorTheme.IDEA,
  middleButtons,
  testCases,
  tabSize = 4,
  timeLimit = 1000,
  memoryLimit = 512000,
  expandPosition,
}: CodeRunnerEditorProps) => {
  const [runId, setRunId] = useState('');
  const { pop } = useJkSocket('message');
  const [errorData, setErrorData] = useState<SubmissionTestCaseType>({
    log: '',
    err: '',
    out: '',
    status: SubmissionRunStatus.NONE,
  });
  useEffect(() => {
    
    const cleanTestCases = (newTestCases: CodeEditorTestCasesType, status: SubmissionRunStatus) => {
      for (const testKey in newTestCases) {
        newTestCases[testKey] = {
          ...newTestCases[testKey],
          status,
          err: '',
          out: '',
          log: '',
        };
      }
      onChange?.({ testCases: newTestCases });
    };
    const data = pop();
    if (data?.success) {
      const newTestCases: CodeEditorTestCasesType = { ...testCases };
      if (data?.content?.status === SubmissionRunStatus.RECEIVED) {
        if (data?.content?.runId) {
          setRunId(data?.content?.runId);
          cleanTestCases(newTestCases, data?.content?.status);
          setErrorData({ err: '', log: '', out: '', status: SubmissionRunStatus.RECEIVED });
        }
      }
      if (runId === data?.content?.runId) {
        if (data?.content?.status === SubmissionRunStatus.COMPILING) {
          cleanTestCases(newTestCases, data?.content?.status);
          setErrorData({ err: '', log: '', out: '', status: SubmissionRunStatus.COMPILING });
        } else if (data?.content?.status === SubmissionRunStatus.FAILED || data?.content?.status === SubmissionRunStatus.COMPILED || data?.content?.status === SubmissionRunStatus.COMPILATION_ERROR) {
          cleanTestCases(newTestCases, data?.content?.status);
          setErrorData({
            err: data?.content?.err || '',
            log: data?.content?.log || '',
            out: data?.content?.out || '',
            status: data?.content?.status,
          });
        } else if (data?.content?.status === SubmissionRunStatus.RUNNING_TEST_CASE) {
          const inputKey = data?.content?.inputKey;
          if (inputKey && newTestCases[inputKey]) {
            newTestCases[inputKey] = {
              ...newTestCases[inputKey],
              status: data?.content?.status,
              out: '',
              log: '',
              err: '',
            };
            onChange?.({ testCases: newTestCases });
          }
        } else if (data?.content?.status === SubmissionRunStatus.EXECUTED_TEST_CASE || data?.content?.status === SubmissionRunStatus.FAILED_TEST_CASE) {
          const inputKey = data?.content?.inputKey;
          if (inputKey && newTestCases[inputKey]) {
            newTestCases[inputKey] = {
              ...newTestCases[inputKey],
              status: data?.content?.status,
              out: data?.content?.out,
              log: data?.content?.log,
              err: data?.content?.err,
            };
            onChange?.({ testCases: newTestCases });
          }
        } else if (data?.content?.status === SubmissionRunStatus.COMPLETED) {
          for (const testKey in newTestCases) {
            newTestCases[testKey] = {
              ...newTestCases[testKey],
              status: SubmissionRunStatus.NONE,
            };
          }
          onChange?.({ testCases: newTestCases });
        }
      }
    }
  }, [onChange, pop, runId, testCases]);
  const [showSettings, setShowSettings] = useState(false);
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [expanded, setExpanded] = useState(false);
  
  const body = (
    <div className={classNames('jk-code-mirror-editor-layout jk-border-radius-inline', { 'jk-shadow': expanded })}>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        keyMap={keyMap}
        theme={theme}
        onChange={onChange}
        tabSize={tabSize}
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
          keyMap,
          theme,
          testCases,
          widthContainer,
        })}
        setShowSettings={setShowSettings}
        setRunId={setRunId}
        onChange={onChange}
        timeLimit={timeLimit}
        memoryLimit={memoryLimit}
        setErrorData={setErrorData}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
      />
      <div className="editor-stdio-content">
        <SplitPane
          direction={direction}
          minSize={80}
          onlyFirstPane={!testCases}
          closablePane={testCases ? { align: 'right', pane: 'second' } : undefined}
          toggleOption
          onChangeDirection={setDirection}
        >
          <div className="editor-layout">
            <CodeEditor
              keyMap={keyMap}
              theme={theme}
              onChange={(props) => onChange?.(props)}
              language={language}
              readOnly={false}
              sourceCode={sourceCode}
              tabSize={tabSize}
            />
          </div>
          <TestCases
            testCases={testCases || {}}
            onChange={onChange}
            language={language}
            timeLimit={timeLimit}
            memoryLimit={memoryLimit}
            errorData={errorData}
            direction={direction}
          />
        </SplitPane>
      </div>
    </div>
  );
  
  if (expanded) {
    return (
      <Portal>
        <div style={{ position: 'absolute', ...expandPosition }} className="">
          {body}
        </div>
      </Portal>
    );
  }
  return body;
};

export * from './types';
