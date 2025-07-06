import { ACCEPTED_PROGRAMMING_LANGUAGES, CODE_LANGUAGE, CodeEditorSheetType, CodeLanguage } from '@juki-team/commons';
import React, { useState } from 'react';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../../../../constants';
import { getHeight } from '../../../../../helpers';
import { Input, InputCheckbox, MultiSelect, T } from '../../../../atoms';
import { CodeRunnerEditor } from '../../../CodeRunnerEditor/CodeRunnerEditor';
import { SetContentType } from '../../types';

interface RunnerSheetSectionProps {
  content: CodeEditorSheetType,
  setContent: SetContentType<CodeEditorSheetType>,
  isSolvable: boolean,
}

export const CodeEditorSheetSectionEditor = ({ content, setContent, isSolvable }: RunnerSheetSectionProps) => {
  
  const [ languageEditor, setLanguageEditor ] = useState(CodeLanguage.CPP17);
  
  const sourceCode = content.sourceCode?.[languageEditor] || '';
  
  return (
    <div className="jk-col gap stretch left jk-pg-sm br-ht jk-br-ie">
      <Input
        label={<T className="tt-se">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      {isSolvable && (
        <Input
          type="number"
          label={<T className="tt-se">points</T>}
          labelPlacement="top"
          value={content.points}
          onChange={points => setContent(prevState => ({ ...prevState, points }))}
          expand
        />
      )}
      <div className="jk-row gap">
        <div className="flex-1">
          <T className="fw-bd tt-se">languages</T>:
          <MultiSelect
            options={ACCEPTED_PROGRAMMING_LANGUAGES
              .map((key) => ({
                value: key,
                label: CODE_LANGUAGE[key].label,
              }))}
            selectedOptions={content.languages?.map(language => ({ value: language }))}
            onChange={(options) => setContent(prevState => ({
              ...prevState,
              languages: options.map(option => option.value as CodeLanguage),
            }))}
            expand
          />
        </div>
        <div>
          <div className="jk-row gap space-between">
            <div><T className="fw-bd tt-se">height</T>:</div>
            <InputCheckbox
              checked={content.height === 0}
              label={<T>auto</T>}
              onChange={(value) => setContent(prevState => ({
                ...prevState,
                height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
              }))}
            />
          </div>
          {content.height !== 0 && (
            <div className="jk-row">
              <Input
                type="number"
                value={content.height}
                onChange={(value) => setContent(prevState => ({
                  ...prevState,
                  height: Math.abs(value),
                }))}
                size="auto"
              />
              <T>px</T>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: getHeight(content.height, sourceCode) }} className="jk-row">
        <CodeRunnerEditor
          sourceCode={sourceCode}
          onChange={({ sourceCode, language, onTestCasesChange }) => {
            if (sourceCode !== undefined) {
              setContent(prevState => ({
                ...prevState,
                sourceCode: { ...prevState.sourceCode, [languageEditor]: sourceCode },
              }));
            }
            if (language) {
              setLanguageEditor(language);
            }
            if (onTestCasesChange) {
              setContent(prevState => ({ ...prevState, testCases: onTestCasesChange(prevState.testCases) }));
            }
          }}
          language={languageEditor}
          testCases={content.testCases}
          languages={content.languages.map(lang => ({
            value: lang,
            label: CODE_LANGUAGE[lang]?.label || lang,
          }))}
          enableAddSampleCases
        />
      </div>
    </div>
  );
};
