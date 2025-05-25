import {
  cleanRequest,
  ContentResponseType,
  DocumentMembersResponseDTO,
  Status,
  UpsertWorksheetDTO,
  UserCompanyBasicInfoResponseDTO,
  WorksheetDataResponseDTO,
} from '@juki-team/commons';
import React from 'react';
import { authorizedRequest, oneTab } from '../../../helpers';
import { useStableState } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { T } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { ButtonLoader, FetcherLayer, TwoContentLayout } from '../../molecules';
import { WorksheetEditor as WorksheetEditorCmp } from './WorksheetEditor';
import { WorksheetViewer as WorksheetViewerCmp } from './WorksheetViewer';

export default {
  component: WorksheetViewerCmp,
};

export const WorksheetViewer = () => {
  
  return (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiSocketManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
      >
        {({ data, mutate }) => (
          <TwoContentLayout
            tabs={oneTab(
              <WorksheetViewerCmp
                worksheetKey={data.content.key}
                content={data.content.content}
                isEditor={data.content.user?.isManager}
                isSolvable={data.content.isSolvable}
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

export const WorksheetResultViewer = () => {
  
  return (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiSocketManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
      >
        {({ data, mutate }) => (
          <TwoContentLayout
            tabs={oneTab(
              <WorksheetViewerCmp
                worksheetKey={data.content.key}
                content={data.content.content}
                isEditor={data.content.user?.isManager}
                isSolvable={data.content.isSolvable}
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

interface UpsertWorksheetUIDTO extends Omit<UpsertWorksheetDTO, 'members'> {
  members: DocumentMembersResponseDTO,
  owner: UserCompanyBasicInfoResponseDTO,
}

const toUpsertWorksheetDTO = (entity: UpsertWorksheetUIDTO): UpsertWorksheetDTO => ({
  members: {
    access: entity.members.access,
    managers: Object.keys(entity.members.managers),
    spectators: Object.keys(entity.members.spectators),
  },
  folderId: entity.folderId,
  name: entity.name,
  description: entity.description,
  content: entity.content,
  isSolvable: entity.isSolvable,
});

const Cmp = ({ content: initialContent, mutate }: { content: WorksheetDataResponseDTO, mutate: any }) => {
  const [ content, setContent ] = useStableState(initialContent.content);
  return (
    <>
      <WorksheetEditorCmp
        worksheetKey={''}
        setContent={setContent}
        content={content}
        isEditor
        isSolvable
        // readOnly={false}
        // readOnly={!!user?.nickname}
      />
      <ButtonLoader
        onClick={async (setLoader) => {
          setLoader(Status.LOADING);
          const {
            url,
            ...options
          } = jukiApiSocketManager.API_V1.worksheet.update({
            params: { key: initialContent.key },
            body: toUpsertWorksheetDTO({ ...initialContent, content }),
          });
          const request = cleanRequest(await authorizedRequest(url, options));
          console.info({ request });
          setLoader(Status.NONE);
        }}
      >
        <T>save</T>
      </ButtonLoader>
    </>
  );
};

export const WorksheetEditor = () => {
  
  return (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiSocketManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
      >
        {({ data, mutate }) => (
          <TwoContentLayout
            tabs={oneTab(<Cmp content={data.content} mutate={mutate} />)}
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
