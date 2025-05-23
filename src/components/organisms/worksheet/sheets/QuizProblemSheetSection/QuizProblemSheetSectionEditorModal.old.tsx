/*'use client';

import {
  Button,
  CodeRunnerEditor,
  Input,
  InputCheckbox,
  MdMathEditor,
  Modal,
  MultiSelect,
  T,
  TabsInline,
  TextArea,
} from 'components';
import { PROGRAMMING_LANGUAGE, WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from 'config/constants';
import { getHeight } from 'helpers';
import React, { Dispatch, useState } from 'react';
import { BasicModalProps, ProgrammingLanguage, QuizProblemSheetType, TabsType } from 'types';

interface RunnerSheetSectionProps extends BasicModalProps {
  sheet: QuizProblemSheetType,
  setSheet: Dispatch<QuizProblemSheetType>,
  onClose: () => void,
}

export const QuizProblemSheetSectionEditorModal = ({
                                                     sheet: initialSheet,
                                                     setSheet: _setSheet,
                                                     isOpen,
                                                     onClose,
                                                   }: RunnerSheetSectionProps) => {
  
  const [ sheet, setSheet ] = useState(initialSheet);
  const [ languageEditor, setLanguageEditor ] = useState(ProgrammingLanguage.CPP17);
  const [ selectedTabKey, setSelectedTabKey ] = useState('');
  
  const sourceCode = sheet.solutionSourceCode?.[languageEditor] || '';
  
  const testCase = sheet.testCases[selectedTabKey];
  const tabHeaders: TabsType<string> = {};
  for (const testCase of Object.values(sheet.testCases)) {
    tabHeaders[testCase.key] = {
      key: testCase.key,
      header: <><T className="tt-ce">sample</T>&nbsp;{testCase.index + 1}</>,
    };
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        _setSheet(sheet);
        onClose();
      }}
      className="jk-modal-expanded"
      closeIcon
    >
      <div className="jk-col stretch left jk-pg-md">
        <h3>Juki Quiz Problem Editor</h3>
        <div className="jk-col gap stretch flex-1" style={{ width: '100%' }}>
          <div className="jk-col stretch">
            <div className="jk-row left fw-bd"><T className="tt-se">title</T>:</div>
            <div className="flex-1 jk-md-math-editor-expanded">
              <MdMathEditor
                source={sheet.title}
                onChange={(title) => setSheet({ ...sheet, title })}
              />
            </div>
          </div>
          <div className="jk-col stretch">
            <div className="jk-row left fw-bd"><T className="tt-se">description</T>:</div>
            <div className="flex-1 jk-md-math-editor-expanded">
              <MdMathEditor
                source={sheet.description}
                onChange={(description) => setSheet({ ...sheet, description })}
              />
            </div>
          </div>
          <div className="jk-col stretch">
            <div className="jk-row left fw-bd"><T className="tt-se">points</T>:</div>
            <div className="flex-1 jk-md-math-editor-expanded">
              <Input
                type="number"
                value={sheet.points ?? 0}
                onChange={(points) => setSheet({ ...sheet, points })}
                extend
              />
            </div>
          </div>
          <div className="jk-row gap">
            <div className="flex-1">
              <div className="fw-bd"><T className="tt-se">languages</T>:</div>
              <MultiSelect
                options={Object.keys(PROGRAMMING_LANGUAGE)
                  .map((key) => ({
                    value: key as ProgrammingLanguage,
                    label: PROGRAMMING_LANGUAGE[key as ProgrammingLanguage].label,
                  }))}
                selectedOptions={sheet.languages?.map(language => ({ value: language }))}
                onChange={(options) => setSheet({
                  ...sheet,
                  languages: options.map(option => option.value as ProgrammingLanguage),
                })}
                extend
              />
            </div>
            <div>
              <div className="jk-row gap space-between">
                <div><T className="fw-bd tt-se">height</T>:</div>
                <InputCheckbox
                  checked={sheet.height === 0}
                  label={<T>auto</T>}
                  onChange={(value) => setSheet({
                    ...sheet,
                    height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
                  })}
                />
              </div>
              {sheet.height !== 0 && (
                <div className="jk-row">
                  <Input
                    type="number"
                    value={sheet.height}
                    onChange={(value) => setSheet({
                      ...sheet,
                      height: Math.abs(value),
                    })}
                    size="auto"
                  />
                  <T>px</T>
                </div>
              )}
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div className="fw-bd"><T className="tt-se">samples cases</T>:</div>
            <TabsInline
              tabs={tabHeaders}
              selectedTabKey={selectedTabKey}
              onChange={setSelectedTabKey}
              extraNodes={[
                <Button
                  key="copy"
                  type="light"
                  size="tiny"
                  onClick={() => {
                    const testCases = { ...sheet.testCases };
                    for (const testCaseKey in testCases) {
                      testCases[testCaseKey].testOut = testCases[testCaseKey].out;
                    }
                    setSheet({ ...sheet, testCases });
                  }}
                >
                  <T>copy out into sample out</T>
                </Button>,
              ]}
            />
            {testCase && (
              <div className="jk-row gap">
                <div className="jk-row gap block flex-1">
                  <div>
                    <div><T className="fw-bd tt-se">in</T>:</div>
                    <TextArea
                      value={testCase.in}
                      onChange={(value) => {
                        const testCases = { ...sheet.testCases };
                        testCases[selectedTabKey].in = value;
                        setSheet({ ...sheet, testCases });
                      }}
                    />
                  </div>
                  <div>
                    <div><T className="fw-bd tt-se">out</T>:</div>
                    <TextArea
                      value={testCase.out}
                      onChange={(value) => {
                        const testCases = { ...sheet.testCases };
                        testCases[selectedTabKey].out = value;
                        setSheet({ ...sheet, testCases });
                      }}
                    />
                  </div>
                  <div>
                    <div><T className="fw-bd tt-se">sample out</T>:</div>
                    <TextArea
                      value={testCase.testOut}
                      onChange={(value) => {
                        const testCases = { ...sheet.testCases };
                        testCases[selectedTabKey].testOut = value;
                        setSheet({ ...sheet, testCases });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <InputCheckbox
                      checked={testCase.hidden}
                      onChange={(checked) => {
                        const testCases = { ...sheet.testCases };
                        testCases[selectedTabKey].hidden = checked;
                        setSheet({ ...sheet, testCases });
                      }}
                      label={<T className="tt-se">hidden</T>}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ height: getHeight(sheet.height, sourceCode) }} className="jk-row">
            <CodeRunnerEditor
              readOnly
              sourceCode={sourceCode}
              onChange={({ sourceCode, language, testCases }) => {
                if (sourceCode !== undefined) {
                  setSheet(sheet => ({
                    ...sheet,
                    solutionSourceCode: { ...sheet.solutionSourceCode, [languageEditor]: sourceCode || '' },
                  }));
                }
                if (language) {
                  setLanguageEditor(language);
                }
                if (testCases) {
                  setSheet(sheet => ({ ...sheet, testCases }));
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
*/
