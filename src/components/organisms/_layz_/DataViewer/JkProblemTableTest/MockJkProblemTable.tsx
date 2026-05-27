import type { ProblemSummaryListResponseDTO } from '@juki-team/commons/dto';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataViewer } from '..';
import { T } from '../../../../atoms/T/T';
import { ButtonLoader } from '../../../../molecules/ButtonLoader/ButtonLoader';
import { getProblemAdminActionsHeader } from '../../../../templates/columns/problem-columns/getProblemAdminActionsHeader';
import { getProblemKeyHeader } from '../../../../templates/columns/problem-columns/getProblemKeyHeader';
import { getProblemModeHeader } from '../../../../templates/columns/problem-columns/getProblemModeHeader';
import { getProblemNameHeader } from '../../../../templates/columns/problem-columns/getProblemNameHeader';
import { getProblemOwnerHeader } from '../../../../templates/columns/problem-columns/getProblemOwnerHeader';
import { getProblemTagsHeader } from '../../../../templates/columns/problem-columns/getProblemTagsHeader';
import { getProblemTypeHeader } from '../../../../templates/columns/problem-columns/getProblemTypeHeader';
import { ButtonAction } from '../../../../molecules/ButtonAction/ButtonAction';
import { RefreshIcon } from '../../../../atoms/server/icons/google/RefreshIcon';
import type { DataViewerHeadersType, DataViewerProps, DataViewerRequestType } from '../types';
import problems from './data.json';

export const MockJkProblemTable = (props: Omit<DataViewerProps<ProblemSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const [data, setData] = useState<ProblemSummaryListResponseDTO[]>([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData(problems.contents as unknown as ProblemSummaryListResponseDTO[]);
      // setData([]);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  const columns: DataViewerHeadersType<ProblemSummaryListResponseDTO>[] = useMemo(
    () => [
      getProblemKeyHeader(),
      getProblemNameHeader(false),
      getProblemModeHeader(),
      getProblemTypeHeader(),
      getProblemTagsHeader([
        { value: '1', label: 1 },
        { value: '2', label: 2 },
        { value: '3', label: 3 },
      ]),
      getProblemOwnerHeader(false),
      getProblemAdminActionsHeader(),
    ],
    [],
  );

  const request: DataViewerRequestType = useCallback(async ({ sort, filter, pagination }) => {
    console.info('request', { sort, filter, pagination });
    // setLoaderStatus(Status.LOADING);
    await new Promise((resolve) => setTimeout(() => resolve(true), 6000));
    // setLoaderStatus(Status.SUCCESS);
  }, []);

  const extraNodes = useMemo(
    () => [
      <ButtonLoader
        key="button-1"
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="tooltip testing"
        data-tooltip-place="left"
        size="small"
        type="secondary"
        icon={<RefreshIcon />}
        onClick={() => console.info('CLICK')}
        responsiveMobile
      >
        <T>download</T>
      </ButtonLoader>,
      <ButtonLoader
        key="button-2"
        size="small"
        type="secondary"
        icon={<RefreshIcon />}
        onClick={() => console.info('CLICK')}
        responsiveMobile
      >
        <T>download</T>
      </ButtonLoader>,
      <ButtonAction
        key="button-3"
        buttons={[{ children: <ButtonLoader>que</ButtonLoader> }, { children: <ButtonLoader>tal</ButtonLoader> }]}
      >
        <ButtonLoader>hola</ButtonLoader>
      </ButtonAction>,
    ],
    [],
  );

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
        requestRef={request}
        name="problems"
        //extraNodesFloating
        extraNodes={extraNodes}
        pageSizeOptions={[5, 10, 15, 20]}
        totalData={data.length}
        getRecordClassName={({ index }) => `${index}`}
        //getRecordStyle={({ index }) => ({ zIndex: index })}
        onRecordClick={(props) => console.info('click', props)}
        // pagination={{ total: data.length }}
        // toRow={toProblemDataViewer}
      />
    </div>
  );
};
