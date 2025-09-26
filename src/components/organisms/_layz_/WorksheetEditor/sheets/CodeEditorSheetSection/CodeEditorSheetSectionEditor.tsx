import { ACCEPTED_PROGRAMMING_LANGUAGES, CODE_LANGUAGE, CodeEditorSheetType, CodeLanguage } from '@juki-team/commons';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../../../../../constants';
import { Input, InputCheckbox, MultiSelect, T } from '../../../../../atoms';
import { UserCodeEditor } from '../../../UserCodeEditor';
import { SetContentType } from '../../types';

interface RunnerSheetSectionProps {
  content: CodeEditorSheetType,
  setContent: SetContentType<CodeEditorSheetType>,
  isSolvable: boolean,
}

export const CodeEditorSheetSectionEditor = ({ content, setContent, isSolvable }: RunnerSheetSectionProps) => {
  
  return (
    <div className="jk-col gap stretch left jk-pg-sm br-ht jk-br-ie wh-100">
      <Input
        label={<T className="tt-se">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      {isSolvable && (
        <Input
          type="number"
          label={<T className="tt-se">points</T>}
          labelPlacement="top"
          value={content.points}
          onChange={points => setContent(prevState => ({ ...prevState, points }))}
          expand
        />
      )}
      <div className="jk-row gap wh-100">
        <div className="flex-1">
          <T className="fw-bd tt-se">languages</T>:
          <MultiSelect
            options={ACCEPTED_PROGRAMMING_LANGUAGES
              .map((key) => ({
                value: key,
                label: CODE_LANGUAGE[key].label,
              }))}
            selectedOptions={content.languages?.map(language => ({ value: language }))}
            onChange={(options) => setContent(prevState => ({
              ...prevState,
              languages: options.map(option => option.value as CodeLanguage),
            }))}
            expand
          />
        </div>
        <div>
          <div className="jk-row gap space-between">
            <div><T className="fw-bd tt-se">height</T>:</div>
            <InputCheckbox
              checked={content.height === 0}
              label={<T>auto</T>}
              onChange={(value) => setContent(prevState => ({
                ...prevState,
                height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
              }))}
            />
          </div>
          {content.height !== 0 && (
            <div className="jk-row">
              <Input
                type="number"
                value={content.height}
                onChange={(value) => setContent(prevState => ({
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
      <div
        style={{ height: WORKSHEET_CODE_EDITOR_MIN_HEIGHT /* getHeight(content.height, ''  )*/ }}
        className="jk-row wh-100"
      >
        <UserCodeEditor<CodeLanguage>
          storeKey={content.id + '_edit'}
          initialFiles={content.files}
          onTestCasesChange={(testCases) =>
            setContent(prevState => ({ ...prevState, testCases }))
          }
          onFilesChange={(files) =>
            setContent(prevState => ({
              ...prevState,
              files,
            }))
          }
          initialTestCases={content.testCases}
          languages={content.languages.map(lang => ({
            value: lang,
            label: CODE_LANGUAGE[lang]?.label || lang,
          }))}
          enableAddSampleCases
        />
      </div>
    </div>
  );
};
