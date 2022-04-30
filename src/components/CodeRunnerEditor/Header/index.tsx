import { consoleWarn, PROGRAMMING_LANGUAGE } from '@juki-team/commons';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { settings } from '../../../config';
import { authorizedRequest, cleanRequest } from '../../../services';
import { ContentResponseType, Status, SubmissionRunStatus } from '../../../types';
import {
  Button,
  ButtonLoader,
  ButtonLoaderOnClickType,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  PlayIcon,
  Select,
  SettingIcon,
  T,
  useNotification,
} from '../../index';
import { CodeEditorTestCasesType, HeaderProps } from '../types';


const MIN_WIDTH = 700;

export const Header = ({
  languages,
  sourceCode,
  language,
  onChange,
  testCases,
  setShowSettings,
  centerOptions,
  setRunId,
  timeLimit,
  memoryLimit,
  setErrorData,
  expanded,
  setExpanded,
}: HeaderProps) => {
  
  const { addErrorNotification } = useNotification();
  const { width = 0, ref } = useResizeDetector();
  
  const handleRunCode: ButtonLoaderOnClickType = async (setStatus) => {
    setStatus(Status.LOADING);
    const newTestCases: CodeEditorTestCasesType = {};
    for (const testKey in testCases) {
      newTestCases[testKey] = { ...testCases[testKey] };
      newTestCases[testKey].out = '';
      newTestCases[testKey].err = '';
      newTestCases[testKey].status = SubmissionRunStatus.NONE;
    }
    setErrorData({ status: SubmissionRunStatus.NONE, out: '', err: '', log: '' });
    onChange?.({ testCases: newTestCases });
    try {
      const request = cleanRequest<ContentResponseType<{ runId: string }>>(await authorizedRequest(...settings.UTILS_API.POST_CODE_RUN(JSON.stringify({
        language,
        source: sourceCode,
        inputs: Object.values(testCases).map(testCase => ({ key: testCase.key, source: testCase.in })),
        timeLimit,
        memoryLimit,
      }))));
      if (request?.success && request?.content?.runId) {
        setRunId(request.content.runId);
        setStatus(Status.SUCCESS);
      } else {
        addErrorNotification(request?.message);
        setRunId('');
        consoleWarn(request);
        setStatus(Status.ERROR);
      }
    } catch (error) {
      consoleWarn(error);
      setStatus(Status.ERROR);
    }
  };
  
  return (
    <div className="options-header-content" ref={ref}>
      <div className="left-options color-primary">
        <Select
          className="languages-selector"
          options={languages.map(language => ({ value: language, label: language }))}
          optionSelected={{ label: PROGRAMMING_LANGUAGE[language].label, value: PROGRAMMING_LANGUAGE[language].value }}
          onChange={({ value }) => onChange?.({ language: value })}
        />
        {!!Object.keys(testCases).length && (
          <ButtonLoader size="small" type="text" icon={<PlayIcon />} onClick={handleRunCode}>
            {width > MIN_WIDTH && <T>run code</T>}
          </ButtonLoader>
        )}
      </div>
      <div className="center-options">{centerOptions()}</div>
      <div className="right-options color-primary">
        <Button size="small" type="text" onClick={() => setShowSettings(true)} icon={<SettingIcon />}>
          {width > MIN_WIDTH && <T>settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            size="small"
            type="text"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
          >
            {width > MIN_WIDTH && <T>{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
      </div>
    </div>
  );
};