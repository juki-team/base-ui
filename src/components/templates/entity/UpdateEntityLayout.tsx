import { ContentResponseType, HTTPMethod, Status } from '@juki-team/commons';
import React, { FC, useState } from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiRouter, useNotification, useSWR } from '../../../hooks';
import { CloseIcon, SaveIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { UpsertComponentEntityProps } from './CreateEntity';

interface UpdateEntityLayoutProps<EntityUI, EntityUpsert, Tab> {
  Cmp: FC<UpsertComponentEntityProps<EntityUI, Tab>>,
  entity: EntityUI,
  entityKey: string,
  viewRoute: (entityKey: string) => string,
  updateApiURL: (entityKey: string) => string,
  viewApiURL: (entityKey: string) => string,
  toEntityUpsert: (entity: EntityUI) => EntityUpsert,
}

export function UpdateEntityLayout<T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) {
  
  const { Cmp, entity: initialEntity, entityKey, viewRoute, updateApiURL, viewApiURL, toEntityUpsert } = props;
  
  const [ entity ] = useState(initialEntity);
  const { pushRoute } = useJukiRouter();
  const { notifyResponse } = useNotification();
  const { mutate } = useSWR();
  const tabButtons = (entityData: T) => [
    <CheckUnsavedChanges
      key="cancel"
      onClickContinue={() => pushRoute(viewRoute(entityKey))}
      value={entity as object}
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
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(
          updateApiURL(entityKey),
          {
            method: HTTPMethod.PUT,
            body: JSON.stringify(toEntityUpsert(entityData)),
          },
        ));
        if (notifyResponse(response, setLoaderStatus)) {
          setLoaderStatus(Status.LOADING);
          await mutate(viewApiURL(entityKey));
          pushRoute(viewRoute(entityKey));
        }
      }}
      responsiveMobile
    >
      <T>update</T>
    </ButtonLoader>,
  ];
  
  return (
    <Cmp entity={entity} entityKey={entityKey} tabButtons={tabButtons} />
  );
}
