import {
  cleanRequest,
  type ContentResponseType,
  type DocumentCreateResponseDTO,
  HTTPMethod,
  Status,
} from '@juki-team/commons';
import { useState } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { authorizedRequest } from '../../helpers';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { TabsInlineButton, TabsInlineButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { CloseIcon, SaveIcon } from '../../server';
import type { EntityCreateLayoutProps } from './types';

export function EntityCreateLayout<T, U, V>(props: EntityCreateLayoutProps<T, U, V>) {
  
  const { Cmp, newEntity, listRoute, viewRoute, createApiURL, toEntityUpsert } = props;
  
  const [ entity ] = useState(newEntity());
  const { notifyResponse } = useJukiNotification();
  const pushRoute = useRouterStore(state => state.pushRoute);
  
  const tabButtons = ({ entityData }: { entityData: T }) => [
    <CheckUnsavedChanges
      key="cancel"
      onClickContinue={() => pushRoute(listRoute())}
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
      label="create"
    />,
  ];
  
  return (
    <Cmp entity={entity} entityKey="" tabButtons={tabButtons} />
  );
}
