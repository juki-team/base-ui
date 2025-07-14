import { ContentResponseType, PROBLEM_MODE, PROBLEM_TYPE, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiApiManager } from '../../../../../settings';
import { T } from '../../../../atoms';
import { FetcherLayer } from '../../../../molecules';
import { PageNotFound } from '../../../../templates/PageNotFound/PageNotFound';

export const ProblemSummary = ({ problemKey }: { problemKey: string }) => {
  return (
    <div style={{}}>
      <FetcherLayer<ContentResponseType<ProblemSummaryListResponseDTO>>
        url={jukiApiManager.API_V1.problem.getSummary({
          params: {
            key: problemKey,
          },
        }).url}
        errorView={<PageNotFound><T className="tt-se">problem not found</T></PageNotFound>}
      >
        {({ data }) => {
          return (
            <div className="jk-col">
              <div className="fw-bd">{data.content.name}</div>
              <div className="jk-tag bc-io">{data.content.judge.key}</div>
              <div><T className="tt-se fw-bd">type</T>: {PROBLEM_TYPE[data.content.settings.type].label}</div>
              <div><T className="tt-se fw-bd">scoring mode</T>: {PROBLEM_MODE[data.content.settings.scoringMode].label}
              </div>
            </div>
          );
        }}
      </FetcherLayer>
    </div>
  );
};
