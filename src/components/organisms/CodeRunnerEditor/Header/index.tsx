import {
  CodeEditorTestCasesType,
  consoleWarn,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import { authorizedRequest, classNames, cleanRequest } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks';
import { jukiApiSocketManager } from '../../../../settings';
import { useWebsocketStore } from '../../../../stores/websocket/useWebsocketStore';
import {
  Button,
  ErrorIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  PlayArrowIcon,
  Select,
  SettingsIcon,
  T,
} from '../../../atoms';
import { ButtonLoader } from '../../../molecules';
import { ButtonLoaderOnClickType, SetLoaderStatusOnClickType } from '../../../molecules/types';
import { HeaderProps } from '../types';

export const Header = <T, >(props: HeaderProps<T>) => {
  
  const {
    languages,
    sourceCode,
    language,
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
    readOnly,
    headerRef,
    headerWidthContainer,
    twoRows,
  } = props;
  
  const { addErrorNotification } = useJukiNotification();
  const { width: widthLeftSection = 0, ref: refLeftSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { width: widthRightSection = 0, ref: refRightSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  const isConnected = useWebsocketStore(state => state.isConnected);
  const connectionId = useWebsocketStore(state => state.connectionId);
  
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
        newTestCases[testKey] = { ...testCases[testKey] };
        newTestCases[testKey].out = '';
        newTestCases[testKey].err = '';
        newTestCases[testKey].status = status;
      }
      onChange?.({ onTestCasesChange: () => newTestCases });
    };
    setStatus(Status.LOADING);
    clean(SubmissionRunStatus.RECEIVED);
    try {
      const { url, ...options } = jukiApiSocketManager.API_V1.code.run({
        body: {
          language: language as string,
          source: sourceCode,
          inputs: Object.values(testCases).map(testCase => ({ key: testCase.key, source: testCase.in })),
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
      className={classNames('options-header-content jk-row', { 'two-rows': twoRows })}
      ref={headerRef}
    >
      <div
        className={classNames('cr-pd jk-row gap left', { 'jk-col left gap': twoRows, 'jk-row gap left': !twoRows })}
        ref={refLeftSection}
      >
        {readOnly ? (
          <div className="jk-tag info">
            {(languages.find(lang => lang.value === language)?.label || language) + ''}
          </div>
        ) : (
          <Select
            className="languages-selector"
            options={languages.map(language => ({
              value: language.value,
              label: (language.label || language.value) + '',
            }))}
            selectedOption={{
              value: language,
              label: (languages.find(lang => lang.value === language)?.label || language) + '',
            }}
            onChange={({ value }) => onChange?.({ language: value })}
            extend={twoRows}
          />
        )}
        {!withoutRunCodeButton && (
          <>
            <ButtonLoader
              data-tooltip-id="jk-tooltip"
              data-tooltip-content={!isConnected
                ? 'run the editor is not available yet'
                : !(twoRows || withLabels) ? 'run' : ''}
              size="tiny"
              type="primary"
              expand={twoRows}
              icon={<PlayArrowIcon />}
              onClick={handleRunCode}
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isConnected}
            >
              {(twoRows || withLabels) && <T>run</T>}
            </ButtonLoader>
            {!isConnected && (
              <ButtonLoader
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="offline, click to try to reconnect"
                className="jk-row bc-er"
                style={{ '--button-background-color': 'var(--t-color-error)' } as CSSProperties}
                onClick={async (setLoader) => {
                  setLoader(Status.LOADING);
                  if (jukiApiSocketManager.SOCKET.getReadyState() !== WebSocket.OPEN) {
                    await jukiApiSocketManager.SOCKET.connect();
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
        className={classNames('jk-row gap cr-pd', { 'jk-col gap': twoRows, 'jk-row right gap': !twoRows })}
        ref={refRightSection}
      >
        <Button
          data-tooltip-id="jk-tooltip"
          data-tooltip-content={!(twoRows || withLabels) ? 'settings' : ''}
          data-tooltip-place="bottom-end"
          size="tiny"
          type="light"
          onClick={() => setShowSettings(true)} icon={<SettingsIcon />}
        >
          {(twoRows || withLabels) && <T>settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={!(twoRows || withLabels) ? (expanded ? 'back' : 'expand') : ''}
            data-tooltip-place="bottom-end"
            size="tiny"
            type="light"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {(twoRows || withLabels) && <T>{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
        {rightOptions({ withLabels, twoRows })}
      </div>
    </div>
  );
};
