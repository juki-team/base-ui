import { QuizOptionsSubmissionResponseDTO } from '@juki-team/commons/dist/types/dto/worksheet-submissions';
import React, { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { T } from '../../../atoms';
import { ArrowBackIcon, ArrowForwardIcon } from '../../../atoms/server';

interface ResultHeaderProps {
  points: number,
  userPoints: number,
  isResolved: boolean,
  submitted: boolean,
  childrenTop?: ReactNode,
}

export const ResultHeader = (props: PropsWithChildren<ResultHeaderProps>) => {
  
  const { isResolved, submitted, points, userPoints, children, childrenTop } = props;
  
  const { viewPortSize } = useJukiUI();
  const isSmallPortSize = viewPortSize === 'sm';
  
  return (
    <div
      style={isSmallPortSize ? undefined : {
        position: 'absolute',
        top: 0,
        right: 'calc(var(--pad-sm) * -1)',
        height: '100%',
        width: 0,
      }}
    >
      <div className="jk-pg-sm jk-col gap stretch space-between result-header sticky-top">
        {childrenTop}
        {!!points && (
          <div
            className={classNames('jk-row center jk-tag tx-s ws-np', {
              success: isResolved,
              'gray-6': !submitted,
              'warning': userPoints > 0 && !isResolved && submitted,
              'error': userPoints === 0 && !isResolved && submitted,
            })}
          >
            {+userPoints.toFixed(2)}&nbsp;<T>{userPoints === 1 ? 'pt' : 'pts'}</T>
            &nbsp;/&nbsp;
            {points}&nbsp;<T>{points === 1 ? 'pt' : 'pts'}</T>
          </div>
        )}
        <div className="jk-row gap">
          {children}
        </div>
      </div>
    </div>
  );
};

interface ResultHeadersProps {
  submissions: QuizOptionsSubmissionResponseDTO[],
  points: number,
  selectedIndex: number,
  setSelectedIndex: Dispatch<SetStateAction<number>>,
}

export const ResultHeaders = (props: PropsWithChildren<ResultHeadersProps>) => {
  
  const { points, submissions, children, selectedIndex, setSelectedIndex } = props;
  
  const lastSubmission = submissions.at(selectedIndex);
  
  return (
    <ResultHeader
      submitted={!!lastSubmission}
      points={points}
      userPoints={lastSubmission?.points ?? 0}
      isResolved={!!lastSubmission?.isCompleted}
      childrenTop={
        <div className="jk-row gap">
          <div
            className="jk-row jk-br-ie hoverable"
            onClick={() => {
              setSelectedIndex(prevState => (prevState - 1 + submissions.length) % submissions.length);
            }}
          >
            <ArrowBackIcon />
          </div>
          <div className="jk-row">
            {selectedIndex + 1} (
            <div
              className="jk-row jk-br-ie hoverable"
              onClick={() => {
                setSelectedIndex(submissions.length - 1);
              }}
            >
              {submissions.length}
            </div>)
          </div>
          <div
            className="jk-row jk-br-ie hoverable"
            onClick={() => {
              setSelectedIndex(prevState => (prevState + 1) % submissions.length);
            }}
          >
            <ArrowForwardIcon />
          </div>
        </div>
      }
    >
      {children}
    </ResultHeader>
  );
};
