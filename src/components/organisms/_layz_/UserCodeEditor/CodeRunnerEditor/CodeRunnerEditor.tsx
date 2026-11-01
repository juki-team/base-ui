import {
  CODE_LANGUAGE,
  CodeLanguage,
  ONE_SECOND,
  ProfileSetting,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
} from '@juki-team/commons';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { CODE_EDITOR_PROGRAMMING_LANGUAGES } from '../../../../../constants';
import { usePageStore } from '../../../../../stores/page/usePageStore';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { Button, Portal, T } from '../../../../atoms';
import { classNames } from '../../../../helpers';
import { useStableRef } from '../../../../hooks/useStableRef';
import { SplitPane } from '../../../../molecules';
import type { EditorStateCache } from '../../../../molecules/_lazy_/CodeEditor/types';
import MdMathEditor from '../../MdMathEditor/MdMathEditor';
import { FileTreePanel } from './FileTreePanel/FileTreePanel';
import type { FileTreeFiles } from './FileTreePanel/types';
import { FirstPane } from './FirstPane';
import { MdxRenderer } from './MdxViewer/MdxRenderer';
import { MermaidViewer } from './MermaidViewer/MermaidViewer';
import { TestCases } from './TestCases';
import { CodeRunnerEditorProps, Runner } from './types';

let defaultLanguages: { value: unknown; label: ReactNode }[] | undefined;
const getDefaultLanguages = <T,>() =>
  (defaultLanguages ??= CODE_EDITOR_PROGRAMMING_LANGUAGES.map((lang) => ({
    value: lang,
    label: (CODE_LANGUAGE[lang]?.label || lang) as ReactNode,
  }))) as { value: T; label: ReactNode }[];

