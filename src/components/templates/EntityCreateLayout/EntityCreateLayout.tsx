import {
  cleanRequest,
  type ContentResponseType,
  type DocumentCreateResponseDTO,
  HTTPMethod,
  Status,
} from '@juki-team/commons';
import { useState } from 'react';
import { authorizedRequest } from '../../helpers';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { T } from '../../atoms';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { ButtonLoader } from '../../molecules';
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
      <T className="tt-se">create</T>
    </ButtonLoader>,
  ];
  
  return (
    <Cmp entity={entity} entityKey="" tabButtons={tabButtons} />
  );
}
