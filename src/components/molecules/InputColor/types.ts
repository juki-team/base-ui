import { PropsWithChildren } from 'react';
import { ColorResult } from 'react-color';
import { InputProps } from '../../atoms';

export type Color = ColorResult;

export type ColorPickerProps = PropsWithChildren<{ color?: Color, onChange?: (newColor: Color) => void, label?: InputProps<any>['label'] }>;
