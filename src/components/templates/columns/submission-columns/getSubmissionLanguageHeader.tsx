import { type Judge, type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionLanguageField } from '../../submission/SubmissionLanguageField';

export type LanguagesByJudge = {
  [key: string]: { key: string | Judge, name: string, languages: { [key: string]: { label: string, value: string } } },
};

export function getSubmissionLanguageHeader(languagesByJudge: LanguagesByJudge): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'language',
    index: 'languages',
    Field: (props) => (
      <SubmissionLanguageField {...props} languagesByJudge={languagesByJudge} />
    ),
    sort: true,
    filter: {
      type: 'select',
      options: Object.values(languagesByJudge).map(({ name, languages }) => (
        Object.values(languages).map(({ label, value }) => ({
          label: Object.keys(languagesByJudge).length === 1
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
  };
}
