import { Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ButtonLoader,
  DataViewer,
  DataViewerHeadersType,
  DataViewerProps,
  getProblemAdminActionsHeader,
  getProblemKeyIdHeader,
  getProblemModeHeader,
  getProblemNameHeader,
  getProblemOwnerHeader,
  getProblemStateHeader,
  getProblemTagsHeader,
  getProblemTypeHeader,
  ProblemDataViewerType,
  ReloadIcon,
  T,
  toProblemDataViewer,
} from '../../../';
import problems from './data.json';

export const MockJkProblemTable = (props: Omit<DataViewerProps<ProblemDataViewerType>, 'data'>) => {
  const [ data, setData ] = useState<ProblemDataViewerType[]>([]);
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setData(problems.contents.map(toProblemDataViewer) as ProblemDataViewerType[]);
      // setData([]);
    }, 2000);
  }, []);
  const columns: DataViewerHeadersType<ProblemDataViewerType>[] = useMemo(() => [
    getProblemKeyIdHeader(true),
    getProblemNameHeader(),
    getProblemModeHeader(),
    getProblemTypeHeader(),
    getProblemTagsHeader([]),
    getProblemOwnerHeader(false),
    getProblemStateHeader(),
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
      size="small"
      type="light"
      icon={<ReloadIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader
      size="small"
      type="light"
      icon={<ReloadIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader size="small" icon={<ReloadIcon />} onClick={() => console.info('CLICK')}>
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader size="small" icon={<ReloadIcon />} onClick={() => console.info('CLICK')} responsiveMobile>
      <T>download</T>
    </ButtonLoader>,
  ], []);
  
  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <DataViewer<ProblemDataViewerType>
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
