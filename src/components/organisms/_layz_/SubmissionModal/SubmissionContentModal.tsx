import { Status } from '@juki-team/commons';
import { useEffect, useState } from 'react';
import { jukiAppRoutes } from '../../../../settings';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { CopyToClipboard, Modal, T } from '../../../atoms';
import type { ModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader } from '../../../molecules';
import { OpenInNewIcon, RefreshIcon } from '../../../server';
import { SubmitView } from '../SubmitView';

export interface SubmissionModalProps extends ModalProps {
  submitId: string;
}

export function SubmissionContentModal({ submitId, ...modalProps }: SubmissionModalProps) {
  
  const { Link } = useUIStore(store => store.components);
  const [ triggerFetch, setTriggerFetch ] = useState(0);
  
  useEffect(() => {
    setTriggerFetch(Date.now());
  }, [ modalProps.isOpen ]);
  
  return (
    <Modal closeIcon expand className="submission-modal" {...modalProps}>
      <section className="jk-pg-md jk-col gap stretch wh-100">
        <div className="fw-bd tx-l jk-row-col left gap wh-100">
          <h3><T className="tt-se">submission</T></h3>
          <div className="jk-row gap">
            <Link href={jukiAppRoutes.JUDGE().submissions.view({ id: submitId })} target="_blank" className="jk-row">
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="open submission in new tab"
                className="jk-button light only-icon small jk-br-ie"
              >
                <OpenInNewIcon />
              </div>
            </Link>
            <CopyToClipboard text={submitId} size="small" tooltip="copy id" />
            <ButtonLoader
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="reload"
              size="small"
              icon={<RefreshIcon />}
              onClick={async (setLoaderStatus) => {
                setLoaderStatus(Status.LOADING);
                setTriggerFetch(Date.now());
                setLoaderStatus(Status.SUCCESS);
              }}
            />
          </div>
        </div>
        <SubmitView submitId={submitId} triggerFetch={triggerFetch} />
      </section>
    </Modal>
  );
}
