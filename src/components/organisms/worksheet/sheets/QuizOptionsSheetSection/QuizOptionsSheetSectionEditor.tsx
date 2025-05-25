import { QuizOptionsSheetType } from '@juki-team/commons';
import React from 'react';
import { v4 } from 'uuid';
import { classNames } from '../../../../../helpers';
import { Button, Input, InputCheckbox, InputRadio, InputTextArea, InputToggle, T } from '../../../../atoms';
import { AddIcon } from '../../../../atoms/server';
import { MdMathEditor } from '../../../mdMath/MdMathEditor';
import { SetContentType } from '../../types';

interface QuizOptionsSheetSectionEditorProps {
  content: QuizOptionsSheetType,
  setContent: SetContentType<QuizOptionsSheetType>,
  isSolvable: boolean
}

export const QuizOptionsSheetSectionEditor = ({
                                                content,
                                                setContent,
                                                isSolvable,
                                              }: QuizOptionsSheetSectionEditorProps) => {
  
  return (
    <div className="jk-col gap stretch left jk-pg-sm wh-100 br-ht jk-br-ie">
      <div className="jk-row-col gap tx-s">
        <div className="jk-col">
          <T className="fw-bd tt-se">options</T>
          <InputToggle
            size="small"
            checked={content.multiple}
            onChange={(newValue) => setContent(prevState => ({
              ...prevState,
              multiple: newValue,
              options: prevState.options.map(option => ({ ...option, correct: false })),
            }))}
            leftLabel={<T className={classNames('tt-se', { 'fw-bd': !content.multiple })}>single</T>}
            rightLabel={<T className={classNames('tt-se', { 'fw-bd': content.multiple })}>multiple</T>}
          />
        </div>
        {isSolvable && (
          <>
            <div className="jk-row left" style={{ width: 64 }}>
              <Input
                label={<T className="tt-se">points</T>}
                labelPlacement="top"
                type="number"
                expand
                value={content.points}
                onChange={points => setContent(prevState => ({ ...prevState, points }))}
              />
            </div>
            <div className="jk-col">
              <T className="fw-bd tt-se">scoring mode</T>
              <InputToggle
                size="small"
                checked={content.scoringMode === 'TOTAL'}
                onChange={(newValue) => setContent(prevState => ({
                  ...prevState,
                  scoringMode: newValue ? 'TOTAL' : 'PARTIAL',
                }))}
                leftLabel={
                  <T className={classNames('tt-se', { 'fw-bd': content.scoringMode === 'PARTIAL' })}>partial</T>}
                rightLabel={
                  <T className={classNames('tt-se', { 'fw-bd': content.scoringMode === 'TOTAL' })}>total</T>}
              />
            </div>
          </>
        )}
      </div>
      <Input
        label={<T className="tt-se">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      <div className="jk-col stretch">
        <T className="tt-se fw-bd">description</T>
        <MdMathEditor
          source={content.description}
          onChange={(description) => setContent(prevState => ({ ...prevState, description }))}
        />
      </div>
      <div className="jk-col stretch left gap">
        <T className="tt-se cr-pl">select the correct options</T>
        {content.options.map((option, index) => (
          <div className="jk-row gap nowrap extend" key={`${index}`}>
            {content.multiple
              ? <InputCheckbox
                checked={option.correct}
                onChange={(newValue) => {
                  setContent((prevState) => {
                    const newOptions = [ ...prevState.options ];
                    newOptions[index] = {
                      ...newOptions[index],
                      correct: newValue,
                    };
                    return { ...prevState, options: newOptions };
                  });
                }}
              />
              : <InputRadio
                name={content.id}
                checked={option.correct}
                onChange={(newValue) => {
                  setContent((prevState) => {
                    const newOptions = [ ...prevState.options ].map(option => ({ ...option, correct: false }));
                    newOptions[index] = {
                      ...newOptions[index],
                      correct: newValue,
                    };
                    return { ...prevState, options: newOptions };
                  });
                }}
              />}
            <InputTextArea
              value={option.label}
              onChange={(label) => {
                setContent((prevState) => {
                  const newOptions = [ ...prevState.options ];
                  newOptions[index] = {
                    ...newOptions[index],
                    label,
                  };
                  return { ...prevState, options: newOptions };
                });
              }}
              expand
            />
          </div>
        ))}
        <Button
          type="light"
          className="jk-row gap"
          onClick={() => setContent(prevState => ({
            ...prevState,
            options: [ ...prevState.options, { label: '', correct: false, id: v4() } ],
          }))}
        >
          <AddIcon /> <T className="tt-se">add option</T>
        </Button>
      </div>
    </div>
  );
};
