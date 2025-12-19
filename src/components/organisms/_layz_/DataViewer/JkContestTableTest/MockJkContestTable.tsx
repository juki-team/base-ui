import { type  ContestSummaryListResponseDTO } from '@juki-team/commons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataViewer } from '../';
import { T } from '../../../../atoms';
import { ButtonLoader } from '../../../../molecules';
import { RefreshIcon } from '../../../../server';
import {
  getContestContestantsHeader,
  getContestDateHeader,
  getContestNameHeader,
  getContestStatusHeader,
} from '../../../../templates';
import type { DataViewerHeadersType, DataViewerProps, DataViewerRequestType } from '../types';
import contests from './data.json';

export const MockJkContestTable = (props: Omit<DataViewerProps<ContestSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const [ data, setData ] = useState<ContestSummaryListResponseDTO[]>([]);
  useEffect(() => {
    setTimeout(() => {
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
  
  const request: DataViewerRequestType = useCallback(async ({ sort, filter, pagination }) => {
    console.info('request', { sort, filter, pagination });
    // setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 6000)));
    // setLoaderStatus(Status.SUCCESS);
  }, []);
  
  const extraNodes = useMemo(() => [
    <ButtonLoader
      key="click"
      size="small"
      type="light"
      icon={<RefreshIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader
      key="click-2"
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
        requestRef={request}
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
