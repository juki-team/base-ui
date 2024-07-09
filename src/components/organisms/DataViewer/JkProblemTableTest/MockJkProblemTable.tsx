import {
  ENTITY_STATE,
  EntityState,
  PROBLEM_MODE,
  PROBLEM_MODES,
  PROBLEM_TYPE,
  ProblemType,
  ProfileSetting,
  Status,
} from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ButtonLoader,
  DataViewer,
  DataViewerHeadersType,
  DataViewerProps,
  ProblemAdminActionsField,
  ProblemDataViewer,
  ProblemKeyIdField,
  ProblemModeField,
  ProblemNameField,
  ProblemOwnerField,
  ProblemTypeField,
  ReloadIcon,
  T,
  TextField,
  toProblemDataViewer,
} from '../../../';
import { useJukiUser } from '../../../../hooks/useJukiUser';
import problems from './data.json';

export const MockJkProblemTable = (props: Omit<DataViewerProps<ProblemDataViewer>, 'data'>) => {
  const [ data, setData ] = useState<ProblemDataViewer[]>([]);
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setData(problems.contents.map(toProblemDataViewer) as ProblemDataViewer[]);
    }, 2000);
  }, []);
  const columns: DataViewerHeadersType<ProblemDataViewer>[] = useMemo(() => [
    {
      head: 'id',
      index: 'key',
      Field: ProblemKeyIdField,
      sort: true,
      filter: { type: 'text' },
      cardPosition: 'top',
      sticky: true,
      minWidth: 240,
    },
    {
      head: 'problem name',
      headClassName: 'left',
      index: 'name',
      Field: ProblemNameField,
      sort: true,
      filter: { type: 'text' },
      cardPosition: 'center',
      minWidth: 300,
    },
    {
      head: 'mode',
      index: 'mode',
      Field: ProblemModeField,
      sort: true,
      filter: {
        type: 'select',
        options: PROBLEM_MODES.map((problemMode) => ({ value: problemMode, label: PROBLEM_MODE[problemMode].label })),
      },
      cardPosition: 'top',
    },
    {
      head: 'type',
      index: 'type',
      Field: ProblemTypeField,
      sort: true,
      filter: {
        type: 'select',
        options: [ ProblemType.STANDARD, ProblemType.DYNAMIC ].map((problemType) => ({
          value: problemType,
          label: PROBLEM_TYPE[problemType].label,
        })),
      },
      cardPosition: 'top',
      minWidth: 100,
    },
    // {
    //   head: 'tags',
    //   index: 'tags',
    //   Field: ProblemTagsField,
    //   filter: {
    //     type: 'select',
    //     options: tags.map(tag => ({ value: tag, label: <T>tag</T> })),
    //   } as FilterSelectOnlineType,
    //   cardPosition: 'center',
    //   minWidth: 250,
    // },
    {
      head: 'owner',
      index: 'owner',
      Field: ProblemOwnerField,
      sort: true,
      cardPosition: 'bottomRight',
      minWidth: 200,
    },
    {
      head: 'state',
      index: 'state',
      Field: ({ record: { state } }) => (
        <TextField
          text={<T className="tt-se">{state ? ENTITY_STATE[state].label : '-'}</T>}
          label={<T className="tt-se">visibility</T>}
        />
      ),
      sort: true,
      filter: {
        type: 'select',
        options: ([
          EntityState.ARCHIVED,
          EntityState.RELEASED,
        ]).map(state => ({
          value: state,
          label: <T className="tt-se">{ENTITY_STATE[state].label}</T>,
        })),
      },
      cardPosition: 'bottomLeft',
      minWidth: 180,
    },
    {
      head: 'actions',
      index: 'actions',
      Field: ProblemAdminActionsField,
      cardPosition: 'bottom',
      minWidth: 100,
    },
  ], []);
  
  const request = useCallback(async ({ sort, filter, setLoaderStatus, pagination }: any) => {
    console.info('request', { sort, filter, pagination });
    setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 6000)));
    setLoaderStatus(Status.SUCCESS);
  }, []);
  
  const { user: { settings: { [ProfileSetting.DATA_VIEW_MODE]: preferredDataViewMode } } } = useJukiUser();
  
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
      <DataViewer<ProblemDataViewer>
        {...props}
        preferredDataViewMode={preferredDataViewMode}
        cards={{ expanded: true }}
        // headers={columns.slice(0, 4).map(c => ({ ...c, sticky: false }))}
        // headers={columns.slice(0, 4)}
        // rowsView={false}
        // cardsView={false}
        headers={columns}
        data={data}
        rows={{ height: 150 }}
        request={request}
        name="users"
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
