import { PropsWithChildren } from 'react';
import { ColorResult } from 'react-color';

export type Color = ColorResult;

export type ColorPickerProps = PropsWithChildren<{ color?: Color, onChange?: (newColor: Color) => void }>;
