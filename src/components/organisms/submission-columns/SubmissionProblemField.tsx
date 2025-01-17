import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ContestTab } from '../../../types';
import { OpenInNewIcon } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionProblemField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = (props) => {
  
  const {
    record: {
      problem: { key: problemKey, name: problemName },
      company: { key: companyKey },
      contest,
    },
    isCard,
  } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = getJudgeOrigin(companyKey);
  
  return (
    <TextField
      text={contest ? (
        <Link
          href={jukiAppRoutes.JUDGE(origin).contests.view({
            key: contest.key,
            tab: ContestTab.PROBLEM,
            subTab: contest.problemIndex,
          })}
          target={origin ? '_blank' : undefined}
          className="link"
        >
          <div className="jk-col">
            {contest.name}
            <div className="jk-row">
              ({contest.problemIndex || '-'})&nbsp;{problemName}
              {!!origin && <OpenInNewIcon size="small" />}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={jukiAppRoutes.JUDGE(origin).problems.view({ key: problemKey })}
          target={origin ? '_blank' : undefined}
          className="link"
        >
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{problemName}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
        </Link>
      )}
      label="problem"
    />
  );
};

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  onlyProblem?: boolean,
}

export const getSubmissionProblemHeader = (props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'problem',
  index: 'problemKeys',
  Field: SubmissionProblemField,
  sort: true,
  filter: props?.header?.filter,
  cardPosition: 'top',
  minWidth: 280,
});
