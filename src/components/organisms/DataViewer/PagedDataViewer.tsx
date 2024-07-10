import { ContentsResponseType } from '@juki-team/commons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_DATA_VIEWER_PROPS, PAGE_SIZE_OPTIONS } from '../../../constants';
import { useDataViewerRequester, useJukiUI } from '../../../hooks';
import { DataViewer } from './DataViewer';
import { PagedDataViewerProps } from './types';

export const PagedDataViewer = <T extends { [key: string]: any }, V = T>(props: PagedDataViewerProps<T, V>) => {
  
  const {
    cards,
    rows = { height: 68 },
    headers,
    name,
    toRow,
    getUrl,
    refreshInterval,
    extraNodes,
    getRowKey,
    onRecordClick,
    dependencies = [],
    getRecordStyle,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const {
    data: response,
    request,
    setLoaderStatusRef,
    reload,
    reloadRef,
    isLoading,
  } = useDataViewerRequester<ContentsResponseType<V>>(getUrl, { refreshInterval });
  
  useEffect(() => {
    if (dependencies.length) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  // const [ _, setRender ] = useState(Date.now()); // TODO: Fix the render of DataViewer
  // useEffect(() => {
  //   setTimeout(() => setRender(Date.now()), 100);
  // }, [ response ]);
  
  const lastTotalRef = useRef(0);
  
  lastTotalRef.current = response?.success ? response.meta.totalElements : lastTotalRef.current;
  
  const data: T[] = useMemo(() => {
    const data = response?.success ? response.contents : [];
    return toRow ? data.map(toRow) : (data as unknown as T[]);
  }, [ response, toRow ]);
  const [ initializing, setInitializing ] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      setInitializing(false);
    }
  }, [ isLoading ]);
  
  return (
    <DataViewer<T>
      getRecordStyle={getRecordStyle}
      cards={cards}
      headers={headers}
      data={data}
      rows={rows}
      request={request}
      rowsView={viewPortSize !== 'sm'}
      name={name}
      setLoaderStatusRef={setLoaderStatusRef}
      extraNodes={extraNodes}
      extraNodesFloating
      totalData={lastTotalRef.current}
      getRecordKey={getRowKey}
      onRecordClick={onRecordClick}
      reloadRef={reloadRef}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      initializing={initializing}
      {...DEFAULT_DATA_VIEWER_PROPS}
    />
  );
};
