import type { ReactElement } from 'react';
import type { ColorResult } from 'react-color';

import { InputCommonsProps } from '../../types';

export type Color = ColorResult;

export interface InputColorProps extends InputCommonsProps<any> {
  color?: Color | string,
  onChange?: (newColor: Color) => void,
  children?: ReactElement,
}
