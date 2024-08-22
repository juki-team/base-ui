import {
  CodeEditorTestCasesType,
  consoleWarn,
  ContentResponseType,
  SocketEvent,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { jukiSettings } from '../../../../config';
import { RESIZE_DETECTOR_PROPS } from '../../../../constants';
import { authorizedRequest, classNames, cleanRequest } from '../../../../helpers';
import { useJukiNotification, useJukiUser } from '../../../../hooks';
import { Button, FullscreenExitIcon, FullscreenIcon, PlayArrowIcon, Select, SettingsIcon, T } from '../../../atoms';
import { ButtonLoader, ButtonLoaderOnClickType, SetLoaderStatusOnClickType } from '../../../molecules';
import { HeaderProps } from '../types';

export const Header = <T, >(props: HeaderProps<T>) => {
  
  const {
    languages,
    sourceCode,
    language,
    onChange,
    testCases,
    setShowSettings,
    centerOptions,
    rightOptions,
    runId,
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
  const { socket } = useJukiUser();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
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
      onChange?.({ testCases: newTestCases });
    };
    setStatus(Status.LOADING);
    clean(SubmissionRunStatus.RECEIVED);
    try {
      socket.unsubscribe(SocketEvent.RUN, runId);
      const { url, ...options } = jukiSettings.API.code.run({
        body: {
          language: language as string,
          source: sourceCode,
          inputs: Object.values(testCases).map(testCase => ({ key: testCase.key, source: testCase.in })),
          timeLimit,
          memoryLimit,
        },
      });
      const request = cleanRequest<ContentResponseType<{ runId: string }>>(
        await authorizedRequest(url, options),
      );
      
      if (request?.success && request?.content?.runId) {
        socket.subscribe(SocketEvent.RUN, request?.content?.runId);
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
        className={classNames('left-options cr-pd jk-row gap', { 'jk-col left gap': twoRows })}
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
              size="tiny"
              type="primary"
              extend={twoRows}
              icon={<PlayArrowIcon />}
              onClick={handleRunCode}
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!Object.keys(testCases).length}
            >
              {(twoRows || withLabels) && <T>run</T>}
            </ButtonLoader>
          </>
        )}
      </div>
      <div className="center-options flex-1" style={{ width: widthCenterContainer }}>
        {centerOptions({ widthContainer: widthCenterContainer, withLabels, twoRows })}
      </div>
      <div className={classNames('jk-row gap right-options cr-pd', { 'jk-col gap': twoRows })} ref={refRightSection}>
        <Button size="tiny" type="light" onClick={() => setShowSettings(true)} icon={<SettingsIcon />}>
          {(twoRows || withLabels) && <T>settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            size="tiny"
            type="light"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {withLabels && <T>{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
        {rightOptions({ withLabels, twoRows })}
      </div>
    </div>
  );
};
