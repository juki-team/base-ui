import { type ReactNode, useState } from 'react';
import { jukiApiManager } from '../../../settings';
import { Button, T } from '../../atoms';
import { Field } from '../../organisms';
import { EntityLogsModal } from '../EntityLogsModal/EntityLogsModal';
import type { ProblemAdminActionsFieldProps } from './types';

export function ProblemAdminActionsField({ record: { key } }: ProblemAdminActionsFieldProps) {
  
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
              url={jukiApiManager.API_V2.problem.getLogs({ params: { key } }).url}
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
}
