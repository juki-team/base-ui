import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import React, { useEffect } from 'react';
import { renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useFetcher, useNotification } from '../../../hooks';
import { JukiSurprisedImage, LineLoader } from '../../atoms';
import { JukiLoadingLayout } from '../layouts';
import { FetcherLayerProps } from './types';

const isContentResponseType = <T, >(data: any): data is ContentResponseType<T> => {
  return !!(data?.success && data?.content);
};

const isContentsResponseType = <T, >(data: any): data is ContentsResponseType<T> => {
  return !!(data?.success && data?.contents);
};

export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => {
  
  const { url, options, errorView, loadingView, children, onError, triggerFetch } = props;
  
  const { isLoading, data, error, mutate, isValidating } = useFetcher<T>(url, options);
  const { notifyResponse } = useNotification();
  useEffect(() => {
    if (triggerFetch) {
      void mutate();
    }
  }, [ triggerFetch, mutate ]);
  
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
    
    return <JukiLoadingLayout />;
  }
  
  if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
    return <>
      {renderReactNodeOrFunctionP1(children, { data, isLoading, error, mutate })}
      {isValidating && (
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LineLoader />
        </div>
      )}
    </>;
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
