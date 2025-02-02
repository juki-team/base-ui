import {
  CodeEditorTestCasesType,
  isStringJson,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  Theme,
} from '@juki-team/commons';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { getEditorSettingsStorageKey, getSourcesStoreKey } from '../../../helpers';
import { useJukiUser, useStableState } from '../../../hooks';
import {
  CodeEditorCenterButtonsPropertiesType,
  CodeEditorCenterButtonsType,
  CodeEditorExpandPositionType,
  CodeRunnerEditor,
  CodeRunnerEditorPropertiesType,
} from '../CodeRunnerEditor';

const useSaveStorage = <T extends Object, >(storeKey: string | undefined, defaultValue: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  let storeRecovered = {};
  const localStorageData = storeKey ? (localStorage.getItem(storeKey) || '{}') : '{}';
  if (isStringJson(localStorageData)) {
    storeRecovered = JSON.parse(localStorageData);
  }
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

export interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  initialLanguage?: T,
  sourceStoreKey?: string,
  languages: { value: T, label: string }[],
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
}

type SourceStorageType = {
  [key: string]: { [key: string]: string },
}

export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => {
  
  const {
    className,
    expandPosition,
    initialTestCases,
    initialLanguage,
    sourceStoreKey = '',
    languages,
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
  const [ language, setLanguage ] = useStableState<T>(initialLanguage ?? editorSettings.lastLanguageUsed as T);
  const [ testCases, setTestCases ] = useState<CodeEditorTestCasesType>(initialTestCases ?? {});
  const initialTestCasesString = JSON.stringify(initialTestCases);
  useEffect(() => {
    if (isStringJson(initialTestCasesString)) {
      setTestCases(JSON.parse(initialTestCasesString));
    }
  }, [ initialTestCasesString ]);
  
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
  
  const [ sourceStore, setSourceStore ] = useSaveStorage<SourceStorageType>(sourceStoreKey ? getSourcesStoreKey(nickname) : undefined, {});
  
  const initialSourceString = JSON.stringify(initialSource);
  useEffect(() => {
    if (isStringJson(initialSourceString)) {
      const initialSource = JSON.parse(initialSourceString);
      const initialSourcePerLanguages: SourceStorageType[string] = {};
      for (const { value } of JSON.parse(languagesString)) {
        initialSourcePerLanguages[value as string] = PROGRAMMING_LANGUAGE[value as ProgrammingLanguage]?.templateSourceCode || '';
      }
      
      setSourceStore(prevState => ({
        ...prevState,
        [sourceStoreKey]: {
          ...initialSourcePerLanguages,
          ...initialSource,
        },
      }));
    }
  }, [ initialSourceString, languagesString, setSourceStore, sourceStoreKey ]);
  
  const newSource = sourceStore[sourceStoreKey]?.[language as string] || '';
  
  const onChange = ({
                      sourceCode,
                      language: newLanguage,
                      onTestCasesChange,
                      theme,
                      tabSize,
                      fontSize,
                      isRunning,
                    }: CodeRunnerEditorPropertiesType<T>) => {
    if (typeof isRunning === 'boolean') {
      onIsRunningChange?.(isRunning);
    }
    if (typeof sourceCode === 'string') {
      setSourceStore(prevState => ({
        ...prevState,
        [sourceStoreKey]: {
          ...(prevState[sourceStoreKey] || {}),
          [language as string]: sourceCode,
        },
      }));
      onSourceChange?.(sourceCode);
    }
    if (newLanguage) {
      setLanguage(newLanguage);
      setEditorSettings(prevState => ({ ...prevState, lastLanguageUsed: newLanguage }));
    }
    if (onTestCasesChange) {
      setTestCases(onTestCasesChange);
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
      sourceCode={newSource}
      language={language}
      languages={languages}
      readOnly={readOnly}
      onChange={onChange}
      centerButtons={centerButtons}
      rightButtons={rightButtons}
      testCases={testCases}
      expandPosition={expandPosition}
      enableAddSampleCases={enableAddSampleCases}
      enableAddCustomSampleCases={enableAddCustomSampleCases}
      withoutRunCodeButton={withoutRunCodeButton}
    />
  );
};
