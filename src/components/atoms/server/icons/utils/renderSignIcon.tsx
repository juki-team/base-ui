import { ComponentType } from 'react';
import { classNames } from '../../../../helpers';
import { RootIconProps, SignIconProps } from '../types';
import { CircleFrame } from './CircleFrame';
import { SquareFrame } from './SquareFrame';

const width = 3;

export const renderSignIcon = (_props: SignIconProps, Component: ComponentType<RootIconProps>, name?: string) => {
  
  const {
    size = 'regular',
    color,
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
        {/*{filledCircle && <CircleFilledFrame strokeWidth={width} />}*/}
        {(circle || filledCircle) && <CircleFrame strokeWidth={width} filled={!!filledCircle} />}
        {(square || filledSquare) && <SquareFrame strokeWidth={width} filled={!!filledSquare} />}
        <Component
          color={
            color
              ? color
              : (filledCircle || filledSquare)
                ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--cr-we)'))
                : 'currentColor'}
          width={width}
        />
      </svg>
    </span>
  );
};
