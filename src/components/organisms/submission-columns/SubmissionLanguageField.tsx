import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { SubmissionInfo } from '../../templates/Submission/SubmissionInfo';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const getSubmissionLanguageHeader = (languages: {
  [key: string]: { label: string, value: string }
}): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'language',
  index: 'languages',
  Field: ({ record: { submitId, user: { canViewSourceCode }, language }, isCard }) => (
    isCard ? null :
      <Field>
        <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
          <div className="jk-col extend">{languages[language]?.label || language}</div>
        </SubmissionInfo>
      </Field>
  ),
  sort: true,
  filter: {
    type: 'select',
    options: Object.values(languages).map(language => (
      {
        label: language.label,
        value: language.value,
      }
    )),
  },
  cardPosition: 'bottom',
  minWidth: 140,
});
