import { ReactNode } from 'react';

export type ActionButtonType = {
  icon: ReactNode,
  onClick: (() => Promise<void>) | (() => void),
  label: ReactNode,
  disabled?: boolean
};

export type ActionButtonsType = ActionButtonType[];

export interface ButtonActionProps {
  icon: ReactNode,
  buttons: ActionButtonsType,
  disabled?: boolean,
}

export interface FloatToolbarProps {
  actionButtons: ButtonActionProps[],
  placement?: 'leftBottom' | 'bottom' | 'rightBottom' | 'rightTop' | 'top' | 'leftTop',
}
