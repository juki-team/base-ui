import {
  CODE_LANGUAGE,
  type CodeEditorTestCasesType,
  type   CodeEditorTestCaseType,
  CodeLanguage,
  isCodeRunStatusMessageWebSocketResponseEventDTO,
  ONE_SECOND,
  ProfileSetting,
  SubmissionRunStatus,
  type   SubscribeCodeRunStatusWebSocketEventDTO,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES, RESIZE_DETECTOR_PROPS } from '../../../../../constants';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { useWebsocketStore } from '../../../../../stores/websocket/useWebsocketStore';
import { Button, Input, Modal, Portal, T } from '../../../../atoms';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon, DeleteIcon, DraftIcon, EditIcon } from '../../../../atoms/server';
import { classNames } from '../../../../helpers';
import { useCheckAndStartServices } from '../../../../hooks/useCheckAndStartServices';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { SplitPane, TwoActionModal } from '../../../../molecules';
import type { CodeEditorPropertiesType } from '../../../../molecules/_lazy_/CodeEditor/types';
import { FirstPane } from './FirstPane';
import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import { TestCases } from './TestCases';
import type { CodeRunnerEditorProps } from './types';

export function CodeRunnerEditor<T, >(props: CodeRunnerEditorProps<T>) {
  
  const {
    readOnly,
    // sourceCode,
    languages = CODE_EDITOR_PROGRAMMING_LANGUAGES.map(lang => ({
      value: lang as T,
      label: CODE_LANGUAGE[lang]?.label || lang,
    })),
    // language,
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
    withoutDownloadCopyButton,
    onlyCodeEditor,
    files,
    currentFileName,
    triggerFocus,
  } = props;
  
  const { source = '', language = CodeLanguage.TEXT as T } = files?.[currentFileName] ?? {};
  
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
  const [ openFileName, setOpenFileName ] = useState('');
  const [ fileNameEdit, setFileNameEdit ] = useState('');
  const [ fileNameDelete, setFileNameDelete ] = useState('');
  const { viewPortSize } = useJukiUI();
  const { width: headerWidthContainer = 0, ref: headerRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const [ viewFiles, setViewFiles ] = useState<boolean>(false);
  
  const subscribeToEvent = useWebsocketStore(store => store.subscribeToEvent);
  
  useEffect(() => {
    if (!runId) {
      return;
    }
    const event: SubscribeCodeRunStatusWebSocketEventDTO = {
      event: WebSocketSubscriptionEvent.SUBSCRIBE_CODE_RUN_STATUS,
      sessionId,
      runId,
    };
    return subscribeToEvent(event, (message) => {
      const data = message.data;
      if (isCodeRunStatusMessageWebSocketResponseEventDTO(data)) {
        const fillTestCases = (status: SubmissionRunStatus, err: string, out: string, log: string) => {
          onChangeRef.current?.({
            onTestCasesChange: (prevState) => {
              const newTestCases: CodeEditorTestCasesType = { ...prevState };
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
            fillTestCases(
              status,
              data.log?.err || '',
              data.log?.out || '',
              data.log?.log || '',
            );
            break;
          // case SubmissionRunStatus.RUNNING_TEST_CASES:
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
  }, [ runId, sessionId, subscribeToEvent ]);
  
  const codeEditorOnChange = useCallback((props: CodeEditorPropertiesType<T>) => {
    onChangeRef.current?.({ ...props, isRunning: false });
    setIsRunning(false);
  }, []);
  
  const isMobileViewPort = viewPortSize === 'sm';
  
  const firstChild = useMemo(() => (
    <FirstPane {...{
      preferredTheme,
      codeEditorOnChange,
      language,
      readOnly,
      source,
      tabSize,
      fontSize,
      languages,
      onlyCodeEditor,
      triggerFocus,
    }} />
  ), [ preferredTheme, codeEditorOnChange, language, readOnly, source, tabSize, fontSize, languages, onlyCodeEditor, triggerFocus ]);
  
  const withTestCases = !!testCases;
  const twoRows = headerWidthContainer < (withoutRunCodeButton ? 340 : 420);
  
  const closableSecondPane = useMemo(() => (
    withTestCases
      ? { align: 'right' as const, expandLabel: <T className="label tx-t">test cases</T> }
      : undefined
  ), [ withTestCases ]);
  
  const closableFirstPane = useMemo(() => (
    (withTestCases && isMobileViewPort)
      ? { align: 'right' as const, expandLabel: <T className="label tx-t">code editor</T> }
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
  
  const onChange = () => {
    onChangeRef.current?.({ fileNameEdited: [ openFileName, fileNameEdit ] });
    setOpenFileName('');
  };
  
  const body = (
    <div
      className={classNames(
        'jk-code-mirror-editor-layout jk-br-ie jk-col nowrap stretch bc-we ht-100 wh-100 pn-re',
        { 'elevation-1': expanded },
        className,
      )}
      style={{ overflow: expanded ? 'hidden' : undefined }}
    >
      <TwoActionModal
        primary={{
          label: <T className="tt-se">delete</T>,
          onClick: () => {
            onChangeRef.current?.({ fileNameDeleted: fileNameDelete });
            setFileNameDelete('');
          },
        }}
        title={<T className="tt-se">warning</T>}
        isOpen={!!fileNameDelete}
        onClose={() => setFileNameDelete('')}
      >
        <div className="jk-col gap">
          <T className="tt-se">are you sure you want to delete the file?</T>
          <div className="jk-tag bc-hl">{fileNameDelete}</div>
          <T className="tt-se">{'it can\'t be undone'}</T>
        </div>
      </TwoActionModal>
      <Modal
        isOpen={!!openFileName}
        onClose={() => setOpenFileName('')}
      >
        <div className="jk-pg jk-col gap stretch">
          <Input
            label={<T className="tt-se">new name</T>}
            labelPlacement="top"
            value={fileNameEdit}
            onChange={setFileNameEdit}
            onEnter={onChange}
            expand
          />
          <div className="jk-row gap right">
            <Button type="light" onClick={() => setOpenFileName('')}>
              <T className="tt-se">cancel</T>
            </Button>
            <Button onClick={onChange}>
              <T className="tt-se">change</T>
            </Button>
          </div>
        </div>
      </Modal>
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
        languages={languages}
        testCases={testCases || {}}
        leftOptions={({ widthContainer, twoRows, withLabels }) => leftButtons?.({
          isRunning,
          // source,
          // language,
          testCases: testCases || {},
          widthContainer,
          twoRows,
          withLabels,
          files,
          currentFileName,
        })}
        centerOptions={({ widthContainer, twoRows, withLabels }) => centerButtons?.({
          isRunning,
          // source,
          // language,
          testCases: testCases || {},
          widthContainer,
          twoRows,
          withLabels,
          files,
          currentFileName,
        })}
        rightOptions={({ twoRows, withLabels }) => rightButtons?.({
          isRunning,
          // source,
          // language,
          testCases: testCases || {},
          twoRows,
          withLabels,
          files,
          currentFileName,
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
        withoutDownloadCopyButton={!!withoutDownloadCopyButton}
        readOnly={!!readOnly}
        files={files}
        currentFileName={currentFileName}
      />
      <div className="flex-1 ow-hn jk-row nowrap stretch">
        <div
          className="jk-col top stretch nowrap"
          style={{
            width: viewFiles ? 128 : 32,
            minWidth: viewFiles ? 128 : 32,
            maxWidth: viewFiles ? 128 : 32,
            borderRight: '1px solid var(--t-color-highlight-light)',
          }}
        >
          <div
            className="jk-row fw-bd jk-pg-xsm-tb bc-hl left hoverable"
            onClick={() => setViewFiles(!viewFiles)}
            style={{ paddingLeft: 4 }}
          >
            {viewFiles ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            {viewFiles && <T className="tt-se">files</T>}
          </div>
          <div className="jk-divider vertical tiny" style={{ height: 1 }} />
          <div className="jk-col top stretch gap nowrap ow-ao">
            <div className="jk-col stretch">
              {Object.entries(files)
                .sort(([ , a ], [ , b ]) => a.index - b.index)
                .map(([ name ], index) => (
                  <div
                    key={name}
                    className={classNames('tx-t jk-pg-xsm jk-col nowrap left stretch', {
                      'bc-pl cr-we': name === currentFileName,
                      'hoverable': name !== currentFileName,
                    })}
                    onClick={name !== currentFileName ? (() => onChangeRef.current?.({ fileName: name })) : undefined}
                  >
                    {viewFiles ? (
                      <>
                        {name}
                        <div className="jk-row gap space-between">
                          <DraftIcon letter={((index + 1) % 10) + ''} letterSize={12} size="tiny" />
                          <div className="jk-row gap">
                            <EditIcon
                              className={classNames({ 'cr-pl': name !== currentFileName })}
                              size="tiny"
                              filledCircle={name !== currentFileName ? 'var(--t-color-white)' : 'var(--t-color-primary)'}
                              onClick={() => {
                                setOpenFileName(name);
                                setFileNameEdit(name);
                              }}
                            />
                            <DeleteIcon
                              className={classNames({ 'cr-pl': name !== currentFileName })}
                              size="tiny"
                              filledCircle={name !== currentFileName ? 'var(--t-color-white)' : 'var(--t-color-primary)'}
                              onClick={() => setFileNameDelete(name)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <DraftIcon letter={((index + 1) % 10) + ''} letterSize={12} size="small" />
                    )}
                  </div>
                ))}
            </div>
            <div className="jk-row jk-pg-xsm-t border-top-highlight-light">
              <Button
                size="tiny"
                icon={<AddIcon />}
                disabled={readOnly}
                onClick={() => onChangeRef.current?.({ newFileName: true })}
              />
            </div>
          </div>
        </div>
        <div className="jk-row" style={{ width: `calc(100% - ${viewFiles ? 128 : 32}px)` }}>
          {Object.keys(files).length === 0 ? (
            <div className="jk-col gap jk-pg">
              <T className="tt-se">there are no files in the editor, create a new file to start using the editor</T>
              <Button onClick={() => onChangeRef.current?.({ newFileName: true })}>
                <T>create a new file</T>
              </Button>
            </div>
          ) : (
            onlyCodeEditor ? (
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
            )
          )}
        </div>
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
}
