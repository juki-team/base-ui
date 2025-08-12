import { QuizOptionsSheetType } from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { v4 } from 'uuid';
import { Input, InputCheckbox, InputRadio, Modal, T } from '../../../../atoms';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { AddIcon } from '../../../../atoms/server';
import { MdMathEditor } from '../../../mdMath/MdMathEditor';

interface RunnerSheetSectionProps extends BasicModalProps {
  sheet: QuizOptionsSheetType,
  setSheet: Dispatch<QuizOptionsSheetType>,
  onClose: () => void,
}

export const QuizOptionsSheetSectionEditorModal = ({
                                                     sheet: initialSheet,
                                                     setSheet: _setSheet,
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
          />
          <T className="tt-se fw-bd">description</T>
          <MdMathEditor
            value={sheet.description}
            onChange={(description) => setSheet(prevState => ({ ...prevState, description }))}
          />
          <div className="jk-col stretch left gap">
            {sheet.options.map((option, index) => (
              <div className="jk-row gap nowrap extend" key={`${index}`}>
                {sheet.multiple ? <InputCheckbox checked={false} /> : <InputRadio checked={false} />}
                <Input
                  value={option.label}
                  onChange={(label) => {
                    setSheet((prevState) => {
                      const newOptions = [ ...prevState.options ];
                      newOptions[index].label = label;
                      return { ...prevState, options: newOptions };
                    });
                  }}
                  expand
                />
              </div>
            ))}
            <div
              className="jk-row gap"
              onClick={() => setSheet(prevState => ({
                ...prevState,
                options: [ ...prevState.options, { label: '', correct: false, id: v4() } ],
              }))}
            >
              <AddIcon /> <T className="tt-se">add option</T>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
