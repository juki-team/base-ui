import {
  CODE_LANGUAGE,
  type CodeEditorFiles,
  type CodeEditorTestCasesType,
  CodeLanguage,
  isStringJson,
  removeExtension,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import { type Dispatch, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { EMPTY_OBJECT } from '../../../constants';
import { getEditorSettingsStorageKey, getSourcesStoreKey, getTestCasesStoreKey } from '../../../helpers';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useStableRef } from '../../hooks/useStableRef';
import { CodeRunnerEditor } from '../CodeRunnerEditor/CodeRunnerEditor';
import type { CodeRunnerEditorPropertiesType } from '../CodeRunnerEditor/types';
import type { UserCodeEditorProps } from './types';

const getStoreRecovered = (storeKey: string | undefined) => {
  let storeRecovered = {};
  const localStorageData = storeKey ? (localStorage.getItem(storeKey) || '{}') : '{}';
  if (isStringJson(localStorageData)) {
    storeRecovered = JSON.parse(localStorageData);
  }
  return storeRecovered;
};

const useSaveStorage = <T extends Object, >(storeKey: string | undefined, defaultValue: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  const storeRecovered = getStoreRecovered(storeKey);
  const [ value, setValue ] = useState<T>({ ...defaultValue, ...storeRecovered });
  
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;
  
  const storeRecoveredRef = useRef(storeRecovered);
  storeRecoveredRef.current = storeRecovered;
  
  useEffect(() => {
    setValue({ ...defaultValueRef.current, ...storeRecoveredRef.current });
  }, [ storeKey ]);
  
  useEffect(() => {
    if (storeKey) {
      const stringValue = JSON.stringify(value);
      if (localStorage.getItem(storeKey) !== stringValue) {
        localStorage.setItem(storeKey, stringValue);
      }
    }
  }, [ storeKey, value ]);
  
  return [ value, setValue ];
};

const useSaveChunkStorage = <T extends Object, >(storeKey: string, initialValue: StorageType<T>, merge: (a: T, b: T | undefined) => T, formatStoreRecovered: (recovered: any) => StorageType<T>): [ StorageType<T>, Dispatch<SetStateAction<StorageType<T>>> ] => {
  
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
    for (const [ key, value ] of Object.entries(initialValue)) {
      newState[key] = mergeRef.current(value, storeRecovered.find(([ storeRecoveredKey ]) => storeRecoveredKey === key)?.[1]);
    }
    for (const [ key, value ] of storeRecovered) {
      if (!newState[key]) {
        newState[key] = value;
      }
    }
    return newState;
  }, [ storeKey ]);
  
  const [ value, setValue ] = useState<StorageType<T>>(mergeState());
  
  useEffect(() => {
    setValue(mergeState());
  }, [ mergeState ]);
  
  useEffect(() => {
    const stringValue = JSON.stringify(value);
    if (localStorage.getItem(storeKey) !== stringValue) {
      localStorage.setItem(storeKey, stringValue);
    }
  }, [ storeKey, value ]);
  
  return [ value, setValue ];
};

type StorageType<T extends Object> = {
  [key: string]: T,
}

const getDefaultFileName = (codeLanguage: CodeLanguage) => CODE_LANGUAGE[codeLanguage]?.mainFilename ?? 'main.source';

const getExtension = (codeLanguage: any) => CODE_LANGUAGE[codeLanguage as CodeLanguage]?.fileExtension[0] ?? 'source';

