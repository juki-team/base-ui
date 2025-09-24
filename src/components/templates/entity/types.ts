import { FC } from 'react';

import { UpsertComponentEntityProps } from '../../types/commons';

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
