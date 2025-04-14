import type { ReactElement } from 'react';
import type { ColorResult } from 'react-color';
import type { InputProps } from '../../atoms/types';

export type Color = ColorResult;

export interface InputColorProps {
  color?: Color,
  onChange?: (newColor: Color) => void,
  label?: InputProps<any>['label'],
  children?: ReactElement,
}
