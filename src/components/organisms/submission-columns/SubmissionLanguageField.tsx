import { Judge, SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { SubmissionInfo } from '../../templates/Submission/SubmissionInfo';
import { DataViewerHeadersType, Field } from '../DataViewer';

export type LanguagesByJudge = {
  [key: string]: { key: string | Judge, name: string, languages: { [key: string]: { label: string, value: string } } },
};

export const getSubmissionLanguageHeader = (languagesByJudge: LanguagesByJudge): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'language',
  index: 'languages',
  Field: ({ record: { submitId, user: { canViewSourceCode }, language, problem: { judgeKey } }, isCard }) => (
    isCard ? null :
      <Field>
        <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
          <div className="jk-col extend">{languagesByJudge[judgeKey]?.languages[language]?.label || language}</div>
        </SubmissionInfo>
      </Field>
  ),
  sort: true,
  filter: {
    type: 'select',
    options: Object.values(languagesByJudge).map(({ name, languages }) => (
      Object.values(languages).map(({ label, value }) => ({
        label: Object.keys(languages).length === 1
          ? label
          : (
            <div className="jk-row">
              {label}&nbsp;
              <div className="jk-tag bc-hl tx-t">{name}</div>
            </div>
          ),
        value,
      }))
    )).flat(),
  },
  cardPosition: 'bottom',
  minWidth: 180,
});
