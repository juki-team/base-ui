import { type FC } from 'react';
import type { UpsertComponentEntityProps } from '../../types';

export interface EntityUpdateLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  entity: EntityUI,
  entityKey: string,
  viewRoute: (entityKey: string) => string,
  updateApiURL: (entity: EntityUI) => (entityKey: string) => string,
  viewApiURL: (entityKey: string) => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}
