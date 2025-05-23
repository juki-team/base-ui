import React, { PropsWithChildren } from 'react';
import { classNames } from '../../../../helpers';
import { T } from '../../../atoms';

interface ResultHeaderProps {
  points: number,
  userPoints: number,
  isResolved: boolean,
}

export const ResultHeader = ({ isResolved, points, userPoints, children }: PropsWithChildren<ResultHeaderProps>) => {
  return (
    <div className="jk-pg-rl jk-pg-sm-tb jk-row extend space-between result-header">
      {!!points && (
        <div className={classNames('jk-tag', { success: isResolved, 'gray-6': !isResolved })}>
          {userPoints}{' '}<T>{userPoints === 1 ? 'pt' : 'pts'}</T>
          {' / '}
          {points}{' '}<T>{points === 1 ? 'pt' : 'pts'}</T>
        </div>
      )}
      <div className="jk-row gap">
        {children}
      </div>
    </div>
  );
};
