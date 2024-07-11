import React, { ReactNode, useState } from 'react';
import { Button, T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemLogsModal } from './ProblemLogsModal';
import { ProblemDataViewerType } from './types';

export const ProblemAdminActionsField: DataViewerHeadersType<ProblemDataViewerType>['Field'] = (props) => {
  
  const { record: { key, isManager, companyKey } } = props;
  
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  return (
    <Field className="jk-row">
      {modal}
      {isManager && (
        <Button
          type="light"
          size="tiny"
          onClick={() => {
            setModal(
              <ProblemLogsModal
                problemKey={key}
                companyKey={companyKey}
                isOpen
                onClose={() => setModal(null)}
              />,
            );
          }}
        >
          <T>view logs</T>
        </Button>
      )}
    </Field>
  );
};

export const getProblemAdminActionsHeader = (): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'actions',
  index: 'actions',
  Field: ProblemAdminActionsField,
  cardPosition: 'bottom',
  minWidth: 100,
});
