import { ContentResponseType, SubmissionDataResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiApiSocketManager } from '../../../settings';
import { JukiSurprisedImage, T } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { SubmitViewContent } from './SubmitViewContent';
import { SubmitViewProps } from './types';

export const SubmitView = ({ submitId, triggerFetch }: SubmitViewProps) => (
  <FetcherLayer<ContentResponseType<SubmissionDataResponseDTO>>
    url={jukiApiSocketManager.API_V1.submission.getData({ params: { id: submitId } }).url}
    errorView={() => {
      return (
        <div className="jk-col extend jk-pg-md">
          <div className="jk-col gap center">
            <div className="image-404"><JukiSurprisedImage /></div>
            <h3><T className="tt-ue">submission not found</T></h3>
            <p>
              <T className="tt-se">the submission does not exist or you do not have permissions to view it</T>
            </p>
          </div>
        </div>
      );
    }}
    triggerFetch={triggerFetch}
  >
    {({ data, mutate }) => <SubmitViewContent submit={data.content} />}
  </FetcherLayer>
);
