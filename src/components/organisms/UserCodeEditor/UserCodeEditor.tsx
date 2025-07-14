import {
  CODE_LANGUAGE,
  CodeEditorTestCasesType,
  CodeLanguage,
  isStringJson,
  removeExtension,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { getEditorSettingsStorageKey, getSourcesStoreKey, getTestCasesStoreKey } from '../../../helpers';
import { useJukiNotification, useStableRef } from '../../../hooks';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms';
import { CodeRunnerEditor } from '../CodeRunnerEditor/CodeRunnerEditor';
import { CodeRunnerEditorFiles, CodeRunnerEditorPropertiesType } from '../CodeRunnerEditor/types';
import { UserCodeEditorProps } from './types';

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
  
  const initialValueString = JSON.stringify(initialValue);
  const mergeRef = useStableRef(merge);
  const formatStoreRecoveredRef = useStableRef(formatStoreRecovered);
  
  const mergeState = useCallback(() => {
    let initialValue: StorageType<T> = {};
    if (isStringJson(initialValueString)) {
      initialValue = JSON.parse(initialValueString);
    }
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
  }, [ initialValueString, storeKey ]);
  
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

const mergeSources = <T, >(a: CodeRunnerEditorFiles<T>, b: CodeRunnerEditorFiles<T> | undefined): CodeRunnerEditorFiles<T> => {
  return { ...b, ...a };
};

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => {
  
  const {
    className,
    expandPosition,
    initialTestCases,
    // initialLanguage,
    initialFileName,
    storeKey,
    languages,
    leftButtons,
    centerButtons,
    rightButtons,
    // onSourceChange,
    // onLanguageChange,
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
  if (languages.length && !languages.some(lang => lang.value === defaultLanguage)) {
    defaultLanguage = languages[0].value;
  }
  
  const formatStoreRecovered = (recovered: any): StorageType<CodeRunnerEditorFiles<T>> => {
    const state: StorageType<CodeRunnerEditorFiles<T>> = {};
    for (const [ key, value ] of Object.entries(recovered)) {
      state[key] = {};
      let index = 1;
      for (const [ lang, source ] of Object.entries(value as {})) {
        if (typeof source === 'string') {
          state[key][`source-${index}.${getExtension(lang as CodeLanguage)}`] = { source, language: lang as T, index };
          index++;
        } else if (typeof source === 'object' && source !== null) {
          state[key][lang] = {
            source: ('source' in source ? source?.source as string : '') || '',
            language: (('language' in source ? source?.language : '') || CodeLanguage.TEXT) as T,
            index: ('index' in source ? source?.index as number : 0) || 0,
          };
        }
      }
    }
    return state;
  };
  
  const newInitialSource: StorageType<CodeRunnerEditorFiles<T>> = { [storeKey]: { ...initialFiles } };
  const [ filesStore, setFilesStore ] = useSaveChunkStorage<CodeRunnerEditorFiles<T>>(getSourcesStoreKey(userNickname), newInitialSource, mergeSources, formatStoreRecovered);
  
  const defaultFileName = getDefaultFileName(defaultLanguage as CodeLanguage);
  const [ currentFileName, setCurrentFileName ] = useState(initialFileName ?? Object.keys(filesStore[storeKey])[0] ?? defaultFileName);
  
  const testCaseStoreKey = storeKey;
  const newInitialTestCases: StorageType<CodeEditorTestCasesType> = { [testCaseStoreKey]: { ...initialTestCases } };
  newInitialTestCases[testCaseStoreKey]['*'] = {
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
  const [ _testCases, setTestCases ] = useSaveChunkStorage<CodeEditorTestCasesType>(getTestCasesStoreKey(userNickname), newInitialTestCases, mergeTestCases, (recovered) => recovered);
  
  const testCases = _testCases[testCaseStoreKey];
  
  useEffect(() => {
    onTestCasesChange?.(testCases);
  }, [ onTestCasesChange, testCases ]);
  
  const [ editorTriggerFocus, setEditorTriggerFocus ] = useState(0);
  
  const changeFileName = (prevState: StorageType<CodeRunnerEditorFiles<T>>, oldName: string, newName: string) => {
    const files = prevState[storeKey] || {};
    const oldFile = { ...files[oldName] };
    const { [oldName]: _, ...newFiles } = { ...files };
    newFiles[newName] = oldFile;
    
    return {
      ...prevState,
      [storeKey]: newFiles,
    };
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
      onCodeRunStatusChange?.(codeRunStatus, { files: filesStore[storeKey], currentFileName, testCases });
    }
    if (typeof isRunning === 'boolean') {
      onIsRunningChange?.(isRunning);
    }
    if (typeof newSourceCode === 'string') {
      setFilesStore(prevState => ({
        ...prevState,
        [storeKey]: {
          ...(prevState[storeKey] || {}),
          [currentFileName]: {
            ...(prevState[storeKey]?.[currentFileName] || {}),
            source: newSourceCode,
          },
        },
      }));
      // onSourceChange?.(newSourceCode);
    }
    if (newLanguage) {
      // setLanguage(newLanguage);
      setEditorSettings(prevState => ({ ...prevState, lastLanguageUsed: newLanguage }));
      const newRenamedFile = `${removeExtension(currentFileName)}.${getExtension(newLanguage)}`;
      setFilesStore(prevState => {
        const newState: StorageType<CodeRunnerEditorFiles<T>> = {
          ...prevState,
          [storeKey]: {
            ...(prevState[storeKey] || {}),
            [currentFileName]: {
              ...(prevState[storeKey]?.[currentFileName] || {}),
              language: newLanguage,
            },
          },
        };
        return changeFileName(newState, currentFileName, newRenamedFile);
      });
      setCurrentFileName(newRenamedFile);
      setEditorTriggerFocus(Date.now());
    }
    if (onTestCasesChange) {
      setTestCases(prevState => ({
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
        let newFile = `new.${getExtension(editorSettings.lastLanguageUsed)}`;
        let i = 1;
        while (files[newFile]) {
          newFile = `new${i}.${getExtension(editorSettings.lastLanguageUsed)}`;
          i++;
        }
        setCurrentFileName(newFile);
        const maxIndex = Object.values(files).reduce((accum, { index }) => Math.max(accum, index || 0), 0);
        files[newFile] = {
          source: CODE_LANGUAGE[editorSettings.lastLanguageUsed as CodeLanguage]?.templateSourceCode || '',
          language: editorSettings.lastLanguageUsed,
          index: maxIndex + 1,
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
      files={filesStore[storeKey]}
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
