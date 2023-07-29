import { CodeEditorTestCasesType, isStringJson, ProgrammingLanguage, Theme } from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ACCEPTED_PROGRAMMING_LANGUAGES, PROGRAMMING_LANGUAGE } from '../../config/constants';
import { getEditorSettingsStorageKey, getSourcesStoreKey } from '../../helpers';
import { useJukiUser } from '../../hooks';
import { CodeEditorExpandPositionType, CodeEditorMiddleButtonsType, CodeRunnerEditor } from '../CodeRunnerEditor';

const useSaveStorage = <T extends Object, >(storeKey: string, defaultValue: T, initialValue?: T): [ T, Dispatch<SetStateAction<T>> ] => {
  
  let storeRecovered = {};
  const localStorageData = localStorage.getItem(storeKey) || '{}';
  if (isStringJson(localStorageData)) {
    storeRecovered = JSON.parse(localStorageData);
  }
  const [ value, setValue ] = useState<T>({ ...defaultValue, ...storeRecovered, ...(initialValue || {}) });
  
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

interface UserCodeEditorProps<T> {
  className?: string,
  expandPosition?: CodeEditorExpandPositionType,
  initialTestCases?: CodeEditorTestCasesType,
  sourceStoreKey?: string,
  languages: { value: T, label: string }[],
  middleButtons?: CodeEditorMiddleButtonsType<T>,
  onSourceChange: (source: string) => void,
  onLanguageChange?: (language: T) => void,
  initialSource?: { [key: string]: string },
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
    initialSource,
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
  const [ testCases, setTestCases ] = useState(initialTestCases);
  useEffect(() => {
    setTestCases(initialTestCases);
  }, [ JSON.stringify(initialTestCases) ]);
  useEffect(() => {
    if (languages.length && !languages.some(lang => lang.value === language)) {
      setLanguage(languages[0].value);
    }
  }, [ language, languages ]);
  const problemJudgeKey = sourceStoreKey || '-';
  const defaultValue = { [problemJudgeKey]: {} };
  ACCEPTED_PROGRAMMING_LANGUAGES.forEach(key => {
    defaultValue[problemJudgeKey][PROGRAMMING_LANGUAGE[key].mime] = PROGRAMMING_LANGUAGE[key].templateSourceCode;
  });
  
  const [ source, setSource ] = useSaveStorage(
    sourceStoreKey ? getSourcesStoreKey(nickname) : '',
    defaultValue,
    initialSource ? { [problemJudgeKey]: initialSource } : undefined,
  );
  const mime = PROGRAMMING_LANGUAGE[language as ProgrammingLanguage]?.mime || '.txt';
  const newSource = source[problemJudgeKey]?.[mime] || '';
  useEffect(() => {
    onSourceChange(newSource);
  }, [ newSource, onSourceChange ]);
  
  useEffect(() => {
    onLanguageChange?.(language);
  }, [ language, onLanguageChange ]);
  
  return (
    <CodeRunnerEditor
      className={className}
      theme={editorSettings.theme}
      tabSize={editorSettings.tabSize}
      fontSize={editorSettings.fontSize}
      sourceCode={source[problemJudgeKey]?.[mime] || ''}
      language={language}
      languages={languages}
      onChange={({ sourceCode, language: newLanguage, testCases, theme, tabSize, fontSize }) => {
        if (typeof sourceCode === 'string') {
          setSource(prevState => ({
            ...prevState,
            [problemJudgeKey]: {
              ...(prevState[problemJudgeKey] || {}),
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
      }}
      middleButtons={middleButtons}
      testCases={testCases}
      expandPosition={expandPosition}
    />
  );
};
