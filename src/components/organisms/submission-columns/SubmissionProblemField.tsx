import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { getJudgeOrigin } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { OpenInNewIcon } from '../../server';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionProblemField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field'] = (props) => {
  
  const {
    record: {
      problem: { key: problemKey, name: problemName, company: { key: problemCompanyKey } },
    },
    isCard,
  } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const origin = getJudgeOrigin(problemCompanyKey);
  
  return (
    <TextField
      text={
        <Link
          href={jukiAppRoutes.JUDGE(origin).problems.view({ key: problemKey })}
          target={origin ? '_blank' : undefined}
          className="link jk-row"
        >
          <div style={{ textAlign: isCard ? undefined : 'left', display: 'inline' }}>{problemName}</div>
          &nbsp;
          {!!origin && <OpenInNewIcon size="small" />}
        </Link>
      }
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
