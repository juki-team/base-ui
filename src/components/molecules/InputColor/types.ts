import type { ReactElement } from 'react';
import type { ColorResult } from 'react-color';
import type { InputProps } from '../../atoms';

export type Color = ColorResult;

export interface ColorPickerProps {
  color?: Color,
  onChange?: (newColor: Color) => void,
  label?: InputProps<any>['label'],
  children?: ReactElement,
}
