import { type ReactNode, useState } from 'react';
import { jukiApiManager } from '../../../settings';
import { Button, T } from '../../atoms';
import { EntityLogsModal } from '../EntityLogsModal/EntityLogsModal';
import type { ProblemAdminActionsFieldProps } from './types';

export function ProblemAdminActionsField({ record: { key } }: ProblemAdminActionsFieldProps) {
  const [modal, setModal] = useState<ReactNode>(null);

  return (
    <div className="jk-table-field jk-row">
      {modal}
      <Button
        type="secondary"
        size="tiny"
        onClick={() => {
          setModal(
            <EntityLogsModal
              url={jukiApiManager.apiV2.problem.getLogs({ params: { key } }).url}
              isOpen
              onClose={() => setModal(null)}
            />,
          );
        }}
      >
        <T>view logs</T>
      </Button>
    </div>
  );
}
