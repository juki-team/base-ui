import React, { ComponentType } from 'react';
import { classNames } from '../../../../helpers';
import { BasicIconProps, RootIconProps } from '../types';
import { CircleFilledFrame } from './CircleFilledFrame';
import { CircleFrame } from './CircleFrame';
import { Segment } from './Segment';
import { SquareFilledFrame } from './SquareFilledFrame';
import { SquareFrame } from './SquareFrame';
import { Vector } from './Vector';

export const renderBasicIcon = (_props: BasicIconProps, Component: ComponentType<RootIconProps>, name?: string) => {
  
  const {
    size = 'regular',
    className = '',
    filledCircle,
    filledSquare,
    circle = false,
    square = false,
    rotate = 0,
    strikethrough = false,
    style,
    viewBox = '0 0 24 24',
    ...props
  } = _props;
  
  const isFilled = filledCircle || filledSquare;
  const scale = isFilled || circle || square ? 0.7 : 1;
  
  const A1 = new Vector(21.5, 19.5);
  const A2 = new Vector(19.5, 21.5);
  const width = A1.sub(A2).mod();
  
  return (
    <span
      {...props}
      className={classNames(className, 'jk-icon', size, name, { 'cursor-pointer': !!props.onClick })}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <svg viewBox={viewBox} fill="currentColor">
        {filledCircle && <CircleFilledFrame />}
        {filledSquare && <SquareFilledFrame />}
        {circle && <CircleFrame />}
        {square && <SquareFrame />}
        <g transform={`translate(${(1 - scale) * 12}, ${(1 - scale) * 12}) scale(${scale})`}>
          <Component
            color={isFilled ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--t-color-white)')) : 'currentColor'}
            width={2.5}
          />
          {strikethrough && (
            <>
              <Segment
                start={A1}
                end={{ x: 4.5, y: 2.5 }}
                fill={!isFilled ? 'var(--t-color-white)' : 'currentColor'}
                options={{ width, roundWidth: 0 }}
              />
              <Segment
                start={A2}
                end={{ x: 2.5, y: 4.5 }}
                fill={isFilled ? 'var(--t-color-white)' : 'currentColor'}
                options={{ width, roundWidth: 0 }}
              />
            </>
          )}
        </g>
      </svg>
    </span>
  );
};
