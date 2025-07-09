import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { contestStateMap } from '../../../../helpers';
import { T } from '../../../atoms';
import { Field } from '../../../organisms';
import { DataViewerHeadersType } from '../../../organisms/types';

export const getContestStatusHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'status',
  index: 'status',
  Field: ({ record: contest }) => (
    <Field className="jk-row pad">
      <div
        className={`jk-tag cr-we ${contestStateMap[[
          contest.isPast,
          contest.isLive,
          contest.isFuture,
          contest.isEndless,
        ].toString()]?.bc}`}
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
