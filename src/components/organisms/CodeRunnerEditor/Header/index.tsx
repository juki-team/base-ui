import {
  cleanRequest,
  CodeEditorTestCasesType,
  CodeLanguage,
  consoleWarn,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
import { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import { authorizedRequest, classNames } from '../../../../helpers';
import { jukiApiManager } from '../../../../settings';
import { useWebsocketStore } from '../../../../stores/websocket/useWebsocketStore';
import { Button, T } from '../../../atoms';

import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { ButtonLoader } from '../../../molecules';
import { ErrorIcon, FullscreenExitIcon, FullscreenIcon, PlayArrowIcon, SettingsIcon } from '../../../server';
import { ButtonLoaderOnClickType, SetLoaderStatusOnClickType } from '../../../types';
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
    headerRef,
    headerWidthContainer,
    twoRows,
    files,
    currentFileName,
  } = props;
  
  const { addErrorNotification } = useJukiNotification();
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
  
  const handleRunCode: ButtonLoaderOnClickType = async (setStatus) => {
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
  const withLabels = headerWidthContainer > minWidth;
  const widthCenterContainer = headerWidthContainer - widthLeftSection - widthRightSection;
  
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
                : !(twoRows || withLabels) ? 'run' : ''}
              size={(twoRows || withLabels) ? 'tiny' : 'small'}
              type="primary"
              expand={twoRows}
              icon={<PlayArrowIcon />}
              onClick={handleRunCode}
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isConnected || !currentFile}
            >
              {(twoRows || withLabels) && <T className="tt-se">run</T>}
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
          data-tooltip-content={!(twoRows || withLabels) ? 'settings' : ''}
          data-tooltip-place="bottom-end"
          size={(twoRows || withLabels) ? 'tiny' : 'small'}
          type="light"
          onClick={() => setShowSettings(true)} icon={<SettingsIcon />}
        >
          {(twoRows || withLabels) && <T className="tt-se">settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={!(twoRows || withLabels) ? (expanded ? 'back' : 'expand') : ''}
            data-tooltip-place="bottom-end"
            size={(twoRows || withLabels) ? 'tiny' : 'small'}
            type="light"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {(twoRows || withLabels) && <T className="tt-se">{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
        {rightOptions({ withLabels, twoRows })}
      </div>
    </div>
  );
};
