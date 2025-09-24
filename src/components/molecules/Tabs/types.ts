import { ReactNodeOrFunctionP1Type, TabsType, TabType } from '../../types/commons';
import { Href } from '../../types/router';

export interface TabsProps<T = string> {
  tabs: TabType<T>[],
  className?: string,
  selectedTabKey?: T,
  onChange?: (tabKey: T) => void,
  extraNodes?: ReactNodeOrFunctionP1Type<{ selectedTabKey?: string }>[],
  extend?: boolean,
}

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
  withBody?: boolean,
}

export interface TabsInlineBodyProps<T = string> {
  tabs: TabsType<T>,
  selectedTabKey?: T,
}
