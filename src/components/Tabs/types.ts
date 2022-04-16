import { ReactNode } from 'react';
import { ReactNodeOrFunctionType } from '../../types';

export type TabHeadersType = { children: ReactNodeOrFunctionType, disabled?: boolean, clickable?: boolean }[];

export interface TabsProps {
  tabHeaders: TabHeadersType,
  children: ReactNode[],
  className?: string,
  selectedTabIndex?: number,
  onChange?: (tabIndex: number) => void,
  actionsSection?: ReactNodeOrFunctionType,
}
