import React, { ReactNode, useState } from 'react';
import { jukiApiSocketManager } from '../../../settings';
import { Button, T } from '../../atoms';
import { Field } from '../../organisms';
import { EntityLogsModal } from '../EntityLogsModal/EntityLogsModal';
import { ProblemAdminActionsFieldProps } from './types';

export const ProblemAdminActionsField = ({ record: { key } }: ProblemAdminActionsFieldProps) => {
  
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
              url={jukiApiSocketManager.API_V1.problem.getLogs({ params: { key } }).url}
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
