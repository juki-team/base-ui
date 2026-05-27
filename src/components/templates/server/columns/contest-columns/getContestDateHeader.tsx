import type { ContestSummaryListResponseDTO } from '@juki-team/commons/dto';
import { EventIcon } from '../../../../atoms/server/icons/google/EventIcon';
import { ScheduleIcon } from '../../../../atoms/server/icons/google/ScheduleIcon';
import { DateLiteral } from '../../../../atoms/server/DateLiteral/DateLiteral';
import { T } from '../../../../atoms/T/T.server';
import type { DataViewerHeadersType } from '../../../../organisms/types';

export function getContestDateHeader(): DataViewerHeadersType<ContestSummaryListResponseDTO> {
  return {
    head: 'dates',
    index: 'date',
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
    Field: ({ record: { settings, isEndless }, isCard }) => (
      <div className="jk-table-field jk-row extend">
        {isEndless ? (
          isCard ? (
            ''
          ) : (
            '-'
          )
        ) : isCard ? (
          <div className="jk-row block extend nowrap space-between">
            <div className="jk-row gap nowrap">
              <EventIcon size="small" />
              <div className="jk-col">
                <div className="jk-row nowrap">{new Date(settings.startsAt).toLocaleDateString()}</div>
                <T className="cr-tx-mt tx-s tt-se ws-np">start date</T>
              </div>
            </div>
            <div className="jk-row gap nowrap">
              <ScheduleIcon size="small" />
              <div className="jk-col">
                <div className="jk-row ws-np">{new Date(settings.startsAt).toLocaleTimeString()}</div>
                <T className="cr-tx-mt tx-s tt-se">hour</T>
              </div>
            </div>
          </div>
        ) : (
          <DateLiteral date={new Date(settings.startsAt)} show="year-month-day-hours-minutes" twoLines />
        )}
        -
        {isEndless ? (
          isCard ? (
            ''
          ) : (
            '-'
          )
        ) : isCard ? (
          <div className="jk-row block extend nowrap space-between">
            <div className="jk-row gap nowrap">
              <EventIcon size="small" />
              <div className="jk-col">
                <div>{new Date(settings.endsAt).toLocaleDateString()}</div>
                <T className="cr-tx-mt tx-s tt-se">end date</T>
              </div>
            </div>
            <div className="jk-row gap nowrap">
              <ScheduleIcon size="small" />
              <div className="jk-col">
                <div>{new Date(settings.endsAt).toLocaleTimeString()}</div>
                <T className="cr-tx-mt tx-s tt-se">hour</T>
              </div>
            </div>
          </div>
        ) : (
          <DateLiteral date={new Date(settings.endsAt)} show="year-month-day-hours-minutes" twoLines />
        )}
      </div>
    ),
    sort: true,
    filter: { type: 'date-range', pickerType: 'year-month-day-hours-minutes' },
    cardPosition: 'center',
    minWidth: 320,
  };
}
