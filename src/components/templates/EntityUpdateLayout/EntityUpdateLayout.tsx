import { cleanRequest, type ContentResponseType, HTTPMethod, Status } from '@juki-team/commons';
import { useState } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { authorizedRequest } from '../../helpers';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { useMutate } from '../../hooks/useMutate';
import { TabsInlineButton, TabsInlineButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { CloseIcon, SaveIcon } from '../../server';
import type { EntityUpdateLayoutProps } from './types';

export function EntityUpdateLayout<T, U, V>(props: EntityUpdateLayoutProps<T, U, V>) {
  
  const { Cmp, entity: initialEntity, entityKey, viewRoute, updateApiURL, viewApiURL, toEntityUpsert } = props;
  
  const pushRoute = useRouterStore(state => state.pushRoute);
  const { notifyResponse } = useJukiNotification();
  const mutate = useMutate();
  const [ entity ] = useState(initialEntity);
  
  const tabButtons = ({ entityData, disableUpdateButton }: { entityData: T, disableUpdateButton?: boolean }) => [
    <CheckUnsavedChanges
      key="cancel"
      onClickContinue={() => pushRoute(viewRoute(entityKey))}
      value={entityData as object}
    >
      <TabsInlineButton
        type="light"
        icon={<CloseIcon />}
        label="cancel"
      />
    </CheckUnsavedChanges>,
    <TabsInlineButtonLoader
      key="save"
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
      label="update"
    />,
  ];
  
  return (
    <Cmp entity={entity} entityKey={entityKey} tabButtons={tabButtons} />
  );
}
