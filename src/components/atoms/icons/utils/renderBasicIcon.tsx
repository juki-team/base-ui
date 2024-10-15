import * as motion from 'framer-motion/client';
import React, { ComponentType } from 'react';
import { classNames } from '../../../../helpers';
import { BasicIconProps, RootIconProps } from '../types';
import { CirclePath } from './CirclePath';
import { arcS, H, M, V } from './functions';
import { Segment } from './Segment';
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
    ...props
  } = _props;
  
  const isFilled = filledCircle || filledSquare;
  const scale = circle ? 0.6 : square ? 0.7 : (filledSquare || filledCircle) ? 0.8 : 1;
  
  const [ minX, minY, widthBox ] = viewBox.split(' ').map(Number);
  
  const A1 = (new Vector(widthBox * 21.5 / 24, widthBox * 19.5 / 24)).add(new Vector(minX, minY));
  const A2 = (new Vector(widthBox * 19.5 / 24, widthBox * 21.5 / 24)).add(new Vector(minX, minY));
  const width = A1.sub(A2).mod();
  
  const sizeBox = widthBox / 2;
  const lineWidth = 2; // [1,24]
  const scaleLineWidth = (widthBox * lineWidth / 24);
  const start = 2;
  const scaleStart = (widthBox * start / 24);
  const centerX = minX + widthBox / 2;
  const centerY = minY + widthBox / 2;
  
  // const  k = (2 - Math.sqrt(2)) / Math.sqrt(8);
  const k = 0.4;
  const a = widthBox - scaleStart;
  const b = a - scaleStart;
  
  const color = isFilled ? (typeof filledCircle === 'string' ? filledCircle : (typeof filledSquare === 'string' ? filledSquare : 'var(--t-color-white)')) : 'currentColor';
  
  return (
    <motion.span
      {...props}
      className={classNames(className, 'jk-icon', size, name, { 'cursor-pointer': !!props.onClick })}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, transition: { duration: 5 } }}
    >
      <svg viewBox={viewBox} fill="currentColor">
        {filledCircle && (
          <CirclePath center={{ x: centerX, y: centerY }} radio={sizeBox} />
        )}
        {filledSquare && (
          <path
            fill="currentColor"
            strokeWidth="0"
            stroke="currentColor"
            d={[
              M({ x: minX + scaleStart, y: minY + b }),
              arcS({ x: minX + scaleStart, y: minY + b }, { x: minX + scaleStart * 2, y: minY + a }, k),
              H(minX + b),
              arcS({ x: minX + b, y: minY + a }, { x: minX + a, y: minY + b }, k),
              V(minY + scaleStart * 2),
              arcS({ x: minX + a, y: minY + scaleStart * 2 }, { x: minX + b, y: minY + scaleStart }, k),
              H(minX + scaleStart * 2),
              arcS({ x: minX + scaleStart * 2, y: minY + scaleStart }, {
                x: minX + scaleStart,
                y: minY + scaleStart * 2,
              }, k),
              'Z',
            ].join(' ')}
          />
        )}
        {circle && (
          <circle
            cx={centerX}
            cy={centerY}
            r={sizeBox - scaleLineWidth - scaleLineWidth / 2}
            fill="none"
            strokeWidth={scaleLineWidth}
            stroke="currentColor"
          />
        )}
        {square && (
          <rect
            x={minX + scaleStart + scaleLineWidth / 2}
            y={minY + scaleStart + scaleLineWidth / 2}
            width={widthBox - scaleStart - scaleStart - scaleLineWidth}
            height={widthBox - scaleStart - scaleStart - scaleLineWidth}
            fill="none"
            strokeWidth={scaleLineWidth}
            stroke="currentColor"
            rx={scaleLineWidth / 4}
            ry={scaleLineWidth / 4}
          />
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
              fontSize: widthBox * (circle ? 0.6 : square ? 0.7 : (filledCircle || filledSquare) ? 0.80 : 0.9),
              color,
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
    </motion.span>
  );
};
