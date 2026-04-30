import { Status } from '@juki-team/commons/enums';
import { useEffect, useState } from 'react';
import { jukiAppRoutes } from '../../../../settings';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { Button, CopyToClipboard, Modal, T } from '../../../atoms';
import type { ModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader } from '../../../molecules';
import { OpenInNewIcon, RefreshIcon } from '../../../server';
import { SubmitView } from '../../SubmitView/SubmitView';

export interface SubmissionModalProps extends ModalProps {
  submitId: string;
}

export function SubmissionContentModal({ submitId, ...modalProps }: SubmissionModalProps) {
  const { Link } = useUIStore((store) => store.components);
  const [triggerFetch, setTriggerFetch] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: modalProps.isOpen is the trigger to refresh on each open
  useEffect(() => {
    setTriggerFetch(Date.now());
  }, [modalProps.isOpen]);

  return (
    <Modal closeIcon expand {...modalProps}>
      <SubmitView
        className="jk-pg"
        submitId={submitId}
        triggerFetch={triggerFetch}
        header={
          <div className="fw-bd tx-l jk-row-col left gap wh-100">
            <h3>
              <T className="tt-se">submission</T>
            </h3>
            <div className="jk-row gap">
              <Link href={jukiAppRoutes.JUDGE().submissions.view({ id: submitId })} target="_blank" className="jk-row">
                <Button
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content="open submission in new tab"
                  size="small"
                  type="secondary"
                  icon={<OpenInNewIcon size="tiny" />}
                />
              </Link>
              <CopyToClipboard text={submitId} iconSize="tiny" tooltipContent="copy id" className="small" />
              <ButtonLoader
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="reload"
                size="small"
                icon={<RefreshIcon size="tiny" />}
                onClick={(setLoaderStatus) => {
                  setLoaderStatus(Status.LOADING);
                  setTriggerFetch(Date.now());
                  setLoaderStatus(Status.SUCCESS);
                }}
              />
            </div>
          </div>
        }
      />
    </Modal>
  );
}
