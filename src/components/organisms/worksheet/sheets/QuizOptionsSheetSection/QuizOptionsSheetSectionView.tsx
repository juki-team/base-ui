import { QuizOptionsSheetType, QuizOptionsSubmissionResponseDTO, UserBasicInterface } from '@juki-team/commons';
import React, { useState } from 'react';
import { InputCheckbox, InputRadio, T } from '../../../../atoms';
import { MdMathViewer } from '../../../mdMath/MdMathViewer';

interface RunnerSheetSectionProps {
  sheet: QuizOptionsSheetType,
  result?: QuizOptionsSubmissionResponseDTO,
  userResult?: UserBasicInterface,
  isSolvable: boolean,
  showingResults: boolean,
  isSolving: boolean,
  isEditor: boolean,
  noteSheetKey: string,
}

export const QuizOptionsSheetSectionView = ({
                                              sheet,
                                              result,
                                              userResult,
                                              isSolvable,
                                              isSolving,
                                              isEditor,
                                              showingResults,
                                              noteSheetKey,
                                            }: RunnerSheetSectionProps) => {
  
  const [ checkedOptions, setCheckedOptions ] = useState<number[]>([]);
  
  return (
    <div className="jk-col stretch flex-1 gap jk-pg-sm" style={{ width: '100%' }}>
      {isSolvable && !!sheet.points && (
        result?.points ? (
          <div className="jk-tag success sheet-points">
            +{result?.points} <T>{result?.points ? 'points' : 'point'}</T> / {sheet.points}
          </div>
        ) : (
          <div className="jk-tag warning sheet-points">{0} <T>points</T> / {sheet.points}</div>
        )
      )}
      <T className="tt-se tx-l fw-bd">description</T>
      <MdMathViewer source={sheet.description} />
      <T className="tt-se tx-l fw-bd">{sheet.multiple ? 'select one or more options' : 'select one option'}</T>
      <div className="jk-col stretch left gap">
        {sheet.options.map((option, index) => (
          <div
            className="jk-row gap nowrap extend left jk-br-ie option"
            key={`${index}`}
            onClick={() => {
              if (sheet.multiple) {
                if (checkedOptions.includes(index)) {
                  setCheckedOptions(checkedOptions.filter(o => o !== index));
                } else {
                  setCheckedOptions([ ...checkedOptions, index ]);
                }
              } else {
                setCheckedOptions([ index ]);
              }
            }}
          >
            {sheet.multiple
              ? <InputCheckbox checked={checkedOptions.includes(index)} onChange={() => null} />
              : <InputRadio checked={checkedOptions.includes(index)} onChange={() => null} />}
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
