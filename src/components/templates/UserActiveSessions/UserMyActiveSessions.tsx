import type { SessionBasicResponseDTO } from '@juki-team/commons/dto';
import { Status } from '@juki-team/commons/enums';
import type { ContentsResponse } from '@juki-team/commons/types';
import { useMemo } from 'react';
import { DEFAULT_DATA_VIEWER_PROPS } from '../../../constants';
import { QueryParamKey } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms/T/T';
import { DateLiteral } from '../../atoms/server/DateLiteral/DateLiteral';
import { DeleteIcon } from '../../atoms/server/icons/google/DeleteIcon';
import { useDataViewerRequester } from '../../hooks/useDataViewerRequester';
import { useJukiUser } from '../../hooks/useJukiUser';
import { useMatchMutate } from '../../hooks/useMatchMutate';
import { ButtonLoader } from '../../molecules/ButtonLoader/ButtonLoader';
import { DataViewer } from '../../organisms/_layz_/DataViewer';
import type { DataViewerHeadersType } from '../../organisms/_layz_/DataViewer/types';
export function UserMyActiveSessions() {
  const { deleteUserSession } = useJukiUser();
  const userSessionId = useUserStore((state) => state.user.sessionId);
  const {
    data: response,
    request,
    setLoaderStatusRef,
  } = useDataViewerRequester<ContentsResponse<SessionBasicResponseDTO>>(() => jukiApiManager.apiV2.user.getMySessions().url);

  const mutate = useMatchMutate();

  const columns: DataViewerHeadersType<SessionBasicResponseDTO>[] = useMemo(
    () => [
      {
        head: 'session',
        index: 'session',
        Field: ({ record: { updatedAt, deviceName, osName, id } }) => (
          <div className="jk-table-field jk-col center">
            <div className="fw-bd">{deviceName}</div>
            <div>{osName}</div>
            <DateLiteral date={new Date(updatedAt)} />
            {userSessionId === id && (
              <div className="jk-tag bc-io">
                <T className="tt-se">this device</T>
              </div>
            )}
          </div>
        ),
        cardPosition: 'top',
        minWidth: 250,
        sort: {
          compareFn: () => (rowA, rowB) => rowB.updatedAt - rowA.updatedAt,
        },
      },
      {
        head: 'operations',
        index: 'operations',
        Field: ({ record: { id } }) => {
          return (
            <div className="jk-table-field jk-col center gap">
              {userSessionId !== id && (
                <ButtonLoader
                  icon={<DeleteIcon />}
                  onClick={(setLoader) =>
                    deleteUserSession({
                      params: { sessionId: id },
                      setLoader,
                      onSuccess: async () => {
                        setLoader(Status.LOADING);
                        await mutate(jukiApiManager.apiV2.user.getMySessions().url);
                        setLoader(Status.SUCCESS);
                      },
                    })
                  }
                  size="tiny"
                >
                  <T>delete session</T>
                </ButtonLoader>
              )}
            </div>
          );
        },
        cardPosition: 'bottom',
        minWidth: 190,
      },
    ],
    [deleteUserSession, mutate, userSessionId],
  );

  const data: SessionBasicResponseDTO[] = response?.success ? response?.contents : [];

  return (
    <DataViewer<SessionBasicResponseDTO>
      headers={columns}
      data={data}
      rows={{ height: 100 }}
      cards={{ width: 300, height: 160 }}
      requestRef={request}
      name={QueryParamKey.LOGGED_USERS_TABLE}
      setLoaderStatusRef={setLoaderStatusRef}
      {...DEFAULT_DATA_VIEWER_PROPS}
    />
  );
}
