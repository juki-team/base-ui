import {
  BodyWorksheetType,
  isCodeEditorSheetType,
  isJkmdSheetType,
  isObjectJson,
  isQuizOptionsSheetType,
  isQuizProblemSheetType,
  isQuizTextSheetType,
  isStringJson,
} from '@juki-team/commons';
import React, { Dispatch } from 'react';
import { useStableState } from '../../../../hooks';
import { Button, InputTextArea, Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';

interface EditSheetModalProps<T extends BodyWorksheetType> extends BasicModalProps {
  content: T,
  setContent: Dispatch<T>,
}

export const EditSheetModal = <T extends BodyWorksheetType, >(props: EditSheetModalProps<T>) => {
  
  const { isOpen, onClose, content, setContent } = props;
  
  const [ value, setValue ] = useStableState(isOpen && isObjectJson(content) ? JSON.stringify(content, null, 2) : '');
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="jk-col gap jk-pg stretch">
        <InputTextArea
          className="wh-100"
          size="auto"
          value={value}
          onChange={setValue}
        />
        <div className="jk-row-col gap right">
          <Button onClick={onClose} type="light">
            <T className="tt-se">close</T>
          </Button>
          <Button
            disabled={isStringJson(value)
              ? (
                !isJkmdSheetType(JSON.parse(value))
                && !isCodeEditorSheetType(JSON.parse(value))
                && !isQuizProblemSheetType(JSON.parse(value))
                && !isQuizOptionsSheetType(JSON.parse(value))
                && !isQuizTextSheetType(JSON.parse(value))
              )
              : true}
            onClick={() => {
              if (isStringJson(value)) {
                const obj = JSON.parse(value);
                if (
                  isJkmdSheetType(obj)
                  || isCodeEditorSheetType(obj)
                  || isQuizProblemSheetType(obj)
                  || isQuizOptionsSheetType(obj)
                  || isQuizTextSheetType(obj)
                ) {
                  setContent(obj as T);
                  onClose();
                }
              }
            }}
          >
            <T className="tt-se">save</T>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
