import {
  CodeEditorTestCasesType,
  consoleWarn,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { jukiSettings } from '../../../../config';
import { authorizedRequest, classNames, cleanRequest } from '../../../../helpers';
import { useNotification } from '../../../../hooks';
import { Button, FullscreenExitIcon, FullscreenIcon, PlayArrowIcon, Select, SettingsIcon, T } from '../../../atoms';
import { ButtonLoader, ButtonLoaderOnClickType } from '../../../molecules';
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
    setRunId,
    timeLimit,
    memoryLimit,
    expanded,
    setExpanded,
  } = props;
  
  const { addErrorNotification } = useNotification();
  const { width: widthContainer = 0, ref } = useResizeDetector();
  const { width: widthLeftSection = 0, ref: refLeftSection } = useResizeDetector();
  const { width: widthRightSection = 0, ref: refRightSection } = useResizeDetector();
  const withRunCodeButton = !!Object.keys(testCases).length;
  const minWidth = withRunCodeButton ? 620 : 570;
  
  const handleRunCode: ButtonLoaderOnClickType = async (setStatus) => {
    setStatus(Status.LOADING);
    const newTestCases: CodeEditorTestCasesType = {};
    for (const testKey in testCases) {
      newTestCases[testKey] = { ...testCases[testKey] };
      newTestCases[testKey].out = '';
      newTestCases[testKey].err = '';
      newTestCases[testKey].status = SubmissionRunStatus.NONE;
    }
    onChange?.({ testCases: newTestCases });
    try {
      const { url, ...options } = jukiSettings.getAPI().code.run({
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
        setRunId(request.content.runId);
        setStatus(Status.SUCCESS);
      } else {
        addErrorNotification(request?.message);
        setRunId('');
        consoleWarn('run code request failed', { request });
        setStatus(Status.ERROR);
      }
    } catch (error) {
      consoleWarn('error on run code', { error });
      setStatus(Status.ERROR);
    }
  };
  const withLabels = widthContainer > minWidth;
  const twoRows = widthContainer < 420;
  const widthCenterContainer = widthContainer - widthLeftSection - widthRightSection;
  
  return (
    <div
      className={classNames('options-header-content jk-row', { 'two-rows': twoRows })}
      style={twoRows ? { '--options-header-height': '80px' } as CSSProperties : {}}
      ref={ref}
    >
      <div
        className={classNames('left-options cr-pl jk-row gap', { 'jk-col left gap flex-1': twoRows })}
        ref={refLeftSection}
      >
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
        {withRunCodeButton && (
          <ButtonLoader
            size="tiny"
            type="primary"
            extend={twoRows}
            icon={<PlayArrowIcon />}
            onClick={handleRunCode}
          >
            <T>run</T>
          </ButtonLoader>
        )}
      </div>
      <div className="center-options" style={{ width: widthCenterContainer }}>
        {centerOptions({ widthContainer: widthCenterContainer })}
      </div>
      <div className={classNames('jk-row gap right-options cr-py', { 'jk-col gap': twoRows })} ref={refRightSection}>
        <Button size="tiny" type="light" onClick={() => setShowSettings(true)} icon={<SettingsIcon />}>
          {withLabels && <T>settings</T>}
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
      </div>
    </div>
  );
};
