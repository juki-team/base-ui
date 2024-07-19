import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { useJukiUI } from '../../../hooks';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const SubmissionProblemField: DataViewerHeadersType<SubmissionSummaryListResponseDTO>['Field']
  = ({ record: { problem: { key: problemKey, name: problemName } }, isCard }) => {
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <TextField
      text={
        <Link
          href={jukiSettings.ROUTES.problems().view({ key: problemKey })}
          // target={props?.blankTarget ? '_blank' : ''}
        >
          <div className="jk-row link">
            {/*{problemKey}*/}
            {problemName}
            {/*{!!props?.blankTarget && <OpenInNewIcon size="small" />}*/}
          </div>
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
