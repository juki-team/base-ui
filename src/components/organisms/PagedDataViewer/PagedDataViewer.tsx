import { type  ContentsResponseType } from '@juki-team/commons';
import { useEffect, useMemo, useRef } from 'react';
import { DEFAULT_DATA_VIEWER_PROPS, PAGE_SIZE_OPTIONS } from '../../../constants';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useDataViewerRequester } from '../../hooks/useDataViewerRequester';
import { DataViewer } from '../_layz_/DataViewer';
import type { PagedDataViewerProps } from '../_layz_/DataViewer/types';

export function PagedDataViewer<T extends { [key: string]: any }, V = T>(props: PagedDataViewerProps<T, V>) {
  
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
    onRecordHover,
    onRecordRender,
    dependencies = [],
    getRecordStyle,
    downloads,
  } = props;
  
  const viewPortSize = usePageStore(store => store.viewPort.size);
  const {
    data: response,
    request,
    setLoaderStatusRef,
    reload,
    reloadRef,
  } = useDataViewerRequester<ContentsResponseType<V>>(getUrl, { refreshInterval });
  
  useEffect(() => {
    if (dependencies.length) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  
  const lastTotalRef = useRef(-1);
  
  lastTotalRef.current = response?.success ? response.meta.totalElements : lastTotalRef.current;
  
  const data: T[] = useMemo(() => {
    const data = response?.success ? response.contents : [];
    return toRow ? data.map(toRow) : (data as unknown as T[]);
  }, [ response, toRow ]);
  
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
      totalData={Math.max(lastTotalRef.current, 0)}
      getRecordKey={getRowKey}
      onRecordClick={onRecordClick}
      onRecordHover={onRecordHover}
      onRecordRender={onRecordRender}
      reloadRef={reloadRef}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      initializing={lastTotalRef.current === -1}
      downloads={downloads}
      {...DEFAULT_DATA_VIEWER_PROPS}
    />
  );
}
