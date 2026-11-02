import { type ContestSummaryListResponseDto } from '@juki-team/commons';
import { T } from '../../../atoms';
import { Field } from '../../../organisms';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { GroupIcon } from '../../../server';

export function getContestContestantsHeader(): DataViewerHeadersType<ContestSummaryListResponseDto> {
  return {
    head: 'contestants',
    index: 'totalContestants',
    Field: ({ record: { totalContestants }, isCard }) => (
      <Field className="jk-row">
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
      </Field>
    ),
    sort: true,
    cardPosition: 'bottom',
  };
}
