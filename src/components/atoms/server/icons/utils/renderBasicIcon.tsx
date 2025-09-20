import React, { ComponentType } from 'react';
import { classNames } from '../../../../../helpers/commons';
import { BasicIconProps, RootIconProps } from '../types';
import { CircleFrame } from './CircleFrame';
import { Segment } from './Segment';
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
    letter,
    letterColor,
    letterSize,
    ...props
  } = _props;
  
  const isFilled = filledCircle || filledSquare;
  const scale = circle ? 0.8 : square ? 0.8 : (filledSquare || filledCircle) ? 0.8 : 1;
  
  const [ minX = 0, minY = 0, widthBox = 0 ] = viewBox.split(' ').map(Number);
  
  const A1 = (new Vector(widthBox * 21.5 / 24, widthBox * 19.5 / 24)).add(new Vector(minX, minY));
  const A2 = (new Vector(widthBox * 19.5 / 24, widthBox * 21.5 / 24)).add(new Vector(minX, minY));
  const width = A1.sub(A2).mod();
  
  const sizeBox = widthBox / 2;
  const lineWidth = 2; // [1,24]
  const scaleLineWidth = (widthBox * lineWidth / 24);
  const centerX = minX + widthBox / 2;
  const centerY = minY + widthBox / 2;
  
  const color = isFilled ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--t-color-white)')) : 'currentColor';
  
  return (
    <span
      {...props}
      className={classNames(className, 'jk-icon', size, `jk-icon-${name}`, { 'cursor-pointer': !!props.onClick })}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      // initial={{ scale: 0 }}
      // animate={{ scale: 1 }}
      // exit={{ scale: 0, transition: { duration: 5 } }}
    >
      <svg viewBox={viewBox} fill="currentColor">
        {(circle || filledCircle) && (
          <CircleFrame
            cx={centerX}
            cy={centerY}
            sizeBox={widthBox + (filledSquare ? scaleLineWidth * 2 : 0)}
            strokeWidth={filledCircle ? 0 : scaleLineWidth}
            filled={!!filledCircle}
          />
        )}
        {(square || filledSquare) && (
          <SquareFrame cx={minX} cy={minY} strokeWidth={scaleLineWidth} sizeBox={widthBox} filled={!!filledSquare} />
        )}
        <g transform={`translate(${(1 - scale) * (minX + sizeBox)}, ${(1 - scale) * (minY + sizeBox)}) scale(${scale})`}>
          <Component
            color={color}
            width={2.5}
          />
        </g>
        {!!letter && (
          <text
            x={centerX}
            y={centerY}
            style={{
              alignmentBaseline: 'central',
              textAnchor: 'middle',
              fontSize: letterSize ?? (widthBox * (circle ? 0.6 : square ? 0.7 : (filledCircle || filledSquare) ? 0.80 : 0.9)),
              color: letterColor ?? color,
              fontWeight: 800,
            }}
          >
            {letter}
          </text>
        )}
        <g transform={`translate(${(1 - scale) * (minX + sizeBox)}, ${(1 - scale) * (minY + sizeBox)}) scale(${scale})`}>
          {strikethrough && (
            <>
              <Segment
                start={A1}
                end={{ x: minX + widthBox * 4.5 / 24, y: minY + widthBox * 2.5 / 24 }}
                fill={!isFilled ? 'var(--t-color-white)' : 'currentColor'}
                options={{ width, roundWidth: 0 }}
              />
              <Segment
                start={A2}
                end={{ x: minX + widthBox * 2.5 / 24, y: minY + widthBox * 4.5 / 24 }}
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
