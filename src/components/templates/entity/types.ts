import { FC } from 'react';
import { ReactNodeOrFunctionP1Type } from '../../../types';

export interface UpsertComponentEntityProps<EntityUI, Tab> {
  entity: EntityUI,
  entityKey: string,
  tabButtons: (props: { entityData: EntityUI, disableUpdateButton?: boolean }) => ReactNodeOrFunctionP1Type<{
    selectedTabKey: Tab
  }>[],
}

export interface CreateEntityLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  newEntity: () => EntityUI,
  listRoute: () => string,
  viewRoute: (entityKey: string) => string,
  createApiURL: () => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}

export interface UpdateEntityLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  entity: EntityUI,
  entityKey: string,
  viewRoute: (entityKey: string) => string,
  updateApiURL: (entity: EntityUI) => (entityKey: string) => string,
  viewApiURL: (entityKey: string) => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}
