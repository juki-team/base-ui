import React, { ReactNode, useState } from 'react';
import { Button, T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemLogsModal } from './ProblemLogsModal';
import { ProblemDataViewer } from './types';

export const ProblemAdminActionsField: DataViewerHeadersType<ProblemDataViewer>['Field'] = (props) => {
  
  const { record: { key, judge, isManager, companyKey } } = props;
  
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
                judge={judge}
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
