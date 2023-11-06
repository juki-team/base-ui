import { ReactElement } from 'react';
import { ColorResult } from 'react-color';
import { InputProps } from '../../atoms';

export type Color = ColorResult;

export interface ColorPickerProps {
  color?: Color,
  onChange?: (newColor: Color) => void,
  label?: InputProps<any>['label'],
  children?: ReactElement,
}
