import { type FC } from 'react';
import type { UpsertComponentEntityProps } from '../../types';

export interface EntityCreateLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  newEntity: () => EntityUI,
  listRoute: () => string,
  viewRoute: (entityKey: string) => string,
  createApiURL: () => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}
