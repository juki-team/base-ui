import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { DateLiteral, EventIcon, ScheduleIcon, T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const getContestDateHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'dates',
  index: 'date',
  Field: ({ record: { settings, isEndless }, isCard }) => (
    <Field className="jk-row extend">
      {isEndless ? (
          isCard ? '' : '-'
        ) :
        isCard ? (
          <div className="jk-row block extend nowrap space-between">
            <div className="jk-row gap nowrap">
              <EventIcon size="small" />
              <div className="jk-col">
                <div className="jk-row nowrap">{new Date(settings.startTimestamp).toLocaleDateString()}</div>
                <T className="cr-g4 tx-s tt-se ws-np">start date</T>
              </div>
            </div>
            <div className="jk-row gap nowrap">
              <ScheduleIcon size="small" />
              <div className="jk-col">
                <div className="jk-row ws-np">{new Date(settings.startTimestamp).toLocaleTimeString()}</div>
                <T className="cr-g4 tx-s tt-se">hour</T>
              </div>
            </div>
          </div>
        ) : (
          <DateLiteral date={new Date(settings.startTimestamp)} show="year-month-day-hours-minutes" twoLines />
        )}
      -
      {isEndless ? (
          isCard ? '' : '-'
        ) :
        isCard ? (
          <div className="jk-row block extend nowrap space-between">
            <div className="jk-row gap nowrap">
              <EventIcon size="small" />
              <div className="jk-col">
                <div>{new Date(settings.endTimestamp).toLocaleDateString()}</div>
                <T className="cr-g4 tx-s tt-se">end date</T>
              </div>
            </div>
            <div className="jk-row gap nowrap">
              <ScheduleIcon size="small" />
              <div className="jk-col">
                <div>{new Date(settings.endTimestamp).toLocaleTimeString()}</div>
                <T className="cr-g4 tx-s tt-se">hour</T>
              </div>
            </div>
          </div>
        ) : (
          <DateLiteral date={new Date(settings.endTimestamp)} show="year-month-day-hours-minutes" twoLines />
        )}
    </Field>
  ),
  sort: true,
  filter: { type: 'date-range', pickerType: 'year-month-day-hours-minutes' },
  cardPosition: 'center',
  minWidth: 320,
});
