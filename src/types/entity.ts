import { ReactNodeOrFunctionP1Type } from './commons';

export interface UpsertComponentEntityProps<EntityUI, Tab> {
  entity: EntityUI,
  entityKey: string,
  tabButtons: (props: { entityData: EntityUI, disableUpdateButton?: boolean }) => ReactNodeOrFunctionP1Type<{
    selectedTabKey?: Tab
  }>[],
}
