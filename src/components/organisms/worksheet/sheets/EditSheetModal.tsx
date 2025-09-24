import { isObjectJson } from '@juki-team/commons';
import { Dispatch } from 'react';
import { useStableState } from '../../../../hooks';
import { Button, InputTextArea, Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';

interface EditSheetModalProps<T> extends BasicModalProps {
  content: T,
  setContent: Dispatch<T>,
  isValid: (value: string) => boolean,
}

export const EditSheetModal = <T, >(props: EditSheetModalProps<T>) => {
  
  const { isOpen, onClose, content, setContent, isValid } = props;
  
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
            disabled={!isValid(value)}
            onClick={() => {
              if (isValid(value)) {
                const obj = JSON.parse(value);
                setContent(obj as T);
                onClose();
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
