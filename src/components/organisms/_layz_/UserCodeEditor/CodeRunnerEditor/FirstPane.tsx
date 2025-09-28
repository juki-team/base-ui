import { Theme } from '@juki-team/commons';
import { useResizeDetector } from 'react-resize-detector';
import { Select } from '../../../../atoms';
import { classNames } from '../../../../helpers';
import { CodeEditor } from '../../../../molecules';
import type { CodeEditorPropertiesType } from '../../../../molecules/_lazy_/CodeEditor/types';

interface FirstPaneProps<T> {
  preferredTheme: Theme,
  codeEditorOnChange: (props: CodeEditorPropertiesType<T>) => void,
  language: T,
  readOnly?: boolean,
  source: string,
  tabSize: number,
  fontSize: number,
  languages: { value: T, label: string }[],
  onlyCodeEditor?: boolean,
  triggerFocus?: number,
}

export const FirstPane = <T, >(props: FirstPaneProps<T>) => {
  
  const {
    preferredTheme,
    codeEditorOnChange,
    language,
    readOnly,
    source,
    tabSize,
    fontSize,
    languages,
    onlyCodeEditor,
    triggerFocus,
  } = props;
  
  const { ref, height = 0 } = useResizeDetector();
  
  return (
    <div className={classNames('jk-col nowrap left stretch ht-100', { 'wh-100': !!onlyCodeEditor })}>
      <div className="jk-row stretch jk-pg-xsm left" ref={ref}>
        {readOnly ? (
          <div className="jk-tag bc-io">
            {(languages.find(lang => lang.value === language)?.label || language) + ''}
          </div>
        ) : (
          <Select
            className="languages-selector tx-s"
            options={languages.map(language => ({
              value: language.value,
              label: (language.label || language.value) + '',
            }))}
            selectedOption={{
              value: language,
              label: (languages.find(lang => lang.value === language)?.label || language) + '',
            }}
            onChange={({ value }) => codeEditorOnChange({ language: value })}
          />
        )}
      </div>
      <div className="editor-layout flex-1" style={{ height }}>
        <CodeEditor
          theme={preferredTheme}
          onChange={codeEditorOnChange}
          language={language}
          readOnly={readOnly}
          source={source}
          tabSize={tabSize}
          fontSize={fontSize}
          triggerFocus={triggerFocus}
        />
      </div>
    </div>
  );
};
