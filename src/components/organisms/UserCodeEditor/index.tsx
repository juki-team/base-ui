import {
  ACCEPTED_PROGRAMMING_LANGUAGES,
  CodeEditorTestCasesType,
  isStringJson,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  Theme,
} from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { getEditorSettingsStorageKey, getSourcesStoreKey } from '../../../helpers';
import { useJukiUser } from '../../../hooks';
import {
  CodeEditorExpandPositionType,
  CodeEditorMiddleButtonsType,
  CodeRunnerEditor,
  CodeRunnerEditorPropertiesType,
} from '../CodeRunnerEditor';

const useSaveStorage = <T extends Object, >(storeKey: string, defaultValue: T, initialValue?: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  let storeRecovered = {};
  const localStorageData = localStorage.getItem(storeKey) || '{}';
  if (isStringJson(localStorageData)) {
    storeRecovered = JSON.parse(localStorageData);
  }
  const [ value, setValue ] = useState<T>({ ...defaultValue, ...storeRecovered, ...(initialValue || {}) });
  
  const initialValueString = JSON.stringify(initialValue ?? {});
  useEffect(() => {
    const initialValue = JSON.parse(initialValueString);
    setValue(prevState => ({ ...prevState, ...initialValue }));
  }, [ initialValueString ]);
  
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

export interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  sourceStoreKey: string,
  languages: { value: T, label: string }[],
  middleButtons?: (props: {
    source: string,
    language: T,
    testCases: CodeEditorTestCasesType
  }) => CodeEditorMiddleButtonsType<T>,
  onSourceChange?: (source: string) => void,
  onLanguageChange?: (language: T) => void,
  onTestCasesChange?: (testCases: CodeEditorTestCasesType) => void,
  initialSource?: { [key: string]: string },
  enableAddSampleCases?: boolean,
  enableAddCustomSampleCases?: boolean,
}

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => {
  
  const {
    className,
    expandPosition,
    initialTestCases,
    sourceStoreKey,
    languages,
    middleButtons,
    onSourceChange,
    onLanguageChange,
    onTestCasesChange,
    initialSource,
    enableAddSampleCases,
    enableAddCustomSampleCases,
  } = props;
  const { user: { nickname } } = useJukiUser();
  
  const editorSettingsStorageKey = getEditorSettingsStorageKey(nickname);
  
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
  
  const [ language, setLanguage ] = useState<T>(editorSettings.lastLanguageUsed as T);
  const [ testCases, setTestCases ] = useState<CodeEditorTestCasesType>(initialTestCases ?? {});
  const initialTestCasesString = JSON.stringify(initialTestCases);
  useEffect(() => {
    if (isStringJson(initialTestCasesString)) {
      setTestCases(JSON.parse(initialTestCasesString));
    }
  }, [ initialTestCasesString ]);
  useEffect(() => {
    if (languages.length && !languages.some(lang => lang.value === language)) {
      setLanguage(languages[0].value);
    }
  }, [ language, languages ]);
  useEffect(() => {
    onTestCasesChange?.(testCases);
  }, [ onTestCasesChange, testCases ]);
  const defaultValue: { [key: string]: { [key: string]: string } } = { [sourceStoreKey]: {} };
  ACCEPTED_PROGRAMMING_LANGUAGES.forEach(key => {
    defaultValue[sourceStoreKey][PROGRAMMING_LANGUAGE[key].mime] = PROGRAMMING_LANGUAGE[key].templateSourceCode;
  });
  
  const [ source, setSource ] = useSaveStorage(
    sourceStoreKey ? getSourcesStoreKey(nickname) : '',
    defaultValue,
    initialSource ? { [sourceStoreKey]: initialSource } : undefined,
  );
  const mime = PROGRAMMING_LANGUAGE[language as ProgrammingLanguage]?.mime || '.txt';
  const newSource = source[sourceStoreKey]?.[mime] || '';
  useEffect(() => {
    onSourceChange?.(newSource);
  }, [ newSource, onSourceChange ]);
  
  useEffect(() => {
    onLanguageChange?.(language);
  }, [ language, onLanguageChange ]);
  
  const onChange = useCallback(({
                                  sourceCode,
                                  language: newLanguage,
                                  testCases,
                                  theme,
                                  tabSize,
                                  fontSize,
                                }: CodeRunnerEditorPropertiesType<T>) => {
    if (typeof sourceCode === 'string') {
      setSource(prevState => ({
        ...prevState,
        [sourceStoreKey]: {
          ...(prevState[sourceStoreKey] || {}),
          [mime]: sourceCode,
        },
      }));
    }
    if (newLanguage) {
      setLanguage(newLanguage);
      setEditorSettings(prevState => ({ ...prevState, lastLanguageUsed: newLanguage }));
    }
    if (testCases) {
      setTestCases(testCases);
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
  }, [ mime ]);
  
  return (
    <CodeRunnerEditor
      className={className}
      theme={editorSettings.theme}
      tabSize={editorSettings.tabSize}
      fontSize={editorSettings.fontSize}
      sourceCode={newSource}
      language={language}
      languages={languages}
      onChange={onChange}
      middleButtons={middleButtons?.({ source: newSource, language, testCases })}
      testCases={testCases}
      expandPosition={expandPosition}
      enableAddSampleCases={enableAddSampleCases}
      enableAddCustomSampleCases={enableAddCustomSampleCases}
    />
  );
};
