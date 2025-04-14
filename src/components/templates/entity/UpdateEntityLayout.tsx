import { ContentResponseType, HTTPMethod, Status } from '@juki-team/commons';
import React, { useState } from 'react';
import { authorizedRequest, cleanRequest } from '../../../helpers';
import { useJukiNotification, useMutate, useRouterStore } from '../../../hooks';
import { T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { CloseIcon, SaveIcon } from '../../server';
import { UpdateEntityLayoutProps } from './types';

export function UpdateEntityLayout<T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) {
  
  const { Cmp, entity: initialEntity, entityKey, viewRoute, updateApiURL, viewApiURL, toEntityUpsert } = props;
  
  const [ entity ] = useState(initialEntity);
  const pushRoute = useRouterStore(state => state.pushRoute);
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const tabButtons = ({ entityData, disableUpdateButton }: { entityData: T, disableUpdateButton?: boolean }) => [
    <CheckUnsavedChanges
      key="cancel"
      onClickContinue={() => pushRoute(viewRoute(entityKey))}
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
      disabled={disableUpdateButton}
      icon={<SaveIcon />}
      onClick={async (setLoaderStatus) => {
        setLoaderStatus(Status.LOADING);
        const response = cleanRequest<ContentResponseType<string>>(await authorizedRequest(
          updateApiURL(entityData)(entityKey),
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
