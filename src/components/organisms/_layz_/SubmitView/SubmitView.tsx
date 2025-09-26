import { type ContentResponseType, type SubmissionDataResponseDTO } from '@juki-team/commons';
import { jukiApiManager } from '../../../../settings';
import { T } from '../../../atoms';
import { FetcherLayer } from '../../../molecules';
import { PageNotFound } from '../../PageNotFound/PageNotFound';
import { SubmitViewContent } from './commons/SubmitViewContent';
import { SubmitViewProps } from './types';

export default function SubmitView({ submitId, triggerFetch }: SubmitViewProps) {
  return (
    <FetcherLayer<ContentResponseType<SubmissionDataResponseDTO>>
      url={jukiApiManager.API_V1.submission.getData({ params: { id: submitId } }).url}
      errorView={() => {
        return (
          <PageNotFound>
            <h3><T className="tt-se">submission not found</T></h3>
            <p>
              <T className="tt-se">the submission does not exist or you do not have permissions to view it</T>
            </p>
          </PageNotFound>
        );
      }}
      triggerFetch={triggerFetch}
    >
      {({ data }) => <SubmitViewContent submit={data.content} />}
    </FetcherLayer>
  );
}
