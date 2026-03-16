import {
  CODE_LANGUAGE,
  CodeEditorFile,
  type CodeEditorFiles,
  type CodeEditorTestCases,
  CodeLanguage,
  isStringJson,
  removeExtension,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import type { RefAttributes } from 'react';
import {
  type Dispatch,
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { EMPTY_OBJECT } from '../../../../constants';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { T } from '../../../atoms';
import {
  getEditorSettingsStorageKey,
  getSettingsStoreKey,
  getSourcesStoreKey,
  getTestCasesStoreKey,
  normalizeFolderPath,
} from '../../../helpers';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { useStableRef } from '../../../hooks/useStableRef';
import { useSyncedState } from '../../../hooks/useSyncedState';
import type { MdMathEditorHandle } from '../MdMathEditor/types';
import { CodeRunnerEditor } from './CodeRunnerEditor/CodeRunnerEditor';
import type { CodeRunnerEditorPropertiesType } from './CodeRunnerEditor/types';
import type { UserCodeEditorHandle, UserCodeEditorProps } from './types';

function getStoreRecovered(storeKey: string | undefined) {
  let storeRecovered = {};
  if (typeof localStorage !== 'undefined') {
    const localStorageData = storeKey ? localStorage.getItem(storeKey) || '{}' : '{}';
    if (isStringJson(localStorageData)) {
      storeRecovered = JSON.parse(localStorageData);
    }
  }
  return storeRecovered;
}

function useSaveStorage<T extends Record<string, unknown>>(
  storeKey: string | undefined,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const storeRecovered = getStoreRecovered(storeKey);
  const [value, setValue] = useState<T>({ ...defaultValue, ...storeRecovered });

  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const storeRecoveredRef = useRef(storeRecovered);
  storeRecoveredRef.current = storeRecovered;

  useEffect(() => {
    setValue({ ...defaultValueRef.current, ...storeRecoveredRef.current });
  }, [storeKey]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (storeKey) {
        const stringValue = JSON.stringify(value);
        if (localStorage.getItem(storeKey) !== stringValue) {
          localStorage.setItem(storeKey, stringValue);
        }
      }
    }, 300);
    return () => clearTimeout(id);
  }, [storeKey, value]);

  return [value, setValue];
}

