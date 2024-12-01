import React, { ComponentType } from 'react';
import { classNames } from '../../../../helpers/commons';
import { RootIconProps, SignIconProps } from '../types';
import { CircleFilledFrame } from './CircleFilledFrame';
import { CircleFrame } from './CircleFrame';
import { SquareFilledFrame } from './SquareFilledFrame';
import { SquareFrame } from './SquareFrame';

export const renderSignIcon = (_props: SignIconProps, Component: ComponentType<RootIconProps>, name?: string) => {
  
  const {
    size = 'regular',
    className = '',
    circle = false,
    square = false,
    rotate = 0,
    filledCircle = false,
    filledSquare = false,
    ...props
  } = _props;
  
  return (
    <span
      {...props}
      className={classNames(className, 'jk-icon', size, name, { 'cursor-pointer': !!props.onClick })}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        {filledCircle && <CircleFilledFrame />}
        {filledSquare && <SquareFilledFrame />}
        {circle && <CircleFrame />}
        {square && <SquareFrame />}
        <Component
          color={
            (filledCircle || filledSquare)
              ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--t-color-white)'))
              : 'currentColor'}
          width={2.5}
        />
      </svg>
    </span>
  );
};
