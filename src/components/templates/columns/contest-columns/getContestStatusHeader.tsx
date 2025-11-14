import { type ContestSummaryListResponseDTO } from '@juki-team/commons';
import { T } from '../../../atoms';
import { getContestState } from '../../../helpers';
import { Field } from '../../../organisms';
import type { DataViewerHeadersType } from '../../../organisms/types';

export function getContestStatusHeader(): DataViewerHeadersType<ContestSummaryListResponseDTO> {
  return {
    head: 'status',
    index: 'status',
    Field: ({ record: contest }) => (
      <Field className="jk-row pad">
        <div className={`jk-tag cr-we ${getContestState(contest)?.bc}`}>
          <T className="tt-ue tx-s">{getContestState(contest)?.label}</T>
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
  };
}
