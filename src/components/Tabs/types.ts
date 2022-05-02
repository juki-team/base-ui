import { ReactNodeOrFunctionP1Type } from '../../types';

export type TabType = {
  header: ReactNodeOrFunctionP1Type<{ selectedTabKey: string }>,
  disabled?: boolean,
  clickable?: boolean,
  body?: ReactNodeOrFunctionP1Type<{ selectedTabKey: string }>,
  key: string,
};

export interface TabsProps {
  tabs: TabType[],
  className?: string,
  selectedTabKey?: string,
  onChange?: (tabKey: string) => void,
  actionsSection?: ReactNodeOrFunctionP1Type<{ selectedTabKey: string }>[],
  extend?: boolean,
}
