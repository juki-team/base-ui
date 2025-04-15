import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../../atoms';
import { Field } from '../../../organisms';
import { DataViewerHeadersType } from '../../../organisms/types';
import { GroupIcon } from '../../../server';

export const getContestContestantsHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'contestants',
  index: 'totalContestants',
  Field: ({ record: { totalContestants }, isCard }) => (
    <Field className="jk-row">
      {isCard ? (
        <div className="jk-row gap nowrap center">
          <GroupIcon size="small" />
          <div className="jk-col stretch">
            <div className="jk-row">{totalContestants}</div>
            <T className="cr-g4 tx-s tt-se ws-np">contestants</T>
          </div>
        </div>
      ) : (
        totalContestants
      )}
    </Field>
  ),
  sort: true,
  cardPosition: 'bottom',
});
