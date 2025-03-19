import { ContentResponseType, ContentsResponseType, Status } from '@juki-team/commons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SWRConfiguration } from 'swr';
import { DataViewerRequestPropsType, ReloadType, SetLoaderStatusType } from '../components/organisms/DataViewer/types';
import { RequestFilterType, RequestSortType } from '../types';
import { useFetcher } from './useFetcher';

export type DataViewerRequesterGetUrlType = (props: Omit<DataViewerRequestPropsType, 'setLoaderStatus'>) => string | null;

export const useDataViewerRequester = <T extends ContentResponseType<any> | ContentsResponseType<any>, >(getUrl: DataViewerRequesterGetUrlType, options?: SWRConfiguration) => {
  const setLoaderStatusRef = useRef<SetLoaderStatusType>(null);
  const [ url, setUrl ] = useState<string | undefined>(undefined);
  const { data, error, isLoading, mutate, isValidating } = useFetcher<T>(url, options);
  const getUrlRef = useRef(getUrl);
  const reloadRef = useRef<ReloadType>(null);
  getUrlRef.current = getUrl;
  const request = useCallback(async ({ pagination, filter, sort }: {
    pagination: { page: number, pageSize: number },
    filter: RequestFilterType,
    sort: RequestSortType
  }) => {
    const newUrl = getUrlRef.current?.({ pagination: pagination || { page: 0, pageSize: 16 }, filter, sort });
    if (newUrl) {
      if (url !== newUrl) {
        setUrl(newUrl);
      } else {
        await mutate();
      }
    }
  }, [ mutate, url ]);
  
  useEffect(() => {
    void mutate();
  }, [ mutate ]);
  
  useEffect(() => {
    if (isLoading || isValidating) {
      setLoaderStatusRef.current?.(Status.LOADING);
    } else {
      setLoaderStatusRef.current?.(Status.NONE);
    }
  }, [ isLoading, isValidating ]);
  
  return {
    data,
    error,
    isLoading,
    isValidating,
    request,
    setLoaderStatusRef: useCallback((setLoaderStatus: SetLoaderStatusType) => setLoaderStatusRef.current = setLoaderStatus, []),
    reload: useCallback(() => reloadRef.current?.(), []),
    reloadRef: useCallback((reload: ReloadType) => reloadRef.current = reload, []), // To pass to DataViewer
  };
};
