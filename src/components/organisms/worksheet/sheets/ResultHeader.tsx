import React, { PropsWithChildren } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI } from '../../../../hooks';
import { T } from '../../../atoms';

interface ResultHeaderProps {
  points: number,
  userPoints: number,
  isResolved: boolean,
}

export const ResultHeader = ({ isResolved, points, userPoints, children }: PropsWithChildren<ResultHeaderProps>) => {
  
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
          <div className={classNames('jk-tag tx-s ws-np', { success: isResolved, 'gray-6': !isResolved })}>
            {userPoints.toFixed(2)}{' '}<T>{userPoints === 1 ? 'pt' : 'pts'}</T>
            {' / '}
            {points}{' '}<T>{points === 1 ? 'pt' : 'pts'}</T>
          </div>
        )}
        <div className="jk-row gap">
          {children}
        </div>
      </div>
    </div>
  );
};
