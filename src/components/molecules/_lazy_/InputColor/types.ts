import type { ReactElement } from 'react';
import type { ColorResult } from 'react-color';

import { InputCommonsProps } from '../../../types';

export interface InputColorProps extends Omit<InputCommonsProps<ColorResult | string>, 'onChange'> {
  onChange?: (newColor: ColorResult) => void,
  children?: ReactElement,
}
