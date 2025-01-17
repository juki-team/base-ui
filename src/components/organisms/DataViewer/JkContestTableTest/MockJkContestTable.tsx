import { ContestSummaryListResponseDTO, Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonLoader, DataViewer, DataViewerHeadersType, DataViewerProps, RefreshIcon, T } from '../../../';
import {
  getContestContestantsHeader,
  getContestDateHeader,
  getContestNameHeader,
  getContestStatusHeader,
} from '../../contest-columns';
import contests from './data.json';

export const MockJkContestTable = (props: Omit<DataViewerProps<ContestSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const [ data, setData ] = useState<ContestSummaryListResponseDTO[]>([]);
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setData(contests.contents as ContestSummaryListResponseDTO[]);
      // setData([]);
    }, 2000);
  }, []);
  const columns: DataViewerHeadersType<ContestSummaryListResponseDTO>[] = useMemo(() => [
    getContestStatusHeader(),
    getContestNameHeader(),
    getContestDateHeader(),
    getContestContestantsHeader(),
  ], []);
  
  const request = useCallback(async ({ sort, filter, setLoaderStatus, pagination }: any) => {
    console.info('request', { sort, filter, pagination });
    setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 6000)));
    setLoaderStatus(Status.SUCCESS);
  }, []);
  
  const extraNodes = useMemo(() => [
    <ButtonLoader
      size="small"
      type="light"
      icon={<RefreshIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader
      size="small"
      type="light"
      icon={<RefreshIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
  ], []);
  
  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <DataViewer<ContestSummaryListResponseDTO>
        {...props}
        cards={{ expanded: true }}
        // headers={columns.slice(0, 4).map(c => ({ ...c, sticky: false }))}
        // headers={columns.slice(0, 4)}
        // rowsView={false}
        // cardsView={false}
        headers={columns}
        data={data}
        rows={{ height: 150 }}
        request={request}
        name="problems"
        //extraNodesFloating
        extraNodes={extraNodes}
        pageSizeOptions={[ 5, 10, 15, 20 ]}
        totalData={data.length}
        getRecordClassName={({ index }) => index + ''}
        //getRecordStyle={({ index }) => ({ zIndex: index })}
        onRecordClick={(props) => console.info('click', props)}
        // pagination={{ total: data.length }}
        // toRow={toProblemDataViewer}
      />
    </div>
  );
};
