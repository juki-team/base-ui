import type { CSSProperties, MouseEventHandler } from 'react';

export interface RootIconProps {
  color: string;
  width: number;
}

export interface IconProps {
  onClick?: MouseEventHandler<HTMLSpanElement>;
  size?: 'tiny' | 'small' | 'regular' | 'large' | 'huge' | 'very-huge';
  style?: CSSProperties;
  className?: string;
  viewBox?: string;
  letter?: string;
  letterColor?: string;
  letterSize?: number;
  color?: string;
}

type Locked = never | false | undefined;

export type SignIconProps = (IconProps & { rotate?: number }) &
  (
    | {
        circle: true;
        square?: Locked;
        filledCircle?: Locked;
        filledSquare?: Locked;
      }
    | {
        circle?: Locked;
        square: true;
        filledCircle?: Locked;
        filledSquare?: Locked;
      }
    | {
        circle?: Locked;
        square?: Locked;
        filledCircle: true | string;
        filledSquare?: Locked;
      }
    | {
        circle?: Locked;
        square?: Locked;
        filledCircle?: Locked;
        filledSquare?: true | string;
      }
  );

export type BasicIconProps = SignIconProps & { strikethrough?: boolean };

// export type BasicGoogleIconProps = (SignIconProps & { strikethrough?: boolean });
// export type BasicIconProps = (IconProps & { rotate?: number, strikethrough?: boolean }) & ({
//   filledCircle?: true,
//   filledSquare?: locked,
// } | {
//   filledCircle?: locked,
//   filledSquare?: true,
// });
