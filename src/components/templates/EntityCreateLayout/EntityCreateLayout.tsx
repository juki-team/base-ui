import type { DocumentCreateResponseDTO } from '@juki-team/commons/dto';
import { HTTPMethod, Status } from '@juki-team/commons/enums';
import { cleanRequest } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { useState } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { authorizedRequest } from '../../helpers/fetch';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import { TabsInlineButton, TabsInlineButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from '../../organisms';
import { CloseIcon, SaveIcon } from '../../server';
import type { EntityCreateLayoutProps } from './types';

export function EntityCreateLayout<T, U, V>(props: EntityCreateLayoutProps<T, U, V>) {
  const { Cmp, newEntity, listRoute, viewRoute, createApiURL, toEntityUpsert } = props;

  const [entity] = useState(newEntity());
  const { notifyResponse } = useJukiNotification();
  const pushRoute = useRouterStore((state) => state.pushRoute);

  const tabButtons = ({ entityData }: { entityData: T }) => [
    <CheckUnsavedChanges key="cancel" onClickContinue={() => pushRoute(listRoute())} value={entityData as object}>
      <TabsInlineButton type="secondary" icon={<CloseIcon />} label="cancel" />
    </CheckUnsavedChanges>,
    <TabsInlineButtonLoader
      key="save"
      icon={<SaveIcon />}
      onClick={async (setLoaderStatus) => {
        setLoaderStatus(Status.LOADING);
        const response = cleanRequest<ContentResponse<DocumentCreateResponseDTO>>(
          await authorizedRequest(createApiURL(), {
            method: HTTPMethod.POST,
            body: JSON.stringify(toEntityUpsert(entityData)),
          }),
        );
        if (notifyResponse(response, setLoaderStatus)) {
          const key = response.content.key;
          pushRoute(viewRoute(key));
        }
      }}
      label="create"
    />,
  ];

  return <Cmp entity={entity} entityKey="" tabButtons={tabButtons} />;
}
