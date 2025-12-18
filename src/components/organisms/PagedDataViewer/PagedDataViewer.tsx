import { type  ContentsResponseType } from '@juki-team/commons';
import { useMemo, useRef } from 'react';
import { DEFAULT_DATA_VIEWER_PROPS, PAGE_SIZE_OPTIONS } from '../../../constants';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useDataViewerRequester } from '../../hooks/useDataViewerRequester';
import { useStableRef } from '../../hooks/useStableRef';
import { DataViewer } from '../_layz_/DataViewer';
import type { PagedDataViewerProps } from '../_layz_/DataViewer/types';

export function PagedDataViewer<T extends object, V = T>(props: PagedDataViewerProps<T, V>) {
  
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
    getRecordStyle,
    downloads,
    deps = [],
  } = props;
  
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  const {
    data: response,
    request,
    setLoaderStatusRef,
  } = useDataViewerRequester<ContentsResponseType<V>>(getUrl, { refreshInterval });
  
  const lastTotalRef = useRef(-1);
  
  lastTotalRef.current = response?.success ? response.meta.totalElements : lastTotalRef.current;
  
  const toRowRef = useStableRef(toRow);
  const data: T[] = useMemo(() => {
    const data = response?.success ? response.contents : [];
    return toRowRef.current ? data.map(toRowRef.current) : (data as unknown as T[]);
  }, [ response, toRowRef ]);
  
  return (
    <DataViewer<T>
      getRecordStyle={getRecordStyle}
      cards={cards}
      headers={headers}
      data={data}
      rows={rows}
      request={request}
      rowsView={!isSmallScreen}
      name={name}
      setLoaderStatusRef={setLoaderStatusRef}
      extraNodes={extraNodes}
      extraNodesFloating
      totalData={Math.max(lastTotalRef.current, 0)}
      getRecordKey={getRowKey}
      onRecordClick={onRecordClick}
      onRecordHover={onRecordHover}
      onRecordRender={onRecordRender}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      initializing={lastTotalRef.current === -1}
      downloads={downloads}
      deps={deps}
      {...DEFAULT_DATA_VIEWER_PROPS}
    />
  );
}
