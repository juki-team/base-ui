import { Status } from '@juki-team/commons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ButtonLoader,
  DataViewer,
  DataViewerHeadersType,
  DataViewerProps,
  DateField,
  Field,
  FILTER_DATE_AUTO,
  FILTER_DATE_RANGE_AUTO,
  FILTER_SELECT_AUTO,
  FILTER_TEXT_AUTO,
  FilterDateAutoOfflineType,
  FilterDateRangeAutoOfflineType,
  FilterSelectAutoOfflineType,
  Popover,
  Select as SelectComponent,
  SelectOptionType,
  T,
  TextField,
  TextHeadCell,
} from '../../../';
import { RefreshIcon } from '../../../server';
import users from './data.json';

export interface JkUserTableProps {
  cardsView?: boolean,
  rowsView?: boolean
}

type UserTable = {
  key: string,
  givenName: string,
  familyName: string,
  email: string,
  nickname: string,
  status: string,
  imageUrl: string,
  dateTest: Date,
  dateTestRange: Date,
}

export const MockJkUserTable = (props: Omit<DataViewerProps<UserTable>, 'data' | 'headers'>) => {
  const [ data, setData ] = useState<UserTable[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData(users.list.map(user => (
        {
          key: `nickname-(${user.nickname + ')-' + user.status}`,
          givenName: user.givenName,
          familyName: user.familyName,
          email: user.email,
          nickname: user.nickname,
          status: user.status,
          imageUrl: user.imageUrl,
          dateTest: new Date(new Date().getFullYear(), new Date().getMonth() + Math.round(Math.random() * 3), Math.round(Math.random() * 20 + 1), Math.round(Math.random() * 20 + 1), Math.round(Math.random() * 50 + 1), Math.round(Math.random() * 50 + 1)),
          dateTestRange: new Date(new Date().getFullYear(), new Date().getMonth() + Math.round(Math.random() * 3), Math.round(Math.random() * 20 + 1), Math.round(Math.random() * 20 + 1), Math.round(Math.random() * 50 + 1), Math.round(Math.random() * 50 + 1)),
        } as UserTable
      )));
    }, 8000);
  }, []);
  const columns: DataViewerHeadersType<UserTable>[] = useMemo(() => [
    {
      head: <TextHeadCell text="Name / Nickname" />,
      index: 'name',
      Field: ({ record: { nickname, givenName, familyName, imageUrl } }) => (
        <TextField text={nickname + givenName + familyName + imageUrl} label={<T>name</T>} />
      ),
      sort: true,
      filter: { type: 'text' },
      cardPosition: 'top',
      minWidth: 300,
      sticky: true,
      group: '_',
    },
    {
      index: 'email',
      headClassName: 'left',
      minWidth: 200,
      Field: ({ record: { email } }) => <TextField text={email} label={<T>email</T>} />,
      sort: { compareFn: () => (rowA, rowB) => rowA.email.localeCompare(rowB.email) },
      // filter: { type: 'text', callbackFn: ({ text }) => (row) => row.email === text } as FilterTextOffline<UserTable>,
      filter: { type: FILTER_TEXT_AUTO },
      cardPosition: 'center',
      sticky: true,
      group: '_',
    },
    {
      index: 'permissions',
      head: <TextHeadCell text={<>prueba permisos</>} />,
      Field: () => (
        <div>test<br />test
        </div>
      ),
      minWidth: 250,
      // filter: { type: 'select', options: [{ value: 'A', label: 'letra A' }, { value: 'B', label: 'letra B' }] },
      // sort: {
      //   compareFn: () => () => (
      //     Math.random()
      //   ),
      // },
      filter: {
        type: FILTER_DATE_RANGE_AUTO,
        pickerType: 'year-month-day-hours-minutes-seconds-milliseconds',
        getValue: () => new Date(),
        baseStartDate: new Date(0),
      } as FilterDateRangeAutoOfflineType<UserTable>,
      group: 'group2',
    },
    {
      index: 'text-large-text-large-text',
      Field: () => <Field>
        <div>holi</div>
        <div>123</div>
        <SelectComponent
          className=""
          options={[ '1', '2', '3' ].map(option => ({
            label: 'label ' + option,
            value: 'value ' + option,
            disabled: (Math.round(Math.random() * 10)) > 7,
          } as SelectOptionType<string, string, string>))}
          selectedOption={{ value: 'value 3' }}
          onChange={() => null}
        />
      </Field>,
      minWidth: 200,
    },
    {
      index: 'dateTest',
      Field: ({ record: { dateTest } }) => <DateField date={dateTest} label="fecha" />,
      sort: {
        compareFn: () => (rowA, rowB) => (
          rowB.dateTest.getTime() - rowA.dateTest.getTime()
        ),
      },
      // filter: {
      //   type: 'date',
      //   pickerType: 'year-month',
      //   isDisabled: () => ({ year: false }),
      //   callbackFn: ({ columnIndex, selectedDate }) => (row) => row.dateTest?.isSameMonth(selectedDate),
      // } as FilterDateOffline<UserTable>,
      // filter: {
      //   type: 'date-match',
      //   pickerType: 'year-month-day',
      //   isDisabled: () => ({ year: false }),
      // } as FilterDateMatchOffline,
      filter: {
        type: FILTER_DATE_AUTO,
        pickerType: 'year-month-day',
        isDisabled: () => ({ year: false }),
      } as FilterDateAutoOfflineType<UserTable>,
      group: 'group1',
    },
    {
      index: 'dateTestRange',
      Field: ({ record: { dateTestRange } }) => <DateField date={dateTestRange} label="fecha" />,
      filter: {
        type: FILTER_DATE_RANGE_AUTO,
        pickerType: 'year-month-day-hours-minutes-seconds',
        isDisabled: () => ({ year: false }),
      } as FilterDateRangeAutoOfflineType<UserTable>,
      group: 'group1',
    },
    {
      index: 'status',
      Field: ({ record: { status } }) => (
        <Field>
          <Popover
            // showPopperArrow
            content={<div>The content</div>}
          >
            <div className="gray-4 jk-tag">{status}</div>
          </Popover>
          <div
            className="Row"
            children={<div style={{ backgroundColor: 'red' }}>{status}</div>}
          />
        </Field>
      ),
      sort: { compareFn: () => (rowA, rowB) => rowA.status.localeCompare(rowB.status) },
      Filter: {
        type: FILTER_SELECT_AUTO,
        options: [
          { value: 'ARCHIVED', label: 'Archived :(' },
          { value: 'ACTIVE', label: 'Active :)' },
          { value: 'aa', label: 'aaaaaaaaaaaaaaa aaaaaaaaaaaaa' },
          { value: 'a1', label: <T>as</T> },
          { value: 'a2', label: 'a' },
          { value: 'a3', label: 'a' },
          { value: 'a4', label: 'a' },
          { value: 'a5', label: 'a' },
          { value: 'a6', label: 'a' },
          { value: 'a7', label: 'a' },
          { value: 'a8', label: 'a' },
          { value: 'a9', label: 'a' },
          { value: 'a0', label: 'a' },
        ],
        // callbackFn: ({ columnIndex, selectedOptions }) => (row) => !!selectedOptions.find(({ value }) => value === row.status),
      } as FilterSelectAutoOfflineType<UserTable>,
      cardPosition: 'topRight',
    },
  ], []);
  const columns2: DataViewerHeadersType<UserTable>[] = useMemo(() => [
    {
      head: <TextHeadCell text="Name / Nickname" />,
      index: 'name',
      Field: ({ record: { nickname, givenName, familyName, imageUrl } }) => (
        <TextField text={nickname} label={<T>name</T>} />
      ),
      sort: true,
      // filter: { type: 'text' },
      cardPosition: 'topLeft',
      sticky: true,
    },
    {
      head: <TextHeadCell text="Name / Nickname" />,
      index: 'name-2',
      Field: ({ record: { nickname, givenName, familyName, imageUrl } }) => (
        <TextField text={givenName} label="test" />
      ),
      // sort: true,
      // filter: { type: 'text' },
      cardPosition: 'topLeft',
      sticky: false,
    },
  ], []);
  
  const request = useCallback(async ({ sort, filter, setLoaderStatus, pagination }: any) => {
    console.info('request', { sort, filter, pagination });
    setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 4000)));
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
    // <ButtonLoader size="small" icon={<RefreshIcon />} onClick={() => console.info('CLICK')}>
    //   <T>download</T>
    // </ButtonLoader>,
    // <ButtonLoader size="small" icon={<RefreshIcon />} onClick={() => console.info('CLICK')} responsiveMobile>
    //   <T>download</T>
    // </ButtonLoader>,
  ], []);
  
  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <DataViewer<UserTable>
        {...props}
        cards={{ expanded: true }}
        // headers={columns.slice(0, 4).map(c => ({ ...c, sticky: false }))}
        // headers={columns.slice(0, 4)}
        // rowsView={false}
        // cardsView={false}
        headers={columns || columns2}
        groups={[ { key: 'group1', label: <div>hola</div> }, { key: 'group2', label: <div>holaaaaaaaaaaaaaaaa</div> } ]}
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
      />
    </div>
  );
};
