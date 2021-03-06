import React, { ComponentType } from 'react';
import { classNames } from '../../../helpers';
import { CircleFilledFrame, CircleFrame, Segment, SquareFilledFrame, SquareFrame, Vector } from '../utils';
import { BasicIconProps, RootIconProps, SignIconProps } from './types';

export const renderSignIcon = ({
  size = 'regular',
  className = '',
  circle = false,
  square = false,
  rotate = 0,
  filledCircle = false,
  filledSquare = false,
  ...props
}: SignIconProps, Component: ComponentType<RootIconProps>) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        {filledCircle && <CircleFilledFrame />}
        {filledSquare && <SquareFilledFrame />}
        {circle && <CircleFrame />}
        {square && <SquareFrame />}
        <Component
          color={(filledCircle || filledSquare)
            ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--t-color-white)'))
            : 'currentColor'}
          width={2.5}
        />
      </svg>
    </span>
  );
};

export const renderBasicIcon = ({
  size = 'regular',
  className = '',
  filledCircle,
  filledSquare,
  rotate = 0,
  strikethrough = false,
  ...props
}: BasicIconProps, Component: ComponentType<RootIconProps>) => {
  
  const isFilled = filledCircle || filledSquare;
  const scale = isFilled ? 0.6 : 1;
  
  const A1 = new Vector(21.5, 19.5);
  const A2 = new Vector(19.5, 21.5);
  const width = A1.sub(A2).mod();
  
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        {filledCircle && <CircleFilledFrame />}
        {filledSquare && <SquareFilledFrame />}
        <g transform={`translate(${(1 - scale) * 12}, ${(1 - scale) * 12}) scale(${scale})`}>
          <Component color={isFilled ? 'var(--t-color-white)' : 'currentColor'} width={2.5} />
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