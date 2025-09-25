import { type  ContentsResponseType, type SessionBasicResponseDTO, Status } from '@juki-team/commons';
import { useMemo } from 'react';
import { DEFAULT_DATA_VIEWER_PROPS } from '../../../constants';
import { QueryParamKey } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { DateLiteral, T } from '../../atoms';
import { DeleteIcon } from '../../atoms/server';
import { useDataViewerRequester } from '../../hooks/useDataViewerRequester';
import { useJukiUser } from '../../hooks/useJukiUser';
import { useMutate } from '../../hooks/useMutate';
import { ButtonLoader } from '../../molecules';
import { DataViewer, Field } from '../../organisms';
import type { DataViewerHeadersType } from '../../organisms/DataViewer/types';
import type { UserMyActiveSessionsProps } from './types';

export function UserMyActiveSessions(_: UserMyActiveSessionsProps) {
  
  const { deleteUserSession } = useJukiUser();
  const userSessionId = useUserStore(state => state.user.sessionId);
  const {
    data: response,
    request,
    setLoaderStatusRef,
  } = useDataViewerRequester<ContentsResponseType<SessionBasicResponseDTO>>(() => jukiApiManager.API_V1.user.getMySessions().url);
  
  const mutate = useMutate();
  
  const columns: DataViewerHeadersType<SessionBasicResponseDTO>[] = useMemo(() => [
    {
      head: 'session',
      index: 'session',
      Field: ({ record: { updateTimestamp, deviceName, osName, id } }) => (
        <Field className="jk-col center">
          <div className="fw-bd">{deviceName}</div>
          <div>{osName}</div>
          <DateLiteral date={new Date(updateTimestamp)} />
          {userSessionId === id && <div className="jk-tag bc-io"><T className="tt-se">this device</T></div>}
        </Field>
      ),
      cardPosition: 'top',
      minWidth: 250,
      sort: {
        compareFn: () => (rowA, rowB) => rowB.updateTimestamp - rowA.updateTimestamp,
      },
    },
    {
      head: 'operations',
      index: 'operations',
      Field: ({ record: { id } }) => {
        return (
          <Field className="jk-col center gap">
            {userSessionId !== id && (
              <ButtonLoader
                icon={<DeleteIcon />}
                onClick={(setLoader) => deleteUserSession({
                  params: { sessionId: id },
                  setLoader,
                  onSuccess: async () => {
                    setLoader(Status.LOADING);
                    await mutate(jukiApiManager.API_V1.user.getMySessions().url);
                    setLoader(Status.SUCCESS);
                  },
                })}
                size="tiny"
              >
                <T>delete session</T>
              </ButtonLoader>
            )}
          </Field>
        );
      },
      cardPosition: 'bottom',
      minWidth: 190,
    },
  ], [ deleteUserSession, mutate, userSessionId ]);
  
  const data: SessionBasicResponseDTO[] = (response?.success ? response?.contents : []);
  
  return (
    <DataViewer<SessionBasicResponseDTO>
      headers={columns}
      data={data}
      rows={{ height: 100 }}
      cards={{ width: 300, height: 160 }}
      request={request}
      name={QueryParamKey.LOGGED_USERS_TABLE}
      setLoaderStatusRef={setLoaderStatusRef}
      {...DEFAULT_DATA_VIEWER_PROPS}
    />
  );
}
