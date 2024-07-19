import {
  ACCEPTED_PROGRAMMING_LANGUAGES,
  PROGRAMMING_LANGUAGE,
  SubmissionSummaryListResponseDTO,
} from '@juki-team/commons';
import React from 'react';
import { SubmissionInfo } from '../../templates/Submission/SubmissionInfo';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const getSubmissionLanguageHeader = (): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'language',
  index: 'languages',
  Field: ({ record: { submitId, user: { canViewSourceCode }, language }, isCard }) => (
    isCard ? null :
      <Field>
        <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
          <div className="jk-col extend">{PROGRAMMING_LANGUAGE[language]?.label || language}</div>
        </SubmissionInfo>
      </Field>
  ),
  sort: true,
  filter: {
    type: 'select',
    options: ACCEPTED_PROGRAMMING_LANGUAGES.map(language => (
      {
        label: PROGRAMMING_LANGUAGE[language].label,
        value: language,
      }
    )),
  },
  cardPosition: 'bottom',
  minWidth: 140,
});
