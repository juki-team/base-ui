import { QuizOptionsSheetType } from '@juki-team/commons';
import React, { Dispatch, SetStateAction } from 'react';
import { classNames } from '../../../../../helpers';
import { InputCheckbox, InputRadio, T } from '../../../../atoms';
import { MdMathViewer } from '../../../mdMath/MdMathViewer';

interface RunnerSheetSectionProps {
  content: QuizOptionsSheetType,
  checkedOptions: string[],
  setCheckedOptions: Dispatch<SetStateAction<string[]>>,
}

export const QuizOptionsSheetSectionView = (props: RunnerSheetSectionProps) => {
  
  const { content, checkedOptions, setCheckedOptions } = props;
  
  return (
    <div className="jk-col stretch gap wh-100">
      <p className="tt-se tx-l fw-bd">{content.title}</p>
      <MdMathViewer source={content.description} />
      <T className="tt-se tx-l fw-bd">{content.multiple ? 'select one or more options' : 'select one option'}</T>
      <div className="jk-col stretch left gap">
        {content.options.map((option, index) => (
          <div
            className="jk-row gap nowrap extend left jk-br-ie option"
            key={option.id}
            onClick={() => {
              if (content.multiple) {
                if (checkedOptions.includes(option.id)) {
                  setCheckedOptions(checkedOptions.filter(o => o !== option.id));
                } else {
                  setCheckedOptions([ ...checkedOptions, option.id ]);
                }
              } else {
                setCheckedOptions([ option.id ]);
              }
            }}
          >
            {content.multiple
              ? <InputCheckbox
                checked={checkedOptions.includes(option.id)}
                onChange={() => null}
                className={classNames({ 'bc-sl jk-br-ie': option.correct })}
              />
              : <InputRadio
                checked={checkedOptions.includes(option.id)}
                onChange={() => null}
                className={classNames({ 'bc-sl br-50-pc': option.correct })}
              />}
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
