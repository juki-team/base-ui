import { ContentResponseType, Status, Theme, WorksheetDataResponseDTO } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { oneTab } from '../../../helpers';
import { useStableState } from '../../hooks';
import { jukiApiManager } from '../../../settings';
import { T } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { ButtonLoader, FetcherLayer, TwoContentLayout } from '../../molecules';
import { SlideDeck } from '../../molecules/SlideDeck/SlideDeck';
import { PresentationToolButtons } from '../presentation-buttons/PresentationToolButtons';
import { WorksheetAsSlides } from './WorksheetAsSlides';
import { WorksheetEditor as WorksheetEditorCmp } from './WorksheetEditor';
import { WorksheetViewer as WorksheetViewerCmp } from './WorksheetViewer';

const meta: Meta<typeof WorksheetViewerCmp> = {
  component: WorksheetViewerCmp,
};

export default meta;

type Story = StoryObj<typeof WorksheetViewerCmp>;

export const WorksheetViewer: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        // url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
        url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-g4Y' } }).url}
      >
        {({ data }) => (
          <TwoContentLayout
            tabs={oneTab(
              <WorksheetViewerCmp
                {...args}
                worksheet={data.content}
                // readOnly={false}
                // readOnly={!!user?.nickname}
              />,
            )}
            // tabButtons={buttons}
            // breadcrumbs={breadcrumbs}
          >
            TITLE
            <PresentationToolButtons />
            {/*<div className="jk-row right tx-s fw-lr">*/}
            {/*  <DateLiteral date={new Date(noteSheet.updatedAt)} show="year-month-day-hours-minutes" />*/}
            {/*</div>*/}
          </TwoContentLayout>
        )}
      </FetcherLayer>
    </MockupJukiProvider>
  ),
};

export const WorksheetResultViewer: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
      >
        {({ data }) => (
          <TwoContentLayout
            tabs={oneTab(
              <WorksheetViewerCmp
                {...args}
                worksheet={data.content}
                resultsUserKey="Fakeuser1234|juki-app"
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
  ),
};

// interface UpsertWorksheetUIDTO extends Omit<UpsertWorksheetDTO, 'members'> {
//   members: EntityMembersResponseDTO,
//   owner: UserCompanyBasicInfoResponseDTO,
// }

// const toUpsertWorksheetDTO = (entity: UpsertWorksheetUIDTO): UpsertWorksheetDTO => ({
//   members: toEntityMembersDTO(entity.members),
//   folderId: entity.folderId,
//   name: entity.name,
//   description: entity.description,
//   content: entity.content,
//   quiz: {
//     enable: false,
//     automaticFeedback: false,
//   },
//   slides: {
//     enable: false,
//     titleBackgroundImage: '',
//     backgroundImage: '',
//     fontSize: 0,
//     theme: Theme.LIGHT,
//     colorTextHighlight: '',
//     aspectRatio: AspectRatio.RATIO_4_3,
//   },
// });

const Cmp = ({ content: initialContent }: { content: WorksheetDataResponseDTO, mutate: any }) => {
  const [ content, setContent ] = useStableState(initialContent);
  return (
    <>
      <WorksheetEditorCmp
        worksheet={content}
        setContent={(content) => setContent(prevState => ({ ...prevState, content }))}
        // readOnly={false}
        // readOnly={!!user?.nickname}
      />
      <ButtonLoader
        onClick={async (setLoader) => {
          setLoader(Status.LOADING);
          // const {
          //   url,
          //   ...options
          // } = jukiApiManager.API_V1.worksheet.update({
          //   params: { key: initialContent.key },
          //   body: toUpsertWorksheetDTO({ ...initialContent }),
          // });
          // const request = cleanRequest(await authorizedRequest(url, options));
          // console.info({ request });
          setLoader(Status.NONE);
        }}
      >
        <T>save</T>
      </ButtonLoader>
    </>
  );
};

export const WorksheetEditor: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
      >
        {({ data, mutate }) => (
          <TwoContentLayout
            tabs={oneTab(<Cmp content={data.content} mutate={mutate} {...args} />)}
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
  ),
};

export const WorksheetViewerAsSlides: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <FetcherLayer<ContentResponseType<WorksheetDataResponseDTO>>
        // url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-Inj' } }).url}
        url={jukiApiManager.API_V1.worksheet.getData({ params: { key: 'w-g4Y' } }).url}
      >
        {({ data }) => (
          <TwoContentLayout
            tabs={oneTab(
              <SlideDeck
                colorTextHighlight="#A6F750"
                theme={Theme.DARK}
                aspectRatio={data.content.slides.aspectRatio}
              >
                <WorksheetAsSlides
                  {...args}
                  worksheet={data.content}
                />
              </SlideDeck>,
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
  ),
};
