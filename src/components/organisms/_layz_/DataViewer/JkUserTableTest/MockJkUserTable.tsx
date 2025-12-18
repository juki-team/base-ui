import { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectOptionType } from '../../../../atoms/Select/types';
import {
  ButtonLoader,
  DataViewer,
  Field,
  FieldDate,
  FieldText,
  Popover,
  Select as SelectComponent,
  T,
  TextHeadCell,
} from '../../../../index';
import { RefreshIcon } from '../../../../server';
import { DataViewerHeadersType, DataViewerProps, type DataViewerRequestType } from '../types';
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
        <FieldText text={nickname + givenName + familyName + imageUrl} label={<T>name</T>} />
      ),
      // sort: true,
      // filter: { type: 'text' },
      cardPosition: 'top',
      minWidth: 300,
      sticky: true,
      group: '_',
    },
    {
      index: 'email',
      headClassName: 'left',
      minWidth: 200,
      Field: ({ record: { email } }) => <FieldText text={email} label={<T>email</T>} />,
      // sort: { compareFn: () => (rowA, rowB) => rowA.email.localeCompare(rowB.email) },
      // filter: { type: 'text', callbackFn: ({ text }) => (row) => row.email === text } as FilterTextOffline<UserTable>,
      // filter: { type: FILTER_TEXT_AUTO },
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
      // filter: {
      //   type: FILTER_DATE_RANGE_AUTO,
      //   pickerType: 'year-month-day-hours-minutes-seconds-milliseconds',
      //   getValue: () => new Date(),
      //   baseStartDate: new Date(0),
      // } as FilterDateRangeAutoOfflineType<UserTable>,
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
      style: { background: 'red' },
      minWidth: 200,
    },
    {
      index: 'dateTest',
      Field: ({ record: { dateTest } }) => <FieldDate date={dateTest} label="fecha" />,
      // sort: {
      //   compareFn: () => (rowA, rowB) => (
      //     rowB.dateTest.getTime() - rowA.dateTest.getTime()
      //   ),
      // },
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
      // filter: {
      //   type: FILTER_DATE_AUTO,
      //   pickerType: 'year-month-day',
      //   isDisabled: () => ({ year: false }),
      // } as FilterDateAutoOfflineType<UserTable>,
      group: 'group1',
      style: { background: 'blue' },
    },
    {
      index: 'dateTestRange',
      Field: ({ record: { dateTestRange } }) => <FieldDate date={dateTestRange} label="fecha" />,
      // filter: {
      //   type: FILTER_DATE_RANGE_AUTO,
      //   pickerType: 'year-month-day-hours-minutes-seconds',
      //   isDisabled: () => ({ year: false }),
      // } as FilterDateRangeAutoOfflineType<UserTable>,
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
            <div className="jk-tag bc-g4">{status}</div>
          </Popover>
          <div
            className="Row"
            children={<div style={{ backgroundColor: 'red' }}>{status}</div>}
          />
        </Field>
      ),
      // sort: { compareFn: () => (rowA, rowB) => rowA.status.localeCompare(rowB.status) },
      // Filter: {
      //   type: FILTER_SELECT_AUTO,
      //   options: [
      //     { value: 'ARCHIVED', label: 'Archived :(' },
      //     { value: 'ACTIVE', label: 'Active :)' },
      //     { value: 'aa', label: 'aaaaaaaaaaaaaaa aaaaaaaaaaaaa' },
      //     { value: 'a1', label: <T>as</T> },
      //     { value: 'a2', label: 'a' },
      //     { value: 'a3', label: 'a' },
      //     { value: 'a4', label: 'a' },
      //     { value: 'a5', label: 'a' },
      //     { value: 'a6', label: 'a' },
      //     { value: 'a7', label: 'a' },
      //     { value: 'a8', label: 'a' },
      //     { value: 'a9', label: 'a' },
      //     { value: 'a0', label: 'a' },
      //   ],
      //   // callbackFn: ({ columnIndex, selectedOptions }) => (row) => !!selectedOptions.find(({ value }) => value === row.status),
      // } as FilterSelectAutoOfflineType<UserTable>,
      cardPosition: 'topRight',
    },
  ], []);
  const columns2: DataViewerHeadersType<UserTable>[] = useMemo(() => [
    {
      head: <TextHeadCell text="Name / Nickname" />,
      index: 'name',
      Field: ({ record: { nickname } }) => (
        <FieldText text={nickname} label={<T>name</T>} />
      ),
      sort: true,
      // filter: { type: 'text' },
      cardPosition: 'topLeft',
      sticky: true,
    },
    {
      head: <TextHeadCell text="Name / Nickname" />,
      index: 'name-2',
      Field: ({ record: { givenName } }) => (
        <FieldText text={givenName} label="test" />
      ),
      // sort: true,
      // filter: { type: 'text' },
      cardPosition: 'topLeft',
      sticky: false,
    },
  ], []);
  
  const request: DataViewerRequestType = useCallback(async ({ sort, filter, pagination }) => {
    console.info('request', { sort, filter, pagination });
    // setLoaderStatus(Status.LOADING);
    await (new Promise((resolve) => setTimeout(() => resolve(true), 4000)));
    // setLoaderStatus(Status.SUCCESS);
  }, []);
  
  const extraNodes = useMemo(() => [
    <ButtonLoader
      key="download"
      size="small"
      type="light"
      icon={<RefreshIcon />}
      onClick={() => console.info('CLICK')}
      responsiveMobile
    >
      <T>download</T>
    </ButtonLoader>,
    <ButtonLoader
      key="download-2"
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
        groups={[
          { value: 'group1', label: <div style={{ backgroundColor: 'red' }}>hola</div> },
          {
            value: 'group2',
            label: <div>holaaaaaaaaaaaaaaaa</div>,
            style: { background: 'transparent' },
          },
        ]}
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
        downloads={[
          {
            value: 'test',
            label: 'download csv',
            getUrl: () => 'https://api.juki.app/v2/submission/summary-list-export?page=1&pageSize=1000000&contestKeys=T-UtS',
            getFilename: () => 'test.zip',
          },
        ]}
      />
    </div>
  );
};
