import { cleanRequest, type ContentResponseType, HTTPMethod, Status } from '@juki-team/commons';
import { useCallback, useState } from 'react';
import { authorizedRequest } from '../../helpers';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { T } from '../../atoms';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useMutate } from '../../hooks/useMutate';
import { ButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { CloseIcon, SaveIcon } from '../../server';
import type { EntityUpdateLayoutProps } from './types';

export function EntityUpdateLayout<T, U, V>(props: EntityUpdateLayoutProps<T, U, V>) {
  
  const { Cmp, entity: initialEntity, entityKey, viewRoute, updateApiURL, viewApiURL, toEntityUpsert } = props;
  
  const [ entity ] = useState(initialEntity);
  const pushRoute = useRouterStore(state => state.pushRoute);
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const tabButtons = useCallback(({ entityData, disableUpdateButton }: {
    entityData: T,
    disableUpdateButton?: boolean
  }) => [
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
        <T className="tt-se">cancel</T>
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
      <T className="tt-se">update</T>
    </ButtonLoader>,
  ], [ entityKey, mutate, notifyResponse, pushRoute, toEntityUpsert, updateApiURL, viewApiURL, viewRoute ]);
  
  return (
    <Cmp entity={entity} entityKey={entityKey} tabButtons={tabButtons} />
  );
}
