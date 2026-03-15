import { CodeEditorFiles, Theme } from '@juki-team/commons';
import { Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../../constants';
import { classNames } from '../../../../helpers';
import { CodeEditor } from '../../../../molecules';
import type { CodeEditorPropertiesType } from '../../../../molecules/_lazy_/CodeEditor/types';
import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import {
  CodeEditorButtonsType,
  CodeEditorCenterButtonsPropertiesType,
  CodeEditorExpandPositionType,
  CodeRunnerEditorOnChangeType,
  Runner,
  RunState,
} from './types';

interface FirstPaneProps<T> {
  preferredTheme: Theme;
  language: T;
  readOnly?: boolean;
  source: string;
  tabSize: number;
  fontSize: number;
  languages: { value: T; label: ReactNode }[];
  onlyFirstPane?: boolean;
  triggerFocus?: number;
  withoutRunCodeButton?: boolean;
  //
  setExpanded: Dispatch<SetStateAction<boolean>>;
  files: CodeEditorFiles<T>;
  currentFileName: string;
  leftButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode;
  centerButtons?: CodeEditorButtonsType<T>;
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode;
  onChangeRef: RefObject<CodeRunnerEditorOnChangeType<T> | undefined>;
  runner: Omit<Runner, 'id' | 'isRunning'>;
  expandPosition?: CodeEditorExpandPositionType;
  expanded: boolean;
}

export const FirstPane = <T,>(props: FirstPaneProps<T>) => {
  const {
    preferredTheme,
    language,
    readOnly,
    source,
    tabSize,
    fontSize,
    languages,
    onlyFirstPane,
    triggerFocus,
    setExpanded,
    files,
    currentFileName,
    leftButtons,
    centerButtons,
    rightButtons,
    onChangeRef,
    runner: _runner,
    expanded,
    expandPosition,
    withoutRunCodeButton,
  } = props;

  const [runState, setRunState] = useState<RunState>({ id: '', running: false });
  const codeEditorOnChange = useCallback(
    (props: CodeEditorPropertiesType<T>) => {
      onChangeRef.current?.({ ...props, isRunning: false });
      setRunState((prev) => ({ ...prev, running: false }));
    },
    [onChangeRef],
  );

  const { width: headerWidthContainer = 0, height = 0, ref: headerRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);

  const runner: Runner = useMemo(
    () => ({
      ..._runner,
      id: runState.id,
      isRunning: runState.running,
    }),
    [_runner, runState],
  );

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={classNames('jk-col nowrap left stretch ht-100', { 'wh-100': !!onlyFirstPane })}>
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
        languages={languages}
        setRunState={setRunState}
        runner={runner}
        leftOptions={({ withLabels }) =>
          leftButtons?.({
            runner,
            withLabels,
            files,
            currentFileName,
          })
        }
        centerOptions={({ widthContainer, withLabels }) =>
          centerButtons?.({
            runner,
            widthContainer,
            withLabels,
            files,
            currentFileName,
          })
        }
        rightOptions={({ withLabels }) =>
          rightButtons?.({
            runner,
            withLabels,
            files,
            currentFileName,
          })
        }
        setShowSettings={setShowSettings}
        onRunStart={(id) => {
          setRunState({ id, running: false });
        }}
        onChangeRef={onChangeRef}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
        readOnly={!!readOnly}
        files={files}
        currentFileName={currentFileName}
        withoutRunCodeButton={withoutRunCodeButton}
      />
      <div className="ow-ao" style={{ height: `calc(100% - ${height}px)` }}>
        <CodeEditor
          theme={preferredTheme}
          onChange={codeEditorOnChange}
          language={language}
          readOnly={readOnly}
          source={source}
          tabSize={tabSize}
          fontSize={fontSize}
          triggerFocus={triggerFocus}
        />
      </div>
    </div>
  );
};
