import { Status } from '@juki-team/commons';
import React, { useState } from 'react';
import { useJukiUI } from '../../../hooks';
import { jukiAppRoutes } from '../../../settings';
import { ModalProps } from '../../../types';
import { ContentCopyIcon, CopyToClipboard, Modal, OpenInNewIcon, RefreshIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { SubmitView } from './SubmitView';

export interface SubmissionModalProps extends ModalProps {
  submitId: string;
}

export const SubmissionContentModal = ({ submitId, ...modalProps }: SubmissionModalProps) => {
  
  const { components: { Link } } = useJukiUI();
  const [ triggerFetch, setTriggerFetch ] = useState(0);
  
  return (
    <Modal closeIcon expand className="submission-modal" {...modalProps}>
      <section className="jk-pg-md">
        <div className="fw-bd tx-l jk-row-col left gap">
          <h3><T>submission</T></h3>
          <div className="jk-row gap">
            <Link href={jukiAppRoutes.JUDGE().submissions.view({ id: submitId })} target="_blank">
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="open submission in new tab"
                className="jk-button light only-icon small link"
              >
                <OpenInNewIcon />
              </div>
            </Link>
            <CopyToClipboard text={submitId}>
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="copy id"
                className="jk-button light only-icon small"
              >
                <ContentCopyIcon />
              </div>
            </CopyToClipboard>
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
};
