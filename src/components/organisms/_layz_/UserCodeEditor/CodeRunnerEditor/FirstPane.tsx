import { CodeEditorFiles, Theme } from '@juki-team/commons';
import { Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../../constants';
import { classNames } from '../../../../helpers';
import { CodeEditor } from '../../../../molecules';
import type { CodeEditorPropertiesType, EditorStateCache } from '../../../../molecules/_lazy_/CodeEditor/types';
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
  documentKey: string;
  editorStateCache: EditorStateCache;
  //
  setExpanded: Dispatch<SetStateAction<boolean>>;
  /** latest files at call time (stable function) */
  getFiles: () => CodeEditorFiles<T>;
  hasSource: boolean;
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
    getFiles,
    hasSource,
    currentFileName,
    leftButtons,
    centerButtons,
    rightButtons,
    onChangeRef,
    runner: _runner,
    expanded,
    expandPosition,
    withoutRunCodeButton,
    documentKey,
    editorStateCache,
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

  // Everything handed to the (memoized) Header must be stable while typing: no `files`/`source` here.
  const getCurrentFile = useCallback(() => getFiles()[currentFileName], [getFiles, currentFileName]);
  const slotProps = useMemo(
    () => ({ runner, currentFileName, language, hasSource, getFiles, getCurrentFile }),
    [runner, currentFileName, language, hasSource, getFiles, getCurrentFile],
  );
  const leftOptions = useCallback(
    ({ withLabels }: { withLabels: boolean }) => leftButtons?.({ ...slotProps, withLabels }),
    [leftButtons, slotProps],
  );
  const centerOptions = useCallback(
    ({ widthContainer, withLabels }: { widthContainer: number; withLabels: boolean }) =>
      centerButtons?.({ ...slotProps, widthContainer, withLabels }),
    [centerButtons, slotProps],
  );
  const rightOptions = useCallback(
    ({ withLabels }: { withLabels: boolean }) => rightButtons?.({ ...slotProps, withLabels }),
    [rightButtons, slotProps],
  );
  const onRunStart = useCallback((id: string) => setRunState({ id, running: false }), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <div className={classNames('jk-col nowrap left stretch ht-100', { 'wh-100': !!onlyFirstPane })}>
      <SettingsModal
        isOpen={showSettings}
        onClose={closeSettings}
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
        leftOptions={leftOptions}
        centerOptions={centerOptions}
        rightOptions={rightOptions}
        setShowSettings={setShowSettings}
        onRunStart={onRunStart}
        onChangeRef={onChangeRef}
        expanded={expandPosition ? expanded : null}
        setExpanded={setExpanded}
        readOnly={!!readOnly}
        currentFileName={currentFileName}
        language={language}
        hasSource={hasSource}
        getFiles={getFiles}
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
          documentKey={documentKey}
          stateCache={editorStateCache}
        />
      </div>
    </div>
  );
};
