import { JkmdSheetType } from '@juki-team/commons';
import React, { Dispatch, SetStateAction } from 'react';
import { Input, T } from '../../../../atoms';
import { MdMathEditor } from '../../../mdMath/MdMathEditor';

interface JkmdSheetSectionProps {
  sheet: JkmdSheetType,
  setSheet: Dispatch<SetStateAction<JkmdSheetType>>,
  isSolvable: boolean,
}

export const JkmdSheetSectionEditor = ({
                                         sheet,
                                         setSheet,
                                         isSolvable,
                                       }: JkmdSheetSectionProps) => {
  
  return (
    <div className="jk-col left gap">
      {isSolvable && (
        <div className="jk-row extend left">
          <Input
            label={<T className="tt-se">points</T>}
            type="number"
            value={sheet.points}
            onChange={points => setSheet(prevState => ({ ...prevState, points }))}
          />
        </div>
      )}
      <div className="flex-1 jk-md-math-editor-expanded">
        <MdMathEditor
          uploadImageButton
          informationButton
          source={sheet.content}
          onChange={content => setSheet(prevState => ({ ...prevState, content }))}
          initEditMode
        />
      </div>
    </div>
  );
};
