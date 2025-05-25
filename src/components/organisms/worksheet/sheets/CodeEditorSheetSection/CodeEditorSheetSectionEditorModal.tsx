import {
  ACCEPTED_PROGRAMMING_LANGUAGES,
  CodeEditorSheetType,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
} from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../../../../constants';
import { getHeight } from '../../../../../helpers';
import { Input, InputCheckbox, Modal, MultiSelect, T } from '../../../../atoms';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { CodeRunnerEditor } from '../../../CodeRunnerEditor/CodeRunnerEditor';

interface RunnerSheetSectionProps extends BasicModalProps {
  sheet: CodeEditorSheetType,
  setSheet: Dispatch<CodeEditorSheetType>,
  onClose: () => void,
}

export const CodeEditorSheetSectionEditorModal = ({
                                                    sheet: initialSheet,
                                                    setSheet: _setSheet,
                                                    isOpen,
                                                    onClose,
                                                  }: RunnerSheetSectionProps) => {
  
  const [ sheet, setSheet ] = useState(initialSheet);
  const [ languageEditor, setLanguageEditor ] = useState(ProgrammingLanguage.CPP17);
  
  const sourceCode = sheet.sourceCode?.[languageEditor] || '';
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        _setSheet({ ...sheet });
        onClose();
      }}
      className="jk-modal-expanded"
      closeIcon
    >
      <div className="jk-col stretch left jk-pg-md">
        <h3>Juki Code Editor</h3>
        <div className="flex-1" style={{ width: '100%' }}>
          <div className="jk-row gap">
            <div className="flex-1">
              <T className="fw-bd tt-se">languages</T>:
              <MultiSelect
                options={ACCEPTED_PROGRAMMING_LANGUAGES
                  .map((key) => ({
                    value: key,
                    label: PROGRAMMING_LANGUAGE[key].label,
                  }))}
                selectedOptions={sheet.languages?.map(language => ({ value: language }))}
                onChange={(options) => setSheet(prevState => ({
                  ...prevState,
                  languages: options.map(option => option.value as ProgrammingLanguage),
                }))}
                expand
              />
            </div>
            <div>
              <div className="jk-row gap space-between">
                <div><T className="fw-bd tt-se">height</T>:</div>
                <InputCheckbox
                  checked={sheet.height === 0}
                  label={<T>auto</T>}
                  onChange={(value) => setSheet(prevState => ({
                    ...prevState,
                    height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
                  }))}
                />
              </div>
              {sheet.height !== 0 && (
                <div className="jk-row">
                  <Input
                    type="number"
                    value={sheet.height}
                    onChange={(value) => setSheet(prevState => ({
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
          <div style={{ height: getHeight(sheet.height, sourceCode) }} className="jk-row">
            <CodeRunnerEditor
              sourceCode={sourceCode}
              onChange={({ sourceCode, language, onTestCasesChange }) => {
                if (sourceCode !== undefined) {
                  setSheet(prevState => ({
                    ...prevState,
                    sourceCode: { ...prevState.sourceCode, [languageEditor]: sourceCode },
                  }));
                }
                if (language) {
                  setLanguageEditor(language);
                }
                if (onTestCasesChange) {
                  setSheet(prevState => ({ ...prevState, testCases: onTestCasesChange(prevState.testCases) }));
                }
              }}
              language={languageEditor}
              testCases={sheet.testCases}
              languages={sheet.languages.map(lang => ({
                value: lang,
                label: PROGRAMMING_LANGUAGE[lang]?.label || lang,
              }))}
              enableAddSampleCases
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
