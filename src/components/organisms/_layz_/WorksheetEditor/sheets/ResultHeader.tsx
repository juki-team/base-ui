import { QuizOptionsSubmissionResponseDTO } from '@juki-team/commons';
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { usePageStore } from '../../../../../stores/page/usePageStore';
import { T } from '../../../../atoms';
import { classNames } from '../../../../helpers';

interface ResultHeaderProps {
  points: number,
  userPoints: number,
  isResolved: boolean,
  submitted: boolean,
  childrenTop?: ReactNode,
}

export const ResultHeader = (props: PropsWithChildren<ResultHeaderProps>) => {
  
  const { isResolved, submitted, points, userPoints, children, childrenTop } = props;
  
  const viewPortSize = usePageStore(store => store.viewPort.size);
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
              'bc-ss cr-we': isResolved,
              'bc-g6': !submitted,
              'bc-wg cr-we': userPoints > 0 && !isResolved && submitted,
              'bc-er cr-we': userPoints === 0 && !isResolved && submitted,
            })}
          >
            {(+userPoints || 0).toFixed(2)}&nbsp;<T>{userPoints === 1 ? 'pt' : 'pts'}</T>
            <div className="jk-divider tiny" style={{ height: 1 }} />
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
        <div className="jk-row tx-s">
          <div
            className="jk-row jk-br-ie hoverable"
            onClick={() => {
              setSelectedIndex(prevState => (prevState - 1 + submissions.length) % submissions.length);
            }}
          >
            ←
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
            →
          </div>
        </div>
      }
    >
      {children}
    </ResultHeader>
  );
};
