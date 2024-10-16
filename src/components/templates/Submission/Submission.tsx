import { Status } from '@juki-team/commons';
import React, { useState } from 'react';
import { jukiSettings } from '../../../config';
import { useJukiRouter, useJukiUI } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { ContentCopyIcon, CopyToClipboard, Modal, OpenInNewIcon, RefreshIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { SubmitView } from './SubmitView';

export interface SubmissionModalProps {
  submitId: string;
}

export const SubmissionModal = ({ submitId }: SubmissionModalProps) => {
  
  const { components: { Link } } = useJukiUI();
  const { deleteSearchParams } = useJukiRouter();
  const [ triggerFetch, setTriggerFetch ] = useState(0);
  
  const handleClose = () => deleteSearchParams({ name: QueryParamKey.SUBMISSION });
  
  return (
    <Modal isOpen={true} onClose={handleClose} closeIcon closeWhenClickOutside>
      <section className="jk-pg-md">
        <div className="fw-bd tx-l jk-row-col left gap">
          <h3><T>submission</T></h3>
          <div className="jk-row gap">
            <Link href={jukiSettings.ROUTES.submissions().view({ id: submitId })} target="_blank">
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
