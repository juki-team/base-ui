import { ReactNode } from 'react';

export type ActionButtonType = { icon: ReactNode, onClick: (() => Promise<void>) | (() => void), label: ReactNode };
export type ActionButtonsType = ActionButtonType[];

export interface ButtonActionProps {
  icon: ReactNode,
  buttons: ActionButtonsType,
}

export interface FloatToolbarProps {
  actionButtons: ButtonActionProps[],
}
