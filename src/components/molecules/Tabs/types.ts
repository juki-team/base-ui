import { Href, ReactNodeOrFunctionP1Type } from '../../../types';

export type TabType<T = string> = {
  header: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T }>,
  disabled?: boolean,
  clickable?: boolean,
  body?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T }>,
  key: T,
};

export interface TabsProps<T = string> {
  tabs: TabType<T>[],
  className?: string,
  selectedTabKey?: T,
  onChange?: (tabKey: T) => void,
  extraNodes?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: string }>[],
  extend?: boolean,
}

export type TabsType<T = string> = { [key: string]: TabType<T> };

export interface TabsInlineProps<T = string> {
  tabs: TabsType<T>,
  selectedTabKey?: T,
  onChange?: (tabKey: T) => void,
  extraNodes?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: T }>[],
  extraNodesPlacement?: 'left' | 'right' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
  className?: string,
  tickStyle?: 'line' | 'background',
  getHrefOnTabChange?: (selectedTabKey: T) => Href,
  routerReplace?: boolean,
}

export interface TabsInlineBodyProps<T = string> {
  tabs: TabsType<T>,
  selectedTabKey?: T,
  preload?: boolean,
}
