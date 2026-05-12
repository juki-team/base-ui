import type { ContestSummaryListResponseDTO } from '@juki-team/commons/dto';
import { GroupIcon } from '../../../../atoms/server';
import { T } from '../../../../atoms/T/T.server';
import type { DataViewerHeadersType } from '../../../../organisms/types';

export function getContestContestantsHeader(): DataViewerHeadersType<ContestSummaryListResponseDTO> {
  return {
    head: 'contestants',
    index: 'totalContestants',
    Field: ({ record: { totalContestants }, isCard }) => (
      <div className="jk-table-field jk-row">
        {isCard ? (
          <div className="jk-row gap nowrap center">
            <GroupIcon size="small" />
            <div className="jk-col stretch">
              <div className="jk-row">{totalContestants}</div>
              <T className="cr-tx-mt tx-s tt-se ws-np">contestants</T>
            </div>
          </div>
        ) : (
          totalContestants
        )}
      </div>
    ),
    sort: true,
    cardPosition: 'bottom',
  };
}
