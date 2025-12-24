import {
  consoleError,
  type ContentResponseType,
  type ContentsResponseType,
  type ErrorResponseType,
} from '@juki-team/commons';
import { useEffect, useMemo, useRef } from 'react';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { LineLoader, LoaderLayer } from '../../atoms/server';
import { renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useFetcher } from '../../hooks/useFetcher';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import type { FetcherLayerProps } from './types';

const isContentResponseType = <T, >(data: any): data is ContentResponseType<T> => {
  return !!(data?.success && data?.content);
};

const isContentsResponseType = <T, >(data: any): data is ContentsResponseType<T> => {
  return !!(data?.success && data?.contents);
};

const isErrorResponseType = (data: any): data is ErrorResponseType => {
  return data?.success === false;
};

export function FetcherLayer<T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) {
  
  const { url, options, errorView, loadingView, children, onError: _onError, triggerFetch } = props;
  
  const onErrorRef = useRef(_onError);
  onErrorRef.current = _onError;
  const { isLoading, data, error, mutate, isValidating } = useFetcher<T>(url, options);
  const { notifyResponse } = useJukiNotification();
  const { Image } = useUIStore(store => store.components);
  useEffect(() => {
    if (triggerFetch) {
      void mutate();
    }
  }, [ triggerFetch, mutate ]);
  
  const dataRef = useRef(data);
  dataRef.current = data;
  
  const errorRef = useRef(error);
  errorRef.current = error;
  
  const isError = !isLoading && (data?.success === false || error);
  
  useEffect(() => {
    if (isError) {
      if (isErrorResponseType(dataRef.current)) {
        notifyResponse(dataRef.current);
      }
      consoleError(errorRef.current);
      onErrorRef.current?.(errorRef.current);
    }
  }, [ notifyResponse, isError ]);
  
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
    
    return <LoaderLayer loading={true} />;
  }
  
  if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
    return <>
      {validChild}
      {isValidating && (
        <div className="pn-ae wh-100" style={{ top: 0 }}>
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
      <div className="jk-row pn-re" style={{ height: '40%', width: '60%' }}>
        <Image
          className="image-border"
          src="https://images.juki.pub/assets/juki-image-surprised.png"
          alt="Juki surprised image"
          fill
        />
      </div>
    </div>
  );
}
