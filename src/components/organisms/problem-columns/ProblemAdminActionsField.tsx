import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { jukiSettings } from '../../../config';
import { Button, T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { EntityLogsModal } from './EntityLogsModal';

export const ProblemAdminActionsField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = (props) => {
  
  const { record: { key } } = props;
  
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  return (
    <Field className="jk-row">
      {modal}
      <Button
        type="light"
        size="tiny"
        onClick={() => {
          setModal(
            <EntityLogsModal
              url={jukiSettings.API.problem.getLogs({ params: { key } }).url}
              isOpen
              onClose={() => setModal(null)}
            />,
          );
        }}
      >
        <T>view logs</T>
      </Button>
    </Field>
  );
};

export const getProblemAdminActionsHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'actions',
  index: 'actions',
  Field: ProblemAdminActionsField,
  cardPosition: 'bottom',
  minWidth: 100,
});
