import {
  CodeEditorTestCasesType,
  isStringJson,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { getEditorSettingsStorageKey, getSourcesStoreKey, getTestCasesStoreKey } from '../../../helpers';
import { useStableState, useUserStore } from '../../../hooks';
import {
  CodeEditorCenterButtonsPropertiesType,
  CodeEditorCenterButtonsType,
  CodeEditorExpandPositionType,
  CodeRunnerEditor,
  CodeRunnerEditorPropertiesType,
} from '../CodeRunnerEditor';

const getStoreRecovered = <T, >(storeKey: string | undefined) => {
  let storeRecovered = {};
  const localStorageData = storeKey ? (localStorage.getItem(storeKey) || '{}') : '{}';
  if (isStringJson(localStorageData)) {
    storeRecovered = JSON.parse(localStorageData);
  }
  return storeRecovered as T;
};

const useSaveStorage = <T extends Object, >(storeKey: string | undefined, defaultValue: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  const storeRecovered = getStoreRecovered<T>(storeKey);
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

const useSaveChunkStorage = <T extends Object, >(storeKey: string, initialValue: StorageType<T>, merge: (a: T, b: T | undefined) => T): [ StorageType<T>, Dispatch<SetStateAction<StorageType<T>>> ] => {
  
  const initialValueString = JSON.stringify(initialValue);
  const mergeRef = useRef(merge);
  mergeRef.current = merge;
  
  const mergeState = useCallback(() => {
    let initialValue: StorageType<T> = {};
    if (isStringJson(initialValueString)) {
      initialValue = JSON.parse(initialValueString);
    }
    const newState: StorageType<T> = {};
    const storeRecovered = Object.entries(getStoreRecovered<StorageType<T>>(storeKey));
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

export interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  initialLanguage?: T,
  storeKey: string,
  languages: { value: T, label: string }[],
  leftButtons?: CodeEditorCenterButtonsType<T>,
  centerButtons?: CodeEditorCenterButtonsType<T>,
  rightButtons?: (props: Omit<CodeEditorCenterButtonsPropertiesType<T>, 'widthContainer'>) => ReactNode,
  onSourceChange?: (source: string) => void,
  onLanguageChange?: (language: T) => void,
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => void,
  onIsRunningChange?: (isRunning: boolean) => void,
  initialSource?: { [key: string]: string },
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
  readOnly?: boolean,
  withoutRunCodeButton?: boolean,
  onCodeRunStatusChange?: (runStatus: SubmissionRunStatus, props: {
    sourceCode: string,
    language: T,
    testCases: CodeEditorTestCasesType
  }) => void,
  onlyCodeEditor?: boolean,
}

type StorageType<T> = {
  [key: string]: T
}

type SourcesStoreType = {
  [key: string]: string,
}

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => {
  
  const {
    className,
    expandPosition,
    initialTestCases,
    initialLanguage,
    storeKey,
    languages,
    leftButtons,
    centerButtons,
    rightButtons,
    onSourceChange,
    onLanguageChange,
    onTestCasesChange,
    initialSource,
    enableAddSampleCases,
    enableAddCustomSampleCases,
    onIsRunningChange,
    readOnly,
    withoutRunCodeButton,
    onCodeRunStatusChange,
    onlyCodeEditor,
  } = props;
  
  const userNickname = useUserStore(state => state.user.nickname);
  
  const editorSettingsStorageKey = getEditorSettingsStorageKey(userNickname);
  
  const [ editorSettings, setEditorSettings ] = useSaveStorage<{
    theme: Theme,
    lastLanguageUsed: T,
    tabSize: number,
    fontSize: number,
  }>(editorSettingsStorageKey, {
    theme: Theme.LIGHT,
    lastLanguageUsed: ProgrammingLanguage.CPP as T,
    tabSize: 2,
    fontSize: 14,
  });
  const [ language, setLanguage ] = useStableState<T>(initialLanguage ?? editorSettings.lastLanguageUsed as T);
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
  
  const newInitialTestCases: StorageType<CodeEditorTestCasesType> = { [storeKey + '_' + language]: { ...initialTestCases } };
  newInitialTestCases[storeKey + '_' + language]['*'] = {
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
  const [ _testCases, setTestCases ] = useSaveChunkStorage<CodeEditorTestCasesType>(getTestCasesStoreKey(userNickname), newInitialTestCases, mergeTestCases);
  const testCases = _testCases[storeKey + '_' + language];
  const onLanguageChangeRef = useRef(onLanguageChange);
  onLanguageChangeRef.current = onLanguageChange;
  
  useEffect(() => {
    onLanguageChangeRef.current?.(language);
  }, [ language ]);
  
  const languagesString = JSON.stringify(languages);
  useEffect(() => {
    const languages: UserCodeEditorProps<T>['languages'] = JSON.parse(languagesString);
    if (languages.length && !languages.some(lang => lang.value === language)) {
      const newLanguage = languages[0].value;
      setLanguage(newLanguage);
    }
  }, [ language, languagesString, setLanguage ]);
  
  useEffect(() => {
    onTestCasesChange?.(testCases);
  }, [ onTestCasesChange, testCases ]);
  
  const mergeSources: (a: SourcesStoreType, b: SourcesStoreType | undefined) => SourcesStoreType = (a: SourcesStoreType, b: SourcesStoreType | undefined): SourcesStoreType => {
    return { ...a, ...b };
  };
  const newInitialSource: StorageType<SourcesStoreType> = { [storeKey]: { ...initialSource, key: storeKey } };
  for (const { value } of JSON.parse(languagesString)) {
    if (!newInitialSource[storeKey][value]) {
      newInitialSource[storeKey][value] = PROGRAMMING_LANGUAGE[value as ProgrammingLanguage]?.templateSourceCode || '';
    }
  }
  const [ sourceStore, setSourceStore ] = useSaveChunkStorage<SourcesStoreType>(getSourcesStoreKey(userNickname), newInitialSource, mergeSources);
  
  const sourceCode = sourceStore[storeKey]?.[language as string] || '';
  
  const onChange = ({
                      sourceCode: newSourceCode,
                      language: newLanguage,
                      onTestCasesChange,
                      theme,
                      tabSize,
                      fontSize,
                      isRunning,
                      codeRunStatus,
                    }: CodeRunnerEditorPropertiesType<T>) => {
    if (codeRunStatus) {
      onCodeRunStatusChange?.(codeRunStatus, { language, sourceCode, testCases });
    }
    if (typeof isRunning === 'boolean') {
      onIsRunningChange?.(isRunning);
    }
    if (typeof newSourceCode === 'string') {
      setSourceStore(prevState => ({
        ...prevState,
        [storeKey]: {
          ...(prevState[storeKey] || {}),
          [language as string]: newSourceCode,
        },
      }));
      onSourceChange?.(newSourceCode);
    }
    if (newLanguage) {
      setLanguage(newLanguage);
      setEditorSettings(prevState => ({ ...prevState, lastLanguageUsed: newLanguage }));
    }
    if (onTestCasesChange) {
      setTestCases(prevState => ({
        ...prevState,
        [storeKey + '_' + language]: onTestCasesChange(prevState[storeKey + '_' + language] || {}),
      }));
    }
    if (theme) {
      setEditorSettings(prevState => ({ ...prevState, theme }));
    }
    if (tabSize) {
      setEditorSettings(prevState => ({ ...prevState, tabSize }));
    }
    if (fontSize) {
      setEditorSettings(prevState => ({ ...prevState, fontSize }));
    }
  };
  
  return (
    <CodeRunnerEditor
      className={className}
      theme={editorSettings.theme}
      tabSize={editorSettings.tabSize}
      fontSize={editorSettings.fontSize}
      sourceCode={sourceCode}
      language={language}
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