const mergeTestCases = (a: CodeEditorTestCasesType, b: CodeEditorTestCasesType | undefined): CodeEditorTestCasesType => {
  const newTestCases: CodeEditorTestCasesType = {};
  for (const [ key, testCase ] of Object.entries(a)) {
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
  
  for (const [ key, testCase ] of Object.entries(b ?? {})) {
    if (!newTestCases[key]) {
      newTestCases[key] = testCase;
    }
  }
  return newTestCases;
};

const mergeSources = <T, >(a: CodeEditorFiles<T>, b: CodeEditorFiles<T> | undefined): CodeEditorFiles<T> => {
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

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => {
  
  const {
    className,
    expandPosition,
    initialTestCases,
    initialFileName,
    storeKey,
    languages,
    leftButtons,
    centerButtons,
    rightButtons,
    onFilesChange,
    onTestCasesChange,
    initialFiles,
    enableAddSampleCases,
    enableAddCustomSampleCases,
    onIsRunningChange,
    readOnly,
    withoutRunCodeButton,
    onCodeRunStatusChange,
    onlyCodeEditor,
  } = props;
  
  const userNickname = useUserStore(state => state.user.nickname);
  const { addErrorNotification } = useJukiNotification();
  
  const editorSettingsStorageKey = getEditorSettingsStorageKey(userNickname);
  
  const [ editorSettings, setEditorSettings ] = useSaveStorage<{
    theme: Theme,
    lastLanguageUsed: T,
    tabSize: number,
    fontSize: number,
  }>(editorSettingsStorageKey, {
    theme: Theme.LIGHT,
    lastLanguageUsed: CodeLanguage.CPP as T,
    tabSize: 2,
    fontSize: 14,
  });
  
  let defaultLanguage = editorSettings.lastLanguageUsed;
  if (languages.length && !languages.some(lang => lang.value === defaultLanguage) && languages[0]) {
    defaultLanguage = languages[0].value;
  }
  
  const formatStoreRecovered = (recovered: any): StorageType<CodeEditorFiles<T>> => {
    const state: StorageType<CodeEditorFiles<T>> = {};
    for (const [ key, value ] of Object.entries(recovered)) {
      state[key] = {};
      let index = 1;
      for (const [ lang, source ] of Object.entries(value as {})) {
        if (typeof source === 'string') {
          const name = `source-${index}.${getExtension(lang as CodeLanguage)}`;
          state[key][name] = {
            source,
            language: languages.some(({ value }) => value === lang) ? lang as T : CodeLanguage.TEXT as T,
            index,
            name,
            hidden: false,
            protected: false,
            readonly: false,
          };
          index++;
        } else if (typeof source === 'object' && source !== null) {
          state[key][lang] = {
            source: 'source' in source && typeof source?.source === 'string' ? source?.source : '',
            language: (('language' in source && typeof source?.language === 'string' ? (languages.some(({ value }) => value === source?.language) ? source?.language as T : CodeLanguage.TEXT as T) : '') || CodeLanguage.TEXT) as T,
            index: 'index' in source && typeof source?.index === 'number' ? source?.index : 0,
            name: lang,
            hidden: 'hidden' in source && typeof source?.hidden === 'boolean' ? source.hidden : false,
            protected: 'protected' in source && typeof source?.protected === 'boolean' ? source.protected : false,
            readonly: 'readonly' in source && typeof source?.readonly === 'boolean' ? source.readonly : false,
          };
        }
      }
    }
    return state;
  };
  
  const newInitialFiles: StorageType<CodeEditorFiles<T>> = { [storeKey]: { ...initialFiles } };
  const [ filesStore, setFilesStore ] = useSaveChunkStorage<CodeEditorFiles<T>>(getSourcesStoreKey(userNickname), newInitialFiles, mergeSources, formatStoreRecovered);
  const onFilesChangeRef = useStableRef(onFilesChange);
  const files = filesStore[storeKey] || EMPTY_OBJECT;
  useEffect(() => {
    onFilesChangeRef.current?.(files);
  }, [ files ]);
  const defaultFileName = getDefaultFileName(defaultLanguage as CodeLanguage);
  const [ currentFileName, setCurrentFileName ] = useState(initialFileName ?? Object.keys(files)[0] ?? defaultFileName);
  
  const testCaseStoreKey = storeKey;
  const newInitialTestCases: StorageType<CodeEditorTestCasesType> = { [testCaseStoreKey]: { ...initialTestCases } };
  newInitialTestCases[testCaseStoreKey]!['*'] = {
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
  const formatTestCasesStoreRecover = (recovered: any): StorageType<CodeEditorTestCasesType> => {
    const state: StorageType<CodeEditorTestCasesType> = {};
    for (const [ key, value ] of Object.entries(recovered)) {
      state[key] = {};
      for (const [ caseKey, caseValue ] of Object.entries(value as object)) {
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
  const [ testCasesStore, setTestCasesStore ] = useSaveChunkStorage<CodeEditorTestCasesType>(getTestCasesStoreKey(userNickname), newInitialTestCases, mergeTestCases, formatTestCasesStoreRecover);
  const onTestCasesChangeRef = useStableRef(onTestCasesChange);
  const testCases = testCasesStore[testCaseStoreKey]!;
  useEffect(() => {
    onTestCasesChangeRef.current?.(testCases);
  }, [ testCases ]);
  
  const [ editorTriggerFocus, setEditorTriggerFocus ] = useState(0);
  
  const changeFileName = (prevState: StorageType<CodeEditorFiles<T>>, oldName: string, newName: string) => {
    const files = prevState[storeKey] || {};
    if (files[oldName]) {
      const oldFile = {
        ...files[oldName],
        name: newName,
      };
      const { [oldName]: _, ...newFiles } = { ...files };
      newFiles[newName] = oldFile;
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
      setFilesStore(prevState => {
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
      setEditorSettings(prevState => ({ ...prevState, lastLanguageUsed: newLanguage }));
      setFilesStore(prevState => {
        const files = { ...(prevState[storeKey] || {}) };
        const newRenamedFile = getNewFileName(removeExtension(currentFileName), `.${getExtension(newLanguage)}`, (name) => !!files[name]);
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
          setCurrentFileName(newRenamedFile);
          return changeFileName(newState, currentFileName, newRenamedFile);
        }
        return prevState;
      });
      setEditorTriggerFocus(Date.now());
    }
    if (onTestCasesChange) {
      setTestCasesStore(prevState => ({
        ...prevState,
        [testCaseStoreKey]: onTestCasesChange(prevState[testCaseStoreKey] || {}),
      }));
    }
    if (theme) {
      setEditorSettings(prevState => ({ ...prevState, theme }));
      setEditorTriggerFocus(Date.now());
    }
    if (tabSize) {
      setEditorSettings(prevState => ({ ...prevState, tabSize }));
      setEditorTriggerFocus(Date.now());
    }
    if (fontSize) {
      setEditorSettings(prevState => ({ ...prevState, fontSize }));
      setEditorTriggerFocus(Date.now());
    }
    if (newFileName) {
      setFilesStore(prevState => {
        const files = { ...(prevState[storeKey] || {}) };
        const newFile = getNewFileName('new', `.${getExtension(editorSettings.lastLanguageUsed)}`, (name) => !!files[name]);
        setCurrentFileName(newFile);
        const maxIndex = Object.values(files).reduce((accum, { index }) => Math.max(accum, index || 0), 0);
        files[newFile] = {
          source: CODE_LANGUAGE[editorSettings.lastLanguageUsed as CodeLanguage]?.templateSourceCode || '',
          language: editorSettings.lastLanguageUsed,
          index: maxIndex + 1,
          name: newFile,
          hidden: false,
          protected: false,
          readonly: false,
        };
        return { ...prevState, [storeKey]: files };
      });
      setEditorTriggerFocus(Date.now());
    }
    if (fileName) {
      setCurrentFileName(fileName);
      setEditorTriggerFocus(Date.now());
    }
    if (typeof fileNameEdited?.[0] === 'string' && typeof fileNameEdited?.[1] === 'string') {
      const newName = fileNameEdited[1];
      if (filesStore[newName]) {
        addErrorNotification(<T className="tt-se">file name already exists</T>);
      } else {
        const oldName = fileNameEdited[0];
        setFilesStore(prevState => changeFileName(prevState, oldName, newName));
        setCurrentFileName(newName);
        setEditorTriggerFocus(Date.now());
      }
    }
    if (fileNameDeleted) {
      setFilesStore(prevState => {
        const files = prevState[storeKey] || {};
        const { [fileNameDeleted]: _, ...newFiles } = { ...files };
        setCurrentFileName(Object.keys(files)[0] ?? '');
        return { ...prevState, [storeKey]: newFiles };
      });
      setEditorTriggerFocus(Date.now());
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
      withoutRunCodeButton={withoutRunCodeButton}
      onlyCodeEditor={onlyCodeEditor}
    />
  );
};
