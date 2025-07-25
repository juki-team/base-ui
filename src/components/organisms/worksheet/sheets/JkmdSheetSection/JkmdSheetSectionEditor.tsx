import { JkmdSheetType } from '@juki-team/commons';
import React from 'react';
import { Input, T } from '../../../../atoms';
import { MdMathEditor } from '../../../mdMath/MdMathEditor';
import { SetContentType } from '../../types';

interface JkmdSheetSectionProps {
  content: JkmdSheetType,
  setContent: SetContentType<JkmdSheetType>,
  isSolvable: boolean,
}

export const JkmdSheetSectionEditor = ({ content, setContent, isSolvable }: JkmdSheetSectionProps) => {
  
  return (
    <div className="jk-col left gap wh-100 jk-pg-sm">
      <Input
        label={<T className="tt-se">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      {isSolvable && (
        <div className="jk-row extend left">
          <Input
            label={<T className="tt-se">points</T>}
            type="number"
            value={content.points}
            onChange={points => setContent(prevState => ({ ...prevState, points }))}
          />
        </div>
      )}
      <div className="flex-1 jk-md-math-editor-expanded wh-100">
        <MdMathEditor
          uploadImageButton
          informationButton
          initialMd={content.content}
          onChange={content => setContent(prevState => ({ ...prevState, content }))}
        />
      </div>
    </div>
  );
};
