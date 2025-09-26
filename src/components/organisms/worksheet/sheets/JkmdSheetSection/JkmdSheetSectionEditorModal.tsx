import { type JkmdSheetType } from '@juki-team/commons';
import { type Dispatch, useState } from 'react';
import { Input, Modal, T } from '../../../../atoms';
import type { BasicModalProps } from '../../../../atoms/Modal/types';
import { MdMathEditor } from '../../../_layz_/MdMathEditor';

interface JkmdSheetSectionProps extends BasicModalProps {
  sheet: JkmdSheetType,
  setSheet: Dispatch<JkmdSheetType>,
  onClose: () => void,
}

export const JkmdSheetSectionEditorModal = ({
                                              sheet: initialSheet,
                                              setSheet: _setSheet,
                                              isOpen,
                                              onClose,
                                            }: JkmdSheetSectionProps) => {
  
  const [ sheet, setSheet ] = useState(initialSheet);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        _setSheet(sheet);
      }}
      className="jk-modal-expanded"
      closeIcon
    >
      <div className="jk-col left gap jk-pg-md">
        <h3>Juki MD Editor</h3>
        <div className="jk-row extend left">
          <Input
            label={<T className="tt-se">points</T>}
            
            type="number"
            value={sheet.points}
            onChange={points => setSheet(prevState => ({ ...prevState, points }))}
          />
        </div>
        <div className="flex-1 jk-md-math-editor-expanded">
          <MdMathEditor
            informationButton
            value={sheet.content}
            onChange={content => setSheet(prevState => ({ ...prevState, content }))}
          />
        </div>
      </div>
    </Modal>
  );
};
