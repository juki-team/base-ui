import {
  CodeEditorTestCasesType,
  consoleWarn,
  ContentResponseType,
  PROGRAMMING_LANGUAGE,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { settings } from '../../../config';
import { classNames } from '../../../helpers';
import { authorizedRequest, cleanRequest } from '../../../services';
import {
  Button,
  ButtonLoader,
  ButtonLoaderOnClickType,
  FullscreenExitIcon,
  FullscreenIcon,
  PlayArrowIcon,
  Select,
  SettingsIcon,
  T,
  useNotification,
} from '../../index';
import { HeaderProps } from '../types';

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
  const { width: widthContainer = 0, ref } = useResizeDetector();
  const { width: widthLeftSection = 0, ref: refLeftSection } = useResizeDetector();
  const { width: widthRightSection = 0, ref: refRightSection } = useResizeDetector();
  const withRunCodeButton = !!Object.keys(testCases).length;
  const minWidth = withRunCodeButton ? 600 : 550;
  
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
      const request = cleanRequest<ContentResponseType<{ runId: string }>>(await authorizedRequest(...settings.JUKI_API.POST_CODE_RUN(JSON.stringify({
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
  const withLabels = widthContainer > minWidth;
  const twoRows = widthContainer < 400;
  const widthCenterContainer = widthContainer - widthLeftSection - widthRightSection;
  
  return (
    <div
      className={classNames('options-header-content jk-row', { 'two-rows': twoRows })}
      style={twoRows ? { '--options-header-height': '80px' } as CSSProperties : {}}
      ref={ref}
    >
      <div className={classNames('left-options cr-pl jk-row gap', { 'jk-col left gap': twoRows })} ref={refLeftSection}>
        <Select
          className="languages-selector"
          options={languages.map(language => ({ value: language, label: language }))}
          selectedOption={{ label: PROGRAMMING_LANGUAGE[language].label, value: PROGRAMMING_LANGUAGE[language].value }}
          onChange={({ value }) => onChange?.({ language: value })}
        />
        {withRunCodeButton && (
          <ButtonLoader
            size="tiny"
            type={(withLabels || twoRows) ? 'primary' : 'text'}
            extend={twoRows}
            icon={<PlayArrowIcon />}
            onClick={handleRunCode}
          >
            {(withLabels || twoRows) && <T>run</T>}
          </ButtonLoader>
        )}
      </div>
      <div className="center-options" style={{ width: widthCenterContainer }}>
        {centerOptions({ widthContainer: widthCenterContainer })}
      </div>
      <div className={classNames('right-options cr-pl', { 'jk-col gap': twoRows })} ref={refRightSection}>
        <Button size="tiny" type="text" onClick={() => setShowSettings(true)} icon={<SettingsIcon />}>
          {withLabels && <T>settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            size="tiny"
            type="text"
            onClick={() => setExpanded(prevState => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {withLabels && <T>{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
      </div>
    </div>
  );
};
