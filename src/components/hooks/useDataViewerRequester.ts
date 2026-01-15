import type { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { Status } from '@juki-team/commons';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SWRConfiguration } from 'swr';
import type { DataViewerRequesterGetUrlType, RequestFilterType, RequestSortType, SetLoaderStatusType } from '../types';
import { useFetcher } from './useFetcher';
import { useStableRef } from './useStableRef';

export const useDataViewerRequester = <T extends ContentResponseType<unknown> | ContentsResponseType<unknown>, >(getUrl: DataViewerRequesterGetUrlType, options?: SWRConfiguration) => {
  const setLoaderStatusRef = useRef<SetLoaderStatusType>(null);
  const [ url, setUrl ] = useState<string | undefined>(undefined);
  const { data, error, isLoading, mutate, isValidating } = useFetcher<T>(url, options);
  const getUrlRef = useStableRef(getUrl);
  const request = useCallback(async ({ pagination, filter, sort }: {
    pagination: { page: number, pageSize: number },
    filter: RequestFilterType,
    sort: RequestSortType
  }) => {
    const newUrl = getUrlRef.current?.({ pagination: pagination || { page: 0, pageSize: 25 }, filter, sort });
    if (!newUrl) {
      return;
    }
    setUrl((prevUrl) => {
      if (prevUrl === newUrl) {
        Promise.resolve().then(() => mutate());
      }
      return newUrl;
    });
  }, [ getUrlRef, mutate ]);
  
  useEffect(() => {
    setLoaderStatusRef.current?.((isLoading || isValidating) ? Status.LOADING : Status.NONE);
  }, [ isLoading, isValidating ]);
  
  return {
    data,
    error,
    isLoading,
    isValidating,
    request,
    setLoaderStatusRef: useCallback((setLoaderStatus: SetLoaderStatusType) => setLoaderStatusRef.current = setLoaderStatus, []),
  };
};
