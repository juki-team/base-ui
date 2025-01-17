import { ProblemSummaryListResponseDTO, Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ButtonLoader,
  DataViewer,
  DataViewerHeadersType,
  DataViewerProps,
  getProblemAdminActionsHeader,
  getProblemKeyHeader,
  getProblemModeHeader,
  getProblemNameHeader,
  getProblemOwnerHeader,
  getProblemTagsHeader,
  getProblemTypeHeader,
  RefreshIcon,
  T,
} from '../../../';
import problems from './data.json';

export const MockJkProblemTable = (props: Omit<DataViewerProps<ProblemSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const [ data, setData ] = useState<ProblemSummaryListResponseDTO[]>([]);
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setData(problems.contents as ProblemSummaryListResponseDTO[]);
      // setData([]);
    }, 2000);
  }, []);
  const columns: DataViewerHeadersType<ProblemSummaryListResponseDTO>[] = useMemo(() => [
    getProblemKeyHeader(),
    getProblemNameHeader(false),
    getProblemModeHeader(),
    getProblemTypeHeader(),
    getProblemTagsHeader([ '1', '2', '3' ]),
    getProblemOwnerHeader(false),
    getProblemAdminActionsHeader(),
  ], []);
  
  const request = useCallback(async ({ sort, filter, setLoaderStatus, pagination }: any) => {
    console.info('request', { sort, filter, pagination });
    setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 6000)));
    setLoaderStatus(Status.SUCCESS);
  }, []);
  
  const extraNodes = useMemo(() => [
    <ButtonLoader
      data-tooltip-id="jk-tooltip"
      data-tooltip-content="tooltip testing"
      data-tooltip-t-class-name="tt-se"
      data-tooltip-place="left"
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
      <DataViewer<ProblemSummaryListResponseDTO>
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
