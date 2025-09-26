import { JkmdSheetType } from '@juki-team/commons';
import { Input, T } from '../../../../atoms';
import { MdMathEditor } from '../../../_layz_/MdMathEditor';
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
        label={<T className="tt-se tx-s">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      {isSolvable && (
        <div className="jk-row extend left">
          <Input
            label={<T className="tt-se tx-s">points</T>}
            type="number"
            value={content.points}
            onChange={points => setContent(prevState => ({ ...prevState, points }))}
          />
        </div>
      )}
      <div className="flex-1 jk-md-math-editor-expanded wh-100">
        <MdMathEditor
          informationButton
          value={content.content}
          onChange={content => setContent(prevState => ({ ...prevState, content }))}
          enableTextPlain
          enableIA
          enableImageUpload
        />
      </div>
    </div>
  );
};
