import { ContentResponseType, ContentsResponseType, ErrorResponseType } from '@juki-team/commons';
import React, { useEffect, useMemo, useRef } from 'react';
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

const isErrorResponseType = (data: any): data is ErrorResponseType => {
  return data?.success === false;
};

export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => {
  
  const { url, options, errorView, loadingView, children, onError: _onError, triggerFetch } = props;
  
  const onErrorRef = useRef(_onError);
  onErrorRef.current = _onError;
  const { isLoading, data, error, mutate, isValidating } = useFetcher<T>(url, options);
  const { notifyResponse } = useNotification();
  useEffect(() => {
    if (triggerFetch) {
      void mutate();
    }
  }, [ triggerFetch, mutate ]);
  const dataRef = useRef(data);
  
  dataRef.current = data;
  
  const isError = !isLoading && (data?.success === false || error);
  
  useEffect(() => {
    if (isError) {
      if (isErrorResponseType(dataRef.current)) {
        notifyResponse(dataRef.current);
      }
      onErrorRef.current?.(error);
    }
  }, [ notifyResponse, isError, error ]);
  
  const validChild = useMemo(() => {
    if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
      return renderReactNodeOrFunctionP1(children, { data, isLoading, error, mutate });
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data, error, isLoading, mutate ]); // [ children ]
  
  if (isLoading) {
    if (loadingView) {
      return <>{renderReactNodeOrFunction(loadingView)}</>;
    }
    
    return <JukiLoadingLayout />;
  }
  
  if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
    return <>
      {validChild}
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
