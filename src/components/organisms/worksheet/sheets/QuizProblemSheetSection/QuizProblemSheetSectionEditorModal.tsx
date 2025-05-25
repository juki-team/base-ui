import {
  ACCEPTED_PROGRAMMING_LANGUAGES,
  Judge,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  QuizProblemSheetType,
} from '@juki-team/commons';
import React, { useState } from 'react';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../../../../constants';
import { Input, InputCheckbox, Modal, MultiSelect, T } from '../../../../atoms';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { ProblemSelector } from '../../../ProblemSelector/ProblemSelector';
import { SetContentType } from '../../types';
import { ProblemSummary } from './ProblemSummary';

interface RunnerSheetSectionProps extends BasicModalProps {
  content: QuizProblemSheetType,
  setContent: SetContentType<QuizProblemSheetType>,
  onClose: () => void,
}

export const QuizProblemSheetSectionEditorModal = ({
                                                     content: initialSheet,
                                                     setContent: _setSheet,
                                                     isOpen,
                                                     onClose,
                                                   }: RunnerSheetSectionProps) => {
  
  const [ sheet, setSheet ] = useState(initialSheet);
  
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
          <Input
            label={<T className="tt-se">title</T>}
            labelPlacement="top"
            value={sheet.title}
            onChange={title => setSheet(prevState => ({ ...prevState, title }))}
            expand
          />
          <Input
            type="number"
            label={<T className="tt-se">points</T>}
            labelPlacement="top"
            value={sheet.points}
            onChange={points => setSheet(prevState => ({ ...prevState, points }))}
            expand
          />
          <div className="flex-1">
            <T className="fw-bd tt-se">languages</T>:
            <MultiSelect
              options={ACCEPTED_PROGRAMMING_LANGUAGES
                .map((key) => ({
                  value: key,
                  label: PROGRAMMING_LANGUAGE[key]?.label,
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
            {(sheet.problemJudge && sheet.problemKey) ? (
              <ProblemSummary problemJudge={sheet.problemJudge} problemKey={sheet.problemKey} />
            ) : <T className="tt-se">please select a problem</T>}
          </div>
          <div className="jk-row gap left">
            <div><T className="fw-bd tt-se">height</T>:</div>
            <InputCheckbox
              checked={sheet.height === 0}
              label={<T>auto</T>}
              onChange={(value) => setSheet(prevState => ({
                ...prevState,
                height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
              }))}
            />
            <Input
              disabled={sheet.height === 0}
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
          <ProblemSelector
            onSelect={(problem) => {
              setSheet(prevState => ({
                ...prevState,
                problemKey: problem.key,
                problemJudge: problem.judge.key as Judge,
              }));
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
