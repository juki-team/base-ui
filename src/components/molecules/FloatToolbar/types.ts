import type { ReactNode } from 'react';
import { PopoverProps } from '../../atoms/_lazy_/Popover/types';
import { ButtonProps } from '../../atoms/Button/types';
import type { ButtonLoaderProps } from '../ButtonLoader/types';

export type ActionButtonType = {
  icon?: ReactNode,
  onClick?: (() => Promise<void>) | (() => void),
  label?: ReactNode,
  disabled?: boolean,
  size?: ButtonProps['size'],
  type?: ButtonProps['type'],
  children?: ReactNode,
};

export type ActionButtonsType = ActionButtonType[];

export interface ButtonActionProps extends ButtonLoaderProps {
  icon?: ReactNode,
  type?: ButtonProps['type'],
  buttons?: ActionButtonsType,
  disabled?: boolean,
  children?: ReactNode,
  placement?: PopoverProps['placement'],
  offset?: PopoverProps['offset'],
  size?: ButtonProps['size'],
  className?: string,
}

export interface FloatToolbarProps {
  actionButtons: ButtonActionProps[],
  placement?: PopoverProps['placement'],
  className?: string,
  offset?: number,
  outer?: boolean,
}