function useSaveChunkStorage<T extends Record<string, unknown>>(
  storeKey: string,
  initialValue: StorageType<T>,
  merge: (a: T, b: T | undefined) => T,
  formatStoreRecovered: (recovered: unknown) => StorageType<T>,
): [StorageType<T>, Dispatch<SetStateAction<StorageType<T>>>] {
  // const initialValueString = JSON.stringify(initialValue);
  const mergeRef = useStableRef(merge);
  const formatStoreRecoveredRef = useStableRef(formatStoreRecovered);

  const mergeState = useCallback(() => {
    // let initialValue: StorageType<T> = {};
    // if (isStringJson(initialValueString)) {
    //   initialValue = JSON.parse(initialValueString);
    // }
    const newState: StorageType<T> = {};
    const storeRecovered = Object.entries(formatStoreRecoveredRef.current(getStoreRecovered(storeKey)));
    for (const [key, value] of Object.entries(initialValue)) {
      newState[key] = mergeRef.current(value, storeRecovered.find(([storeRecoveredKey]) => storeRecoveredKey === key)?.[1]);
    }
    for (const [key, value] of storeRecovered) {
      if (!newState[key]) {
        newState[key] = value;
      }
    }
    return newState;
  }, [storeKey, formatStoreRecoveredRef, mergeRef, initialValue]);

  const [value, setValue] = useState<StorageType<T>>(mergeState());

  useEffect(() => {
    setValue(mergeState());
  }, [mergeState]);

  useEffect(() => {
    const id = setTimeout(() => {
      const stringValue = JSON.stringify(value);
      if (localStorage.getItem(storeKey) !== stringValue) {
        localStorage.setItem(storeKey, stringValue);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [storeKey, value]);

  return [value, setValue];
}

type StorageType<T extends Record<string, unknown>> = {
  [key: string]: T;
};

const getDefaultFileName = (codeLanguage: CodeLanguage) => CODE_LANGUAGE[codeLanguage]?.mainFilename ?? 'main.source';

const getExtension = (codeLanguage: unknown) => CODE_LANGUAGE[codeLanguage as CodeLanguage]?.fileExtension[0] ?? 'source';

const getFileKey = (folderPath: string, name: string) => (folderPath ? `${folderPath}/${name}` : name);

const mergeTestCases = (a: CodeEditorTestCases, b: CodeEditorTestCases | undefined): CodeEditorTestCases => {
  const newTestCases: CodeEditorTestCases = {};
  for (const [key, testCase] of Object.entries(a)) {
    newTestCases[key] = {
      ...testCase,
      out: b?.[key]?.out ?? testCase?.out ?? '',
      err: b?.[key]?.err ?? testCase?.err ?? '',
      log: b?.[key]?.log ?? testCase?.log ?? '',
      status: b?.[key]?.status ?? testCase?.status ?? SubmissionRunStatus.NONE,
      messageTimestamp: b?.[key]?.messageTimestamp ?? testCase?.messageTimestamp ?? 0,
    };
    if (key === '*') {
      newTestCases[key].in = b?.[key]?.in ?? testCase?.in ?? '';
    }
  }

  for (const [key, testCase] of Object.entries(b ?? {})) {
    if (!newTestCases[key]) {
      newTestCases[key] = testCase;
    }
  }
  return newTestCases;
};

const mergeSources = <T,>(a: CodeEditorFiles<T>, b: CodeEditorFiles<T> | undefined): CodeEditorFiles<T> => {
  return { ...b, ...a };
};

const getNewFileName = (prefix: string, suffix: string, exist: (name: string) => boolean) => {
  let newFile = `${prefix}${suffix}`;
  let i = 1;
  while (exist(newFile)) {
    newFile = `${prefix}(${i})${suffix}`;
    i++;
  }
  return newFile;
};

type SettingsStore = { lastFileName: string };

const formatSettingsStoreRecovered = (recovered: unknown): StorageType<SettingsStore> => {
  const state: StorageType<SettingsStore> = {};
  for (const [key, value] of Object.entries(recovered || {})) {
    state[key] = {
      lastFileName:
        typeof (value as { lastFileName?: string })?.lastFileName === 'string'
          ? (value as { lastFileName: string }).lastFileName
          : '',
    };
  }
  return state;
};

const formatStoreRecovered =
  <T,>(languages: UserCodeEditorProps<T>['languages']) =>
  (recovered: unknown): StorageType<CodeEditorFiles<T>> => {
    const state: StorageType<CodeEditorFiles<T>> = {};
    for (const [key, value] of Object.entries(recovered || {})) {
      state[key] = {};
      let index = 1;
      for (const [lang, source] of Object.entries(value || {})) {
        if (typeof source === 'string') {
          const name = `source-${index}.${getExtension(lang as CodeLanguage)}`;
          state[key][name] = {
            source,
            language: languages?.some(({ value }) => value === lang) ? (lang as T) : (CodeLanguage.TEXT as T),
            index,
            name,
            hidden: false,
            protected: false,
            readonly: false,
            folderPath: '',
          };
          index++;
        } else if (typeof source === 'object' && source !== null) {
          const folderPath = normalizeFolderPath(
            'folderPath' in source && typeof source?.folderPath === 'string' ? source.folderPath : '',
          );
          const name = normalizeFolderPath('name' in source && typeof source?.name === 'string' ? source.name : '');
          const fileKey = getFileKey(folderPath, name);
          state[key][fileKey] = {
            source: 'source' in source && typeof source?.source === 'string' ? source?.source : '',
            language: (('language' in source && typeof source?.language === 'string'
              ? languages?.some(({ value }) => value === source?.language)
                ? (source?.language as T)
                : (CodeLanguage.TEXT as T)
              : '') || CodeLanguage.TEXT) as T,
            index: 'index' in source && typeof source?.index === 'number' ? source?.index : 0,
            name,
            hidden: 'hidden' in source && typeof source?.hidden === 'boolean' ? source.hidden : false,
            protected: 'protected' in source && typeof source?.protected === 'boolean' ? source.protected : false,
            readonly: 'readonly' in source && typeof source?.readonly === 'boolean' ? source.readonly : false,
            folderPath,
          };
        }
      }
    }

    for (const [key, value] of Object.entries(state)) {
      state[key] = {};
      for (const [, file] of Object.entries(value || {})) {
        if (!file.name) {
          file.name = getNewFileName(
            'recovered',
            `.${getExtension(file.language)}`,
            (name) => !!value?.[getFileKey(file.folderPath, name)],
          );
        }
        state[key][getFileKey(file.folderPath, file.name)] = file;
      }
    }

    return state;
  };

type CodeEditorSettingsStore<T> = {
  theme: Theme;
  lastLanguageUsed: T;
  tabSize: number;
  fontSize: number;
};

const formatTestCasesStoreRecover = (recovered: unknown): StorageType<CodeEditorTestCases> => {
  const state: StorageType<CodeEditorTestCases> = {};
  for (const [key, value] of Object.entries(recovered || {})) {
    state[key] = {};
    for (const [caseKey, caseValue] of Object.entries(value as object)) {
      if (caseValue?.sample === false) {
        state[key][caseKey] = {
          key: caseKey,
          in: caseValue?.in || '',
          testOut: caseValue?.testOut || '',
          withPE: caseValue?.withPE || false,
          sample: false,
          hidden: caseValue?.hidden || false,
          index: caseValue?.index ?? -1,
          messageTimestamp: caseValue?.messageTimestamp ?? 0,
          out: caseValue?.out || '',
          err: caseValue?.err || '',
          log: caseValue?.log || '',
          status: caseValue?.status || SubmissionRunStatus.NONE,
        };
      }
    }
  }
  return state;
};

const getNewInitialTestCases = (testCaseStoreKey: string, initialTestCases: CodeEditorTestCases) => {
  const response: StorageType<CodeEditorTestCases> = { [testCaseStoreKey]: { ...initialTestCases } };
  if (Object.keys(initialTestCases).length === 0) {
    response[testCaseStoreKey]!['*'] = {
      key: '*',
      in: '',
      testOut: '',
      withPE: false,
      sample: false,
      hidden: false,
      index: -1,
      messageTimestamp: 0,
      out: '',
      err: '',
      log: '',
      status: SubmissionRunStatus.NONE,
    };
  }
  return response;
};

function UserCodeEditorInner<T>(props: UserCodeEditorProps<T>, ref: ForwardedRef<UserCodeEditorHandle<T>>) {
  const {
    className,
    expandPosition,
    initialTestCases = {},
    initialFileName,
    storeKey,
    languages,
    leftButtons,
    centerButtons,
    rightButtons,
    onFilesChange,
    onCurrentFileNameChange,
    onTestCasesChange,
    initialFiles,
    enableAddSampleCases,
    enableAddCustomSampleCases,
    onIsRunningChange,
    readOnly,
    onCodeRunStatusChange,
    onlyCodeEditor,
    withoutRunCodeButton,
    mermaidTheme,
    mermaidConfigJson,
    mermaidFileName,
  } = props;

  const userNickname = useUserStore((state) => state.user.nickname);
  const { addErrorNotification } = useJukiNotification();

  const editorSettingsStorageKey = getEditorSettingsStorageKey(userNickname);

  const [editorSettings, setEditorSettings] = useSaveStorage<CodeEditorSettingsStore<T>>(editorSettingsStorageKey, {
    theme: Theme.LIGHT,
    lastLanguageUsed: CodeLanguage.CPP as T,
    tabSize: 2,
    fontSize: 14,
  });

  let defaultLanguage = editorSettings.lastLanguageUsed;
  if (languages?.length && !languages.some((lang) => lang.value === defaultLanguage) && languages[0]) {
    defaultLanguage = languages[0].value;
  }
  const formatter = formatStoreRecovered(languages);
  const [newInitialFiles] = useSyncedState<StorageType<CodeEditorFiles<T>>>(formatter({ [storeKey]: { ...initialFiles } }));
  const [filesStore, setFilesStore] = useSaveChunkStorage<CodeEditorFiles<T>>(
    getSourcesStoreKey(userNickname),
    newInitialFiles,
    mergeSources,
    formatter,
  );
  const onFilesChangeRef = useStableRef(onFilesChange);
  const files = filesStore[storeKey] || EMPTY_OBJECT;
  useEffect(() => onFilesChangeRef.current?.(files), [files, onFilesChangeRef]);
  const defaultFileName = initialFileName ?? Object.keys(files)[0] ?? getDefaultFileName(defaultLanguage as CodeLanguage);
  const [newInitialSettings] = useSyncedState<StorageType<SettingsStore>>({ [storeKey]: { lastFileName: defaultFileName } });
  const [settingsStore, setSettingsStore] = useSaveChunkStorage<SettingsStore>(
    getSettingsStoreKey(userNickname),
    newInitialSettings,
    (a, b) => ({ ...a, ...b }),
    formatSettingsStoreRecovered,
  );
  const onCurrentFileNameChangeRef = useStableRef(onCurrentFileNameChange);
  const currentFileName = settingsStore[storeKey]?.lastFileName ?? defaultFileName;
  useEffect(() => onCurrentFileNameChangeRef.current?.(currentFileName), [currentFileName, onCurrentFileNameChangeRef]);
  const setCurrentFileName = (lastFileName: string) => {
    setSettingsStore((prevState) => ({
      ...prevState,
      [storeKey]: {
        ...prevState[storeKey],
        lastFileName,
      },
    }));
  };

  const testCaseStoreKey = storeKey;
  const [newInitialTestCases] = useSyncedState<StorageType<CodeEditorTestCases>>(
    getNewInitialTestCases(testCaseStoreKey, initialTestCases),
  );
  const [testCasesStore, setTestCasesStore] = useSaveChunkStorage<CodeEditorTestCases>(
    getTestCasesStoreKey(userNickname),
    newInitialTestCases,
    mergeTestCases,
    formatTestCasesStoreRecover,
  );
  const onTestCasesChangeRef = useStableRef(onTestCasesChange);
  const testCases = testCasesStore[testCaseStoreKey]!;
  useEffect(() => {
    onTestCasesChangeRef.current?.(testCases);
  }, [onTestCasesChangeRef, testCases]);

  const [editorTriggerFocus, setEditorTriggerFocus] = useState(0);
  const focusEditor = () => setTimeout(() => setEditorTriggerFocus((n) => n + 1), 200);
  const mdEditorRef = useRef<MdMathEditorHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      setFile: (file: CodeEditorFile<T>) => {
        setFilesStore((prevState) => {
          if (prevState[storeKey]) {
            const folderPath = normalizeFolderPath(file.folderPath);
            const fileKey = getFileKey(folderPath, file.name);
            return {
              ...prevState,
              [storeKey]: {
                ...prevState[storeKey],
                [fileKey]: {
                  ...file,
                  folderPath,
                },
              },
            };
          }
          return prevState;
        });
      },
      markdownGetSelection: () => mdEditorRef.current?.getSelectionMarkdown() ?? '',
      markdownReplaceSelectionWithMarkdown: (md: string) => mdEditorRef.current?.replaceSelectionWithMarkdown(md),
      markdownHighlightSelectionNodes: (className: string) => mdEditorRef.current?.highlightSelectionNodes(className),
      markdownClearHighlight: () => mdEditorRef.current?.clearHighlight(),
    }),
    [setFilesStore, storeKey],
  );

  const changeFileName = (
    prevState: StorageType<CodeEditorFiles<T>>,
    oldKey: string,
    newName: string,
    newFolderPath: string,
  ) => {
    const files = prevState[storeKey] || {};
    if (files[oldKey]) {
      const resolvedFolderPath = (newFolderPath !== undefined ? newFolderPath : files[oldKey]?.folderPath) || '';
      const newKey = getFileKey(resolvedFolderPath, newName);
      const updatedFile = {
        ...files[oldKey],
        name: newName,
        folderPath: resolvedFolderPath,
      };
      const { [oldKey]: _removed, ...newFiles } = { ...files }; // eslint-disable-line @typescript-eslint/no-unused-vars
      newFiles[newKey] = updatedFile;
      return {
        ...prevState,
        [storeKey]: newFiles,
      };
    }
    return prevState;
  };

  const onChange = ({
    source: newSourceCode,
    language: newLanguage,
    onTestCasesChange,
    theme,
    tabSize,
    fontSize,
    isRunning,
    codeRunStatus,
    newFileName,
    fileName,
    fileNameEdited,
    fileNameDeleted,
  }: CodeRunnerEditorPropertiesType<T>) => {
    if (codeRunStatus) {
      onCodeRunStatusChange?.(codeRunStatus, { files, currentFileName, testCases });
    }
    if (typeof isRunning === 'boolean') {
      onIsRunningChange?.(isRunning);
    }
    if (typeof newSourceCode === 'string') {
      setFilesStore((prevState) => {
        if (prevState[storeKey] && prevState[storeKey][currentFileName]) {
          return {
            ...prevState,
            [storeKey]: {
              ...prevState[storeKey],
              [currentFileName]: {
                ...prevState[storeKey][currentFileName],
                source: newSourceCode,
              },
            },
          };
        }
        return prevState;
      });
      // onSourceChange?.(newSourceCode);
    }
    if (newLanguage) {
      // setLanguage(newLanguage);
      setEditorSettings((prevState) => ({ ...prevState, lastLanguageUsed: newLanguage }));
      setFilesStore((prevState) => {
        const files = { ...(prevState[storeKey] || {}) };
        const currentFile = prevState[storeKey]?.[currentFileName];
        const currentFolderPath = currentFile?.folderPath ?? '';
        const newBaseName = getNewFileName(
          removeExtension(currentFile?.name ?? ''),
          `.${getExtension(newLanguage)}`,
          (name) => !!files[getFileKey(currentFolderPath, name)],
        );
        const newKey = getFileKey(currentFolderPath, newBaseName);
        if (prevState[storeKey] && prevState[storeKey][currentFileName]) {
          const newState: StorageType<CodeEditorFiles<T>> = {
            ...prevState,
            [storeKey]: {
              ...prevState[storeKey],
              [currentFileName]: {
                ...prevState[storeKey]?.[currentFileName],
                language: newLanguage,
              },
            },
          };
          setTimeout(() => {
            setCurrentFileName(newKey);
          }, 100);
          return changeFileName(newState, currentFileName, newBaseName, currentFolderPath);
        }
        return prevState;
      });
      focusEditor();
    }
    if (onTestCasesChange) {
      setTestCasesStore((prevState) => ({
        ...prevState,
        [testCaseStoreKey]: onTestCasesChange(prevState[testCaseStoreKey] || {}),
      }));
    }
    if (theme) {
      setEditorSettings((prevState) => ({ ...prevState, theme }));
      focusEditor();
    }
    if (tabSize) {
      setEditorSettings((prevState) => ({ ...prevState, tabSize }));
      focusEditor();
    }
    if (fontSize) {
      setEditorSettings((prevState) => ({ ...prevState, fontSize }));
      focusEditor();
    }
    if (newFileName !== undefined) {
      setFilesStore((prevState) => {
        const files = { ...(prevState[storeKey] || {}) };
        const folderPath = newFileName;
        const newName = getNewFileName(
          'new',
          `.${getExtension(defaultLanguage)}`,
          (name) => !!files[getFileKey(folderPath, name)],
        );
        const newKey = getFileKey(folderPath, newName);
        setCurrentFileName(newKey);
        const maxIndex = Object.values(files).reduce((accum, { index }) => Math.max(accum, index || 0), 0);
        files[newKey] = {
          source: CODE_LANGUAGE[defaultLanguage as CodeLanguage]?.templateSourceCode || '',
          language: defaultLanguage,
          index: maxIndex + 1,
          name: newName,
          hidden: false,
          protected: false,
          readonly: false,
          folderPath,
        };
        return { ...prevState, [storeKey]: files };
      });
      focusEditor();
    }
    if (fileName) {
      setCurrentFileName(fileName);
      focusEditor();
    }
    if (typeof fileNameEdited?.[0] === 'string' && typeof fileNameEdited?.[1] === 'string') {
      const oldKey = fileNameEdited[0];
      const newName = fileNameEdited[1];
      const typedFiles = files as CodeEditorFiles<T>;
      const newFolderPath = fileNameEdited[2] !== undefined ? fileNameEdited[2] : (typedFiles[oldKey]?.folderPath ?? '');
      const newKey = getFileKey(newFolderPath, newName);
      if (typedFiles[newKey] && newKey !== oldKey) {
        addErrorNotification(<T className="tt-se">file name already exists</T>);
      } else {
        setFilesStore((prevState) => changeFileName(prevState, oldKey, newName, newFolderPath));
        setCurrentFileName(newKey);
        focusEditor();
      }
    }
    if (fileNameDeleted) {
      setFilesStore((prevState) => {
        const files = prevState[storeKey] || {};
        const { [fileNameDeleted]: _removed, ...newFiles } = { ...files }; // eslint-disable-line @typescript-eslint/no-unused-vars
        setCurrentFileName(Object.keys(files)[0] ?? '');
        return { ...prevState, [storeKey]: newFiles };
      });
      focusEditor();
    }
  };

  return (
    <CodeRunnerEditor<T>
      triggerFocus={editorTriggerFocus}
      files={files}
      currentFileName={currentFileName}
      className={className}
      theme={editorSettings.theme}
      tabSize={editorSettings.tabSize}
      fontSize={editorSettings.fontSize}
      languages={languages}
      readOnly={readOnly}
      onChange={onChange}
      leftButtons={leftButtons}
      centerButtons={centerButtons}
      rightButtons={rightButtons}
      testCases={testCases}
      expandPosition={expandPosition}
      enableAddSampleCases={enableAddSampleCases}
      enableAddCustomSampleCases={enableAddCustomSampleCases}
      onlyCodeEditor={onlyCodeEditor}
      mdEditorRef={mdEditorRef}
      withoutRunCodeButton={withoutRunCodeButton}
      mermaidTheme={mermaidTheme}
      mermaidConfigJson={mermaidConfigJson}
      mermaidFileName={mermaidFileName}
    />
  );
}

export default forwardRef(UserCodeEditorInner) as <T>(
  props: UserCodeEditorProps<T> & RefAttributes<UserCodeEditorHandle<T>>,
) => ReactElement | null;
