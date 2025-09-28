import {
  cleanRequest,
  CodeEditorTestCasesType,
  CodeLanguage,
  consoleWarn,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
// @ts-ignore
import domToImage from 'dom-to-image-more';
import { useCallback, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../../../constants';
import { jukiApiManager } from '../../../../../../settings';
import { useWebsocketStore } from '../../../../../../stores/websocket/useWebsocketStore';
import { Button, Select, T } from '../../../../../atoms';
import { authorizedRequest, classNames, downloadBlobAsFile } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { useKeyPress } from '../../../../../hooks/useKeyPress';
import { ButtonLoader, CodeViewer } from '../../../../../molecules';
import {
  ContentCopyIcon,
  DownloadIcon,
  ErrorIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  PlayArrowIcon,
  SettingsIcon,
} from '../../../../../server';
import { SetLoaderStatusOnClickType } from '../../../../../types';
import type { HeaderProps } from '../types';

export const Header = <T, >(props: HeaderProps<T>) => {
  
  const {
    onChange,
    testCases,
    setShowSettings,
    leftOptions,
    centerOptions,
    rightOptions,
    setRunId,
    timeLimit,
    memoryLimit,
    expanded,
    setExpanded,
    isRunning,
    withoutRunCodeButton,
    withoutDownloadCopyButton,
    headerRef,
    headerWidthContainer,
    twoRows,
    files,
    currentFileName,
  } = props;
  
  const { addErrorNotification, addQuietNotification } = useJukiNotification();
  const { width: widthLeftSection = 0, ref: refLeftSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { width: widthRightSection = 0, ref: refRightSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  const isConnected = useWebsocketStore(state => state.isConnected);
  const connectionId = useWebsocketStore(state => state.connectionId);
  const websocket = useWebsocketStore(state => state.websocket);
  
  const currentFile = files[currentFileName];
  
  useEffect(() => {
    if (isRunning) {
      setLoaderRef.current?.(Status.LOADING);
    } else {
      setLoaderRef.current?.(Status.NONE);
    }
  }, [ isRunning ]);
  const minWidth = !withoutRunCodeButton ? 620 : 570;
  
  const handleRunCode: (setLoaderStatus: SetLoaderStatusOnClickType) => Promise<void> = async (setStatus) => {
    const clean = (status: SubmissionRunStatus) => {
      const newTestCases: CodeEditorTestCasesType = {};
      for (const testKey in testCases) {
        if (testCases[testKey]) {
          newTestCases[testKey] = { ...testCases[testKey] };
          newTestCases[testKey].log = '0\n0\n0\n';
          newTestCases[testKey].out = '';
          newTestCases[testKey].err = '';
          newTestCases[testKey].status = status;
        }
      }
      onChange?.({ onTestCasesChange: () => newTestCases });
    };
    setStatus(Status.LOADING);
    clean(SubmissionRunStatus.RECEIVED);
    try {
      const { url, ...options } = jukiApiManager.API_V1.code.run({
        body: {
          files: [
            ...Object.values(files).map(({ language, source, name }) => ({
              language: language as CodeLanguage,
              source,
              fullFileName: name,
              isInput: false,
              isEntryPoint: name === currentFileName,
              toCompile: name === currentFileName,
            })),
            ...(Object.values(testCases).map(testCase => ({
              fullFileName: `${testCase.key}.in`,
              language: CodeLanguage.TEXT,
              source: testCase.in,
              isInput: true,
              isEntryPoint: false,
              toCompile: false,
            }))),
          ],
          timeLimit,
          memoryLimit,
          connectionId,
        },
      });
      const request = cleanRequest<ContentResponseType<{ runId: string }>>(
        await authorizedRequest(url, options),
      );
      
      if (request?.success && request?.content?.runId) {
        setRunId(request.content.runId);
        setStatus(Status.SUCCESS);
      } else {
        addErrorNotification(request?.message);
        setRunId('');
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
  const handleRunCodeRef = useRef(handleRunCode);
  handleRunCodeRef.current = handleRunCode;
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      (e.ctrlKey && e.key.toLowerCase() === 's') ||
      (e.metaKey && e.key.toLowerCase() === 's')
    ) {
      e.preventDefault();
      if (setLoaderRef.current) {
        void handleRunCodeRef.current(setLoaderRef.current);
      }
    }
  }, []);
  
  useKeyPress(handleKeyDown);
  
  const withLabels = headerWidthContainer > minWidth;
  const widthCenterContainer = headerWidthContainer - widthLeftSection - widthRightSection;
  
  const toPng = async () => {
    const cmThemeNode = document.querySelector('.code-viewer-to-print');
    if (!cmThemeNode) {
      return;
    }
    try {
      return await domToImage.toBlob(cmThemeNode);
    } catch (error) {
      console.error('Error al capturar imagen:', error);
    }
  };
  
  const { source = '', name = '', language = CodeLanguage.TEXT } = files[currentFileName] ?? {};
  
  const withText = twoRows || withLabels;
  
  return (
    <div
      className={classNames('options-header-content jk-row jk-pg-xsm', { 'two-rows': twoRows })}
      ref={headerRef}
    >
      <div
        className={classNames('cr-th jk-row gap left', { 'jk-col left gap': twoRows, 'jk-row gap left': !twoRows })}
        ref={refLeftSection}
      >
        {!withoutRunCodeButton && (
          <>
            <ButtonLoader
              data-tooltip-id="jk-tooltip"
              data-tooltip-content={!isConnected
                ? 'run the editor is not available yet'
                : !withText ? 'run' : ''}
              size={withText ? 'tiny' : 'small'}
              type="primary"
              expand={twoRows}
              icon={<PlayArrowIcon />}
              onClick={handleRunCode}
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isConnected || !currentFile}
            >
              {withText && <T className="tt-se">run</T>}
            </ButtonLoader>
            {!isConnected && (
              <ButtonLoader
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="offline, click to try to reconnect"
                className="jk-row bc-er"
                onClick={async (setLoader) => {
                  setLoader(Status.LOADING);
                  if (websocket.getReadyState() !== WebSocket.OPEN) {
                    await websocket.reconnect();
                  }
                  setLoader(Status.NONE);
                }}
                icon={<ErrorIcon />}
                size="small"
              />
            )}
          </>
        )}
        {!withoutDownloadCopyButton && (
          <div className="jk-row gap">
            <div className="code-viewer-to-print bc-we jk-pg jk-br-ie">
              <CodeViewer code={source} language={language as CodeLanguage} />
            </div>
            <Select
              options={[
                { value: 'download-text', label: <T className="tt-se">download as file</T> },
                { value: 'download-png', label: <T className="tt-se">download as png</T> },
                { value: 'copy-text', label: <T className="tt-se">copy as text</T> },
                { value: 'copy-png', label: <T className="tt-se">copy as png</T> },
              ]}
              // size={(twoRows || withLabels) ? 'tiny' : 'small'}
              disabled={!source}
              selectedOption={{
                value: '',
                label: withText
                  ? <T className="tt-se tx-s">copy or download</T>
                  : <><DownloadIcon size="small" /> / <ContentCopyIcon size="small" /></>,
              }}
              containerWidth={withText ? undefined : 'child'}
              onChange={async ({ value }) => {
                if (source) {
                  switch (value) {
                    case 'download-text':
                      downloadBlobAsFile(source as unknown as Blob, name);
                      addQuietNotification(<T className="tt-se">downloaded</T>);
                      break;
                    case 'download-png':
                      downloadBlobAsFile(await toPng(), `${name}.png`);
                      addQuietNotification(<T className="tt-se">downloaded</T>);
                      break;
                    case 'copy-text':
                      try {
                        await navigator.clipboard.writeText(source);
                        addQuietNotification(<T className="tt-se">copied</T>);
                      } catch (err) {
                        console.error('Failed to copy:', err);
                      }
                      break;
                    case 'copy-png':
                      try {
                        await navigator.clipboard.write([
                          new ClipboardItem({ 'image/png': await toPng() }),
                        ]);
                        addQuietNotification(<T className="tt-se">copied</T>);
                      } catch (err) {
                        console.error('Failed to copy image:', err);
                      }
                      break;
                  }
                }
              }}
            />
          </div>
        )}
        {leftOptions({ widthContainer: widthCenterContainer, withLabels, twoRows })}
      </div>
      <div className="jk-row flex-1" style={{ width: widthCenterContainer }}>
        {centerOptions({ widthContainer: widthCenterContainer, withLabels, twoRows })}
      </div>
      <div
        className={classNames('jk-row gap cr-th', { 'jk-col gap': twoRows, 'jk-row right gap': !twoRows })}
        ref={refRightSection}
      >
        <Button
          data-tooltip-id="jk-tooltip"
          data-tooltip-content={!withText ? 'settings' : ''}
          data-tooltip-place="bottom-end"
          size={withText ? 'tiny' : 'small'}
          type="light"
          onClick={() => setShowSettings(true)} icon={<SettingsIcon />}
        >
          {withText && <T className="tt-se">settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={!withText ? (expanded ? 'back' : 'expand') : ''}
            data-tooltip-place="bottom-end"
            size={withText ? 'tiny' : 'small'}
            type="light"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {withText && <T className="tt-se">{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
        {rightOptions({ withLabels, twoRows })}
      </div>
    </div>
  );
};
