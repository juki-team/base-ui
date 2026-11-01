import {
  CODE_LANGUAGE,
  type CodeEditorTestCases,
  CodeLanguage,
  isStringJson,
  removeExtension,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import type { CodeEditorFile, CodeEditorFiles } from './code-editor-file';
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

  const mergeState = useCallback((current?: StorageType<T>) => {
    // let initialValue: StorageType<T> = {};
    // if (isStringJson(initialValueString)) {
    //   initialValue = JSON.parse(initialValueString);
    // }
    const newState: StorageType<T> = {};
    // localStorage is written with a debounce, so the in-memory state (current) takes priority over it
    const storeRecovered = Object.entries({
      ...formatStoreRecoveredRef.current(getStoreRecovered(storeKey)),
      ...current,
    });
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

  const [value, setValue] = useState<StorageType<T>>(() => mergeState());

  useEffect(() => {
    setValue((prev) => mergeState(prev));
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

const getFileExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex > 0 ? fileName.slice(dotIndex + 1).toLowerCase() : '';
};

// true when the file name already has an extension accepted by the language (e.g. main.cpp for C++17 and C++20)
const hasValidExtension = (fileName: string, codeLanguage: unknown) =>
  (CODE_LANGUAGE[codeLanguage as CodeLanguage]?.fileExtension ?? []).includes(getFileExtension(fileName));

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
            description: '',
            active: false,
          };
          index++;
        } else if (typeof source === 'object' && source !== null) {
          const folderPath = normalizeFolderPath(
            'folderPath' in source && typeof source?.folderPath === 'string' ? source.folderPath : '',
          );
          const baseName = normalizeFolderPath('name' in source && typeof source?.name === 'string' ? source.name : '');
          const name = state[key]?.[getFileKey(folderPath, baseName)]
            ? getNewFileName(
                baseName,
                `.${getExtension('language' in source && typeof source?.language === 'string' ? source.language : '')}`,
                (n) => !!state[key]?.[getFileKey(folderPath, n)],
              )
            : baseName;
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
            description: 'description' in source && typeof source?.description === 'string' ? source?.description : '',
            active: false,
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
            (name) => !!state[key]?.[getFileKey(file.folderPath, name)],
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

    // keep `active` (the entry point) in sync with the open file
    setFilesStore((prevState) => {
      const prevFiles = prevState[storeKey];
      if (!prevFiles || !prevFiles[lastFileName]) {
        return prevState;
      }
      let changed = false;
      const updatedFiles = Object.fromEntries(
        Object.entries(prevFiles).map(([fileName, fileData]) => {
          const active = fileName === lastFileName;
          if ((fileData.active ?? false) !== active) {
            changed = true;
            return [fileName, { ...fileData, active }];
          }
          return [fileName, fileData];
        }),
      );
      return changed ? { ...prevState, [storeKey]: updatedFiles } : prevState;
    });
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
    newDescription?: string,
  ) => {
    const files = prevState[storeKey] || {};
    if (files[oldKey]) {
      const resolvedFolderPath = (newFolderPath !== undefined ? newFolderPath : files[oldKey]?.folderPath) || '';
      const newKey = getFileKey(resolvedFolderPath, newName);
      const updatedFile = {
        ...files[oldKey],
        name: newName,
        folderPath: resolvedFolderPath,
        ...(newDescription !== undefined && { description: newDescription }),
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
      setEditorSettings((prevState) => ({ ...prevState, lastLanguageUsed: newLanguage }));
      const typedFiles = files as CodeEditorFiles<T>;
      const currentFile = typedFiles[currentFileName];
      if (currentFile) {
        const currentFolderPath = currentFile.folderPath ?? '';
        // only rename when the extension no longer matches the language (C++17 -> C++20 keeps main.cpp)
        const newBaseName = hasValidExtension(currentFile.name, newLanguage)
          ? currentFile.name
          : getNewFileName(
              removeExtension(currentFile.name),
              `.${getExtension(newLanguage)}`,
              (name) => !!typedFiles[getFileKey(currentFolderPath, name)],
            );
        const newKey = getFileKey(currentFolderPath, newBaseName);
        setFilesStore((prevState) => {
          const prevFile = prevState[storeKey]?.[currentFileName];
          if (!prevFile) {
            return prevState;
          }
          const newState: StorageType<CodeEditorFiles<T>> = {
            ...prevState,
            [storeKey]: {
              ...prevState[storeKey],
              [currentFileName]: { ...prevFile, language: newLanguage },
            },
          };
          return newKey === currentFileName
            ? newState
            : changeFileName(newState, currentFileName, newBaseName, currentFolderPath);
        });
        if (newKey !== currentFileName) {
          setCurrentFileName(newKey);
        }
      }
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
      const typedFiles = files as CodeEditorFiles<T>;
      const folderPath = normalizeFolderPath(newFileName);
      const newName = getNewFileName(
        'new',
        `.${getExtension(defaultLanguage)}`,
        (name) => !!typedFiles[getFileKey(folderPath, name)],
      );
      const newKey = getFileKey(folderPath, newName);
      const maxIndex = Object.values(typedFiles).reduce((accum, { index }) => Math.max(accum, index || 0), 0);
      setFilesStore((prevState) => {
        const prevFiles = prevState[storeKey] || {};
        if (prevFiles[newKey]) {
          return prevState;
        }
        return {
          ...prevState,
          [storeKey]: {
            ...prevFiles,
            [newKey]: {
              source: CODE_LANGUAGE[defaultLanguage as CodeLanguage]?.templateSourceCode || '',
              language: defaultLanguage,
              index: maxIndex + 1,
              name: newName,
              hidden: false,
              protected: false,
              readonly: false,
              folderPath,
              description: '',
              active: true,
            },
          },
        };
      });
      setCurrentFileName(newKey);
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
        setFilesStore((prevState) => changeFileName(prevState, oldKey, newName, newFolderPath, fileNameEdited[3]));
        setCurrentFileName(newKey);
        focusEditor();
      }
    }
    if (fileNameDeleted) {
      setFilesStore((prevState) => {
        const prevFiles = prevState[storeKey] || {};
        if (!prevFiles[fileNameDeleted]) {
          return prevState;
        }
        const { [fileNameDeleted]: _removed, ...newFiles } = prevFiles; // eslint-disable-line @typescript-eslint/no-unused-vars
        return { ...prevState, [storeKey]: newFiles };
      });
      // only switch files when the open one was deleted
      if (fileNameDeleted === currentFileName) {
        const remaining = Object.keys(files).filter((key) => key !== fileNameDeleted);
        setCurrentFileName(remaining[0] ?? '');
      }
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