export function CodeRunnerEditor<T>(props: CodeRunnerEditorProps<T>) {
  const {
    readOnly,
    languages: _languages,
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
    onlyCodeEditor,
    files,
    currentFileName,
    documentScope = '',
    triggerFocus,
    mdEditorRef,
    withoutRunCodeButton,
    mermaidTheme,
    mermaidConfigJson,
    mermaidFileName,
  } = props;

  const { source = '', language = CodeLanguage.TEXT as T } = files?.[currentFileName] ?? {};

  // Per-document CodeMirror states (undo history, selection, scroll). Owned here, above the pane that
  // gets remounted when toggling fullscreen, so the editor comes back exactly as it was.
  const editorStateCache = useRef<EditorStateCache>(new Map()).current;
  const getDocumentKey = (fileName: string) => `${documentScope}\u0000${fileName}`;
  const documentKey = getDocumentKey(currentFileName);

  // consumers usually build `languages` with .map() on every render; keep one stable reference per set of values
  const languagesKey = (_languages ?? []).map(({ value }) => String(value)).join('\u0000');
  const languagesRef = useStableRef(_languages);
  const languages = useMemo(
    () => languagesRef.current ?? getDefaultLanguages<T>(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [languagesKey, languagesRef],
  );

  // the file tree only needs metadata: a new object only when a file is added/removed/renamed/moved
  const treeSignature = Object.entries(files)
    .map(
      ([key, { name, folderPath, index, description }]) =>
        `${key}\u0001${name}\u0001${folderPath}\u0001${index}\u0001${description ?? ''}`,
    )
    .join('\u0002');
  const treeFiles = useMemo<FileTreeFiles>(
    () =>
      Object.fromEntries(
        Object.entries(files).map(([key, { name, folderPath, index, description }]) => [
          key,
          { name, folderPath, index, description },
        ]),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeSignature],
  );
  // drop cached states of deleted/renamed files (a re-created file must not inherit the old undo history)
  useEffect(() => {
    const liveKeys = new Set(Object.keys(treeFiles).map(getDocumentKey));
    for (const key of Array.from(editorStateCache.keys())) {
      if (!liveKeys.has(key)) {
        editorStateCache.delete(key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeFiles, documentScope]);

  const onChangeRef = useStableRef(readOnly ? undefined : _onChange);

  const preferredTheme = useUserStore((state) => state.user.settings[ProfileSetting.THEME]);

  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [expanded, setExpanded] = useState(false);

  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);

  const secondChild = useMemo(() => {
    if (RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES.includes(language as CodeLanguage)) {
      return (
        <TestCases
          testCases={testCases}
          timeLimit={timeLimit}
          memoryLimit={memoryLimit}
          onChangeRef={onChangeRef}
          direction={direction}
          enableAddSampleCases={readOnly ? false : !!enableAddSampleCases}
          enableAddCustomSampleCases={readOnly ? false : !!enableAddCustomSampleCases}
          readOnly={!!readOnly}
        />
      );
    }
    if (language === CodeLanguage.MERMAID) {
      return (
        <MermaidViewer source={source} mermaidTheme={mermaidTheme} configJson={mermaidConfigJson} fileName={mermaidFileName} />
      );
    }
    if (language === CodeLanguage.MDX) {
      return (
        <div className="ht-100 wh-100 ow-ao jk-pg-xsm">
          <MdxRenderer source={source} />
        </div>
      );
    }
    if (language === CodeLanguage.MARKDOWN) {
      return (
        <MdMathEditor
          ref={mdEditorRef}
          className="ow-ao ht-100"
          value={source}
          onChange={(source) => onChangeRef?.current?.({ source })}
        />
      );
    }

    return null;
  }, [
    source,
    language,
    testCases,
    timeLimit,
    memoryLimit,
    onChangeRef,
    direction,
    readOnly,
    enableAddSampleCases,
    enableAddCustomSampleCases,
    mdEditorRef,
    mermaidTheme,
    mermaidConfigJson,
    mermaidFileName,
  ]);

  const hasSecondPane = secondChild != null;
  const onlyFirstPane = onlyCodeEditor || !hasSecondPane;
  const runner: Omit<Runner, 'id' | 'isRunning'> = useMemo(
    () => ({
      testCases: testCases || {},
      timeLimit,
      memoryLimit,
      enableAddSampleCases: !!enableAddSampleCases,
      enableAddCustomSampleCases: !!enableAddCustomSampleCases,
    }),
    [enableAddCustomSampleCases, enableAddSampleCases, memoryLimit, testCases, timeLimit],
  );
  const firstChild = useMemo(
    () => (
      <FirstPane
        {...{
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
          runner,
          expandPosition,
          expanded,
          withoutRunCodeButton,
          documentKey,
          editorStateCache,
        }}
      />
    ),
    [
      preferredTheme,
      language,
      readOnly,
      source,
      tabSize,
      fontSize,
      languages,
      onlyFirstPane,
      triggerFocus,
      files,
      currentFileName,
      leftButtons,
      centerButtons,
      rightButtons,
      onChangeRef,
      runner,
      expandPosition,
      expanded,
      withoutRunCodeButton,
      documentKey,
      editorStateCache,
    ],
  );

  const closableSecondPane = useMemo(
    () => (hasSecondPane ? { align: 'right' as const, expandLabel: <T className="label tx-t">test cases</T> } : undefined),
    [hasSecondPane],
  );

  const closableFirstPane = useMemo(
    () =>
      hasSecondPane && isSmallScreen
        ? { align: 'right' as const, expandLabel: <T className="label tx-t">code editor</T> }
        : undefined,
    [hasSecondPane, isSmallScreen],
  );

  const { ref, width = 0 } = useResizeDetector();

  const body = (
    <div
      className={classNames(
        'jk-code-mirror-editor-layout jk-br-ie jk-col nowrap stretch bc-sf-md ht-100 wh-100 pn-re',
        { 'elevation-1': expanded },
        className,
      )}
      style={{ overflow: expanded ? 'hidden' : undefined }}
    >
      <div className="flex-1 ow-hn jk-row nowrap stretch">
        <FileTreePanel
          fileTreePanelRef={ref}
          files={treeFiles}
          currentFileName={currentFileName}
          onChangeRef={onChangeRef}
          readOnly={readOnly}
        />
        <div className="jk-row transition-width flex-1" style={{ width: `calc(100% - ${width}px)` }}>
          {Object.keys(files).length === 0 ? (
            <div className="jk-col gap jk-pg">
              <T className="tt-se">there are no files in the editor, create a new file to start using the editor</T>
              <Button type="secondary" onClick={() => onChangeRef.current?.({ newFileName: '' })}>
                <T className="tt-se">create a new file</T>
              </Button>
            </div>
          ) : onlyFirstPane ? (
            firstChild
          ) : (
            <SplitPane
              direction={direction}
              minSize={80}
              onlyFirstPane={!hasSecondPane}
              closableSecondPane={closableSecondPane}
              closableFirstPane={closableFirstPane}
              toggleable
              onChangeDirection={setDirection}
              onePanelAtATime={isSmallScreen}
              className="ht-100"
            >
              {firstChild}
              {secondChild}
            </SplitPane>
          )}
        </div>
      </div>
    </div>
  );

  if (expanded) {
    return (
      <Portal>
        <div className="jk-overlay jk-overlay-backdrop">
          <div style={{ position: 'absolute', ...expandPosition }}>{body}</div>
        </div>
      </Portal>
    );
  }

  return body;
}
