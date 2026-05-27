import { consoleError } from '@juki-team/commons/helpers';
import type { ContentResponse, ContentsResponse, ErrorResponse } from '@juki-team/commons/types';
import { useEffect, useMemo, useRef } from 'react';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { LoaderLayer } from '../../atoms/server/loaders/LoaderLayer';
import { LineLoader } from '../../atoms/server/loaders/line-loader/LineLoader';
import { renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers/render';
import { useFetcher } from '../../hooks/useFetcher';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import type { FetcherLayerProps } from './types';

const isContentResponseType = <T,>(data: unknown): data is ContentResponse<T> => {
  return !!(data && typeof data === 'object' && 'success' in data && 'content' in data && data.success);
};

const isContentsResponseType = <T,>(data: unknown): data is ContentsResponse<T> => {
  return !!(data && typeof data === 'object' && 'success' in data && 'contents' in data && data.success);
};

const isErrorResponseType = (data: unknown): data is ErrorResponse => {
  return !!(data && typeof data === 'object' && 'success' in data && data.success === false);
};

export function FetcherLayer<T extends ContentResponse<U> | ContentsResponse<U>, U = unknown>(props: FetcherLayerProps<T, U>) {
  const { url, options, errorView, loadingView, children, onError: _onError, triggerFetch } = props;

  const onErrorRef = useRef(_onError);
  onErrorRef.current = _onError;
  const { isLoading, data, error, mutate, isValidating } = useFetcher<T>(url, options);
  const { notifyResponse } = useJukiNotification();
  const { Image } = useUIStore((store) => store.components);
  useEffect(() => {
    if (triggerFetch) {
      void mutate();
    }
  }, [triggerFetch, mutate]);

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
  }, [notifyResponse, isError]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: children is intentionally excluded to avoid re-rendering on every render of the parent (children is a function reference recreated each render)
  const validChild = useMemo(() => {
    if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
      return renderReactNodeOrFunctionP1(children, { data, isLoading, error, mutate });
    }
    return null;
  }, [data, error, isLoading, mutate]);

  if (isLoading) {
    if (loadingView) {
      return <>{renderReactNodeOrFunction(loadingView)}</>;
    }

    return <LoaderLayer loading={true} />;
  }

  if (isContentResponseType<U>(data) || isContentsResponseType<U>(data)) {
    return (
      <>
        {validChild}
        {isValidating && (
          <div className="pn-ae wh-100" style={{ top: 0 }}>
            <LineLoader />
          </div>
        )}
      </>
    );
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
