import {
  CODE_LANGUAGE,
  CodeLanguage,
  Judge,
  QuizProblemSheetType,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
} from '@juki-team/commons';
import React from 'react';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../../../../constants';
import { Input, InputCheckbox, MultiSelect, T } from '../../../../atoms';
import { ProblemSelector } from '../../../ProblemSelector/ProblemSelector';
import { SetContentType } from '../../types';
import { ProblemSummary } from './ProblemSummary';

interface RunnerSheetSectionProps {
  content: QuizProblemSheetType,
  setContent: SetContentType<QuizProblemSheetType>,
  isSolvable: boolean,
}

export const QuizProblemSheetSectionEditor = ({ content, setContent, isSolvable }: RunnerSheetSectionProps) => {
  
  return (
    <div className="jk-col stretch left">
      <div className="jk-col gap stretch flex-1" style={{ width: '100%' }}>
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
        <div className="flex-1">
          <T className="fw-bd tt-se">languages</T>:
          <MultiSelect
            options={RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES
              .map((key) => ({
                value: key,
                label: CODE_LANGUAGE[key]?.label ?? key,
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
          {(content.problemKey)
            ? <ProblemSummary problemKey={content.problemKey} />
            : <T className="tt-se">please select a problem</T>}
        </div>
        <div className="jk-row gap left">
          <div><T className="fw-bd tt-se">height</T>:</div>
          <InputCheckbox
            checked={content.height === 0}
            label={<T>auto</T>}
            onChange={(value) => setContent(prevState => ({
              ...prevState,
              height: value ? 0 : WORKSHEET_CODE_EDITOR_MIN_HEIGHT,
            }))}
          />
          <Input
            disabled={content.height === 0}
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
        <ProblemSelector
          onSelect={(problem) => {
            setContent(prevState => ({
              ...prevState,
              problemKey: problem.key,
              problemJudge: problem.judge.key as Judge,
            }));
          }}
        />
      </div>
    </div>
  );
};
