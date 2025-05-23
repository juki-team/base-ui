import { ContentResponseType, WorksheetDataResponseDTO } from '@juki-team/commons';
import React from 'react';
import { oneTab } from '../../../helpers';
import { jukiApiSocketManager } from '../../../settings';
import { MockupJukiProvider } from '../../mockup';
import { FetcherLayer, TwoContentLayout } from '../../molecules';
import { WorksheetViewer as WorksheetViewerCmp } from './WorksheetViewer';

export default {
  component: WorksheetViewerCmp,
};

export const WorksheetViewer = () => {
  
  return (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiSocketManager.API_V1.worksheet.getData({ params: { key: 'w-NZ3' } }).url}
      >
        {({ data, mutate }) => (
          <TwoContentLayout
            tabs={oneTab(
              <WorksheetViewerCmp
                worksheet={data.content}
                // results={[]}
                mutateUserResults={mutate}
                // readOnly={false}
                // readOnly={!!user?.nickname}
              />,
            )}
            // tabButtons={buttons}
            // breadcrumbs={breadcrumbs}
          >
            TITLE
            {/*<div className="jk-row right tx-s fw-lr">*/}
            {/*  <DateLiteral date={new Date(noteSheet.updatedAt)} show="year-month-day-hours-minutes" />*/}
            {/*</div>*/}
          </TwoContentLayout>
        
        )}
      </FetcherLayer>
    </MockupJukiProvider>
  );
};
