import React, { PropsWithChildren } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI } from '../../../../hooks';
import { T } from '../../../atoms';

interface ResultHeaderProps {
  points: number,
  userPoints: number,
  isResolved: boolean,
  submitted: boolean,
}

export const ResultHeader = (props: PropsWithChildren<ResultHeaderProps>) => {
  
  const { isResolved, submitted, points, userPoints, children } = props;
  
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
