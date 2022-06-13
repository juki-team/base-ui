import { CSSProperties, MouseEventHandler } from 'react';

export interface RootIconProps {
  color: string,
  width: number,
}

export interface IconProps {
  onClick?: MouseEventHandler<HTMLSpanElement>,
  size?: 'tiny' | 'small' | 'regular' | 'large' | 'huge' | 'very-huge';
  style?: CSSProperties,
  className?: string,
}

type locked = never | false | undefined;

export type SignIconProps = (IconProps & { rotate?: number }) & ({
  circle: true,
  square?: locked,
  filledCircle?: locked,
  filledSquare?: locked,
} | {
  circle?: locked,
  square: true,
  filledCircle?: locked,
  filledSquare?: locked,
} | {
  circle?: locked,
  square?: locked,
  filledCircle: true | string,
  filledSquare?: locked,
} | {
  circle?: locked,
  square?: locked,
  filledCircle?: locked,
  filledSquare?: true | string,
});

export type BasicIconProps = (IconProps & { rotate?: number, strikethrough?: boolean }) & ({
  filledCircle?: true,
  filledSquare?: locked,
} | {
  filledCircle?: locked,
  filledSquare?: true
});
