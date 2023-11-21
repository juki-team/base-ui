import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import React, { useEffect } from 'react';
import { renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useFetcher, useNotification } from '../../../hooks';
import { JukiSurprisedImage, LoadingIcon } from '../../atoms';
import { FetcherLayerProps } from './types';

const isContentResponseType = <T, >(data: any): data is ContentResponseType<T> => {
  return !!(data?.success && data?.content);
};

const isContentsResponseType = <T, >(data: any): data is ContentsResponseType<T> => {
  return !!(data?.success && data?.contents);
};

export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => {
  const { url, options, errorView, loadingView, children, onError } = props;
  const { isLoading, data, error, mutate } = useFetcher<T>(url, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    ...options,
  });
  const { notifyResponse } = useNotification();
  
  useEffect(() => {
    if (data && (data?.success === false || error)) {
      notifyResponse(data);
      onError?.(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ notifyResponse, JSON.stringify(data), error/*, onError*/ ]);
  
  if (isLoading) {
    if (loadingView) {
      return <>{renderReactNodeOrFunction(loadingView)}</>;
    }
    return (
      <div className="jk-row jk-col extend">
        <LoadingIcon size="very-huge" className="cr-py" />
      </div>
    );
  }
  if (isContentResponseType<U>(data)) {
    return <>{renderReactNodeOrFunctionP1(children, { data, isLoading, error, mutate })}</>;
  }
  
  if (isContentsResponseType<U>(data)) {
    return <>{renderReactNodeOrFunctionP1(children, { data, isLoading, error, mutate })}</>;
  }
  
  if (errorView) {
    return <>{renderReactNodeOrFunctionP1(errorView, { data, isLoading, error, mutate })}</>;
  }
  
  return (
    <div className="jk-row jk-col extend">
      <JukiSurprisedImage />
    </div>
  );
};
