import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { contestStateMap } from '../../../helpers';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const getContestStatusHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'status',
  index: 'status',
  Field: ({ record: contest }) => (
    <Field className="jk-row pad">
      <div
        className={`jk-tag ${contestStateMap[[
          contest.isPast,
          contest.isLive,
          contest.isFuture,
          contest.isEndless,
        ].toString()]?.color}`}
      >
        <T className="tt-ue tx-s">{contestStateMap[[
          contest.isPast,
          contest.isLive,
          contest.isFuture,
          contest.isEndless,
        ].toString()]?.label}</T>
      </div>
    </Field>
  ),
  filter: {
    type: 'select',
    options: [ 'upcoming', 'live', 'past' ].map(option => ({
      value: option,
      label: <T className="tt-ce">{option}</T>,
    })),
  },
  cardPosition: 'upper',
  minWidth: 130,
});
