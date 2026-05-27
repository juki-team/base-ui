import type { ContestSummaryListResponseDTO } from '@juki-team/commons/dto';
import { T } from '../../../atoms';
import { getContestState } from '../../../helpers/contest';
import { FrozenInformation, QuietInformation, UpsolvingInformation } from '../../../molecules';
import type { DataViewerHeadersType } from '../../../organisms/types';

export function getContestStatusHeader(): DataViewerHeadersType<ContestSummaryListResponseDTO> {
  return {
    head: 'status',
    index: 'status',
    Field: ({ record: contest }) => (
      <div className="jk-table-field jk-col center gap">
        <div className={`jk-tag cr-we ${getContestState(contest).bc}`}>
          <T className="tt-ue tx-s">{getContestState(contest).label}</T>
        </div>
        {contest.isLive && contest.isQuietTime ? (
          <QuietInformation />
        ) : (
          contest.isLive && contest.isFrozenTime && <FrozenInformation />
        )}
        {contest.isPast && contest.settings.upsolvingEnabled && <UpsolvingInformation />}
      </div>
    ),
    filter: {
      type: 'select',
      options: ['upcoming', 'live', 'past', 'endless'].map((option) => ({
        value: option,
        label: <T className="tt-ce">{option}</T>,
      })),
    },
    cardPosition: 'upper',
    minWidth: 130,
  };
}
