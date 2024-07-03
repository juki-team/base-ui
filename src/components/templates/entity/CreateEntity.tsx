import { ContentResponseType, DocumentCreateResponseDTO, HTTPMethod, Status } from '@juki-team/commons';
import React, { FC, useState } from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiRouter, useNotification } from '../../../hooks';
import { ReactNodeOrFunctionP1Type } from '../../../types';
import { CloseIcon, SaveIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';

export interface UpsertComponentEntityProps<EntityUI, Tab> {
  entity: EntityUI,
  entityKey: string,
  tabButtons: (entityData: EntityUI) => ReactNodeOrFunctionP1Type<{ selectedTabKey: Tab }>[],
}

interface CreateEntityLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  newEntity: () => EntityUI,
  listRoute: () => string,
  viewRoute: (entityKey: string) => string,
  createApiURL: () => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}

export function CreateEntityLayout<T, U, V>(props: CreateEntityLayoutProps<T, U, V>) {
  
  const { Cmp, newEntity, listRoute, viewRoute, createApiURL, toEntityUpsert } = props;
  
  const [ entity ] = useState(newEntity());
  const { notifyResponse } = useNotification();
  const { pushRoute } = useJukiRouter();
  
  const tabButtons = (entityData: T) => [
    <CheckUnsavedChanges
      key="cancel"
      onClickContinue={() => pushRoute(listRoute())}
      value={entityData as object}
    >
      <ButtonLoader
        type="light"
        size="small"
        icon={<CloseIcon />}
        responsiveMobile
      >
        <T>cancel</T>
      </ButtonLoader>
    </CheckUnsavedChanges>,
    <ButtonLoader
      key="save"
      size="small"
      type="secondary"
      icon={<SaveIcon />}
      onClick={async (setLoaderStatus) => {
        setLoaderStatus(Status.LOADING);
        const response = cleanRequest<ContentResponseType<DocumentCreateResponseDTO>>(await authorizedRequest(
          createApiURL(),
          {
            method: HTTPMethod.POST,
            body: JSON.stringify(toEntityUpsert(entityData)),
          },
        ));
        if (notifyResponse(response, setLoaderStatus)) {
          const key = response.content.key;
          pushRoute(viewRoute(key));
        }
      }}
      responsiveMobile
    >
      <T>create</T>
    </ButtonLoader>,
  ];
  
  return (
    <Cmp entity={entity} entityKey="" tabButtons={tabButtons} />
  );
}
