import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../SuspenseWithTracking';
import { SpinIcon } from '../atoms/server/icons/SpinIcon';
import { CheckUnsavedChangesProps } from './CheckUnsavedChanges/types';
import { CodeRunnerEditorProps } from './CodeRunnerEditor/types';
import { DataViewerProps } from './DataViewer/types';
import { DateFieldProps } from './DataViewer/types';
import { FieldProps } from './DataViewer/types';
import { PagedDataViewerProps } from './DataViewer/types';
import { TextFieldProps } from './DataViewer/types';
import { TextHeadCellProps } from './DataViewer/types';
import { GraphvizEditorProps } from './Graphviz/types';
import { GraphvizEditorModalProps } from './Graphviz/types';
import { GraphvizViewerProps } from './Graphviz/types';
import { ImageUploaderModalProps } from './ImageUploader/types';
import { UploadImageButtonProps } from './ImageUploader/types';
import { HorizontalMenuProps } from './Menu/types';
import { VerticalMenuProps } from './Menu/types';
import { CardNotificationProps } from './Notifications/types';
import { ProblemSelectorProps } from './ProblemSelector/types';
import { ProblemVerdictTagProps } from './ProblemVerdictTag/types';
import { UserChipProps } from './UserChip/types';
import { UserNicknameLinkProps } from './UserChip/types';
import { UserCodeEditorProps } from './UserCodeEditor/types';
import { UsersSelectorProps } from './UsersSelector/types';
import { MdMathEditorProps } from './mdMath/types';
import { MdMathViewerProps } from './mdMath/types';
import { PresentationToolButtonsProps } from './presentation-buttons/types';
import { ContentsSectionHeaderProps } from './worksheet/types';
import { WorksheetAsSlidesProps } from './worksheet/types';
import { WorksheetEditorProps } from './worksheet/types';
import { WorksheetViewerProps } from './worksheet/types';

const CheckUnsavedChangesImport = () => import('./CheckUnsavedChanges/CheckUnsavedChanges');
const LazyCheckUnsavedChanges = lazy(() => CheckUnsavedChangesImport().then(module => ({ default: module.CheckUnsavedChanges })));
export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCheckUnsavedChanges {...props} />
  </Suspense>
);

const CodeRunnerEditorImport = () => import('./CodeRunnerEditor/CodeRunnerEditor');
const LazyCodeRunnerEditor = lazy(() => CodeRunnerEditorImport().then(module => ({ default: module.CodeRunnerEditor })));
export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCodeRunnerEditor {...props} />
  </Suspense>
);

const DataViewerImport = () => import('./DataViewer/DataViewer');
const LazyDataViewer = lazy(() => DataViewerImport().then(module => ({ default: module.DataViewer })));
export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyDataViewer {...props} />
  </Suspense>
);

const DateFieldImport = () => import('./DataViewer/DateField');
const LazyDateField = lazy(() => DateFieldImport().then(module => ({ default: module.DateField })));
export const DateField = (props: DateFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDateField {...props} />
  </Suspense>
);

const FieldImport = () => import('./DataViewer/Field');
const LazyField = lazy(() => FieldImport().then(module => ({ default: module.Field })));
export const Field = (props: FieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyField {...props} />
  </Suspense>
);

const PagedDataViewerImport = () => import('./DataViewer/PagedDataViewer');
const LazyPagedDataViewer = lazy(() => PagedDataViewerImport().then(module => ({ default: module.PagedDataViewer })));
export const PagedDataViewer = <T extends { [key: string]: any }, V = "T">(props: PagedDataViewerProps<T, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyPagedDataViewer {...props} />
  </Suspense>
);

const TextFieldImport = () => import('./DataViewer/TextField');
const LazyTextField = lazy(() => TextFieldImport().then(module => ({ default: module.TextField })));
export const TextField = (props: TextFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTextField {...props} />
  </Suspense>
);

const TextHeadCellImport = () => import('./DataViewer/TextHeadCell');
const LazyTextHeadCell = lazy(() => TextHeadCellImport().then(module => ({ default: module.TextHeadCell })));
export const TextHeadCell = (props: TextHeadCellProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTextHeadCell {...props} />
  </Suspense>
);

const GraphvizEditorImport = () => import('./Graphviz/GraphvizEditor');
const LazyGraphvizEditor = lazy(() => GraphvizEditorImport().then(module => ({ default: module.GraphvizEditor })));
export const GraphvizEditor = (props: GraphvizEditorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGraphvizEditor {...props} />
  </Suspense>
);

const GraphvizEditorModalImport = () => import('./Graphviz/GraphvizEditorModal');
const LazyGraphvizEditorModal = lazy(() => GraphvizEditorModalImport().then(module => ({ default: module.GraphvizEditorModal })));
export const GraphvizEditorModal = (props: GraphvizEditorModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGraphvizEditorModal {...props} />
  </Suspense>
);

const GraphvizViewerImport = () => import('./Graphviz/GraphvizViewer');
const LazyGraphvizViewer = lazy(() => GraphvizViewerImport().then(module => ({ default: module.GraphvizViewer })));
export const GraphvizViewer = (props: GraphvizViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGraphvizViewer {...props} />
  </Suspense>
);

const ImageUploaderModalImport = () => import('./ImageUploader/ImageUploaderModal');
const LazyImageUploaderModal = lazy(() => ImageUploaderModalImport().then(module => ({ default: module.ImageUploaderModal })));
export const ImageUploaderModal = (props: ImageUploaderModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyImageUploaderModal {...props} />
  </Suspense>
);

const UploadImageButtonImport = () => import('./ImageUploader/UploadImageButton');
const LazyUploadImageButton = lazy(() => UploadImageButtonImport().then(module => ({ default: module.UploadImageButton })));
export const UploadImageButton = (props: UploadImageButtonProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUploadImageButton {...props} />
  </Suspense>
);

const HorizontalMenuImport = () => import('./Menu/HorizontalMenu');
const LazyHorizontalMenu = lazy(() => HorizontalMenuImport().then(module => ({ default: module.HorizontalMenu })));
export const HorizontalMenu = (props: HorizontalMenuProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHorizontalMenu {...props} />
  </Suspense>
);

const VerticalMenuImport = () => import('./Menu/VerticalMenu');
const LazyVerticalMenu = lazy(() => VerticalMenuImport().then(module => ({ default: module.VerticalMenu })));
export const VerticalMenu = (props: VerticalMenuProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalMenu {...props} />
  </Suspense>
);

const CardNotificationImport = () => import('./Notifications/CardNotification');
const LazyCardNotification = lazy(() => CardNotificationImport().then(module => ({ default: module.CardNotification })));
export const CardNotification = (props: CardNotificationProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCardNotification {...props} />
  </Suspense>
);

const ProblemSelectorImport = () => import('./ProblemSelector/ProblemSelector');
const LazyProblemSelector = lazy(() => ProblemSelectorImport().then(module => ({ default: module.ProblemSelector })));
export const ProblemSelector = (props: ProblemSelectorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemSelector {...props} />
  </Suspense>
);

const ProblemVerdictTagImport = () => import('./ProblemVerdictTag/ProblemVerdictTag');
const LazyProblemVerdictTag = lazy(() => ProblemVerdictTagImport().then(module => ({ default: module.ProblemVerdictTag })));
export const ProblemVerdictTag = (props: ProblemVerdictTagProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemVerdictTag {...props} />
  </Suspense>
);

const UserChipImport = () => import('./UserChip/UserChip');
const LazyUserChip = lazy(() => UserChipImport().then(module => ({ default: module.UserChip })));
export const UserChip = (props: UserChipProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserChip {...props} />
  </Suspense>
);

const UserNicknameLinkImport = () => import('./UserChip/UserNicknameLink');
const LazyUserNicknameLink = lazy(() => UserNicknameLinkImport().then(module => ({ default: module.UserNicknameLink })));
export const UserNicknameLink = (props: UserNicknameLinkProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserNicknameLink {...props} />
  </Suspense>
);

const UserCodeEditorImport = () => import('./UserCodeEditor/UserCodeEditor');
const LazyUserCodeEditor = lazy(() => UserCodeEditorImport().then(module => ({ default: module.UserCodeEditor })));
export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyUserCodeEditor {...props} />
  </Suspense>
);

const UsersSelectorImport = () => import('./UsersSelector/UsersSelector');
const LazyUsersSelector = lazy(() => UsersSelectorImport().then(module => ({ default: module.UsersSelector })));
export const UsersSelector = (props: UsersSelectorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUsersSelector {...props} />
  </Suspense>
);

const MdMathEditorImport = () => import('./mdMath/MdMathEditor');
const LazyMdMathEditor = lazy(() => MdMathEditorImport().then(module => ({ default: module.MdMathEditor })));
export const MdMathEditor = (props: MdMathEditorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMdMathEditor {...props} />
  </Suspense>
);

const MdMathViewerImport = () => import('./mdMath/MdMathViewer');
const LazyMdMathViewer = lazy(() => MdMathViewerImport().then(module => ({ default: module.MdMathViewer })));
export const MdMathViewer = (props: MdMathViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMdMathViewer {...props} />
  </Suspense>
);

const PresentationToolButtonsImport = () => import('./presentation-buttons/PresentationToolButtons');
const LazyPresentationToolButtons = lazy(() => PresentationToolButtonsImport().then(module => ({ default: module.PresentationToolButtons })));
export const PresentationToolButtons = (props: PresentationToolButtonsProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPresentationToolButtons {...props} />
  </Suspense>
);

const ContentsSectionHeaderImport = () => import('./worksheet/ContentsSectionHeader');
const LazyContentsSectionHeader = lazy(() => ContentsSectionHeaderImport().then(module => ({ default: module.ContentsSectionHeader })));
export const ContentsSectionHeader = (props: ContentsSectionHeaderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContentsSectionHeader {...props} />
  </Suspense>
);

const WorksheetAsSlidesImport = () => import('./worksheet/WorksheetAsSlides');
const LazyWorksheetAsSlides = lazy(() => WorksheetAsSlidesImport().then(module => ({ default: module.WorksheetAsSlides })));
export const WorksheetAsSlides = (props: WorksheetAsSlidesProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWorksheetAsSlides {...props} />
  </Suspense>
);

const WorksheetEditorImport = () => import('./worksheet/WorksheetEditor');
const LazyWorksheetEditor = lazy(() => WorksheetEditorImport().then(module => ({ default: module.WorksheetEditor })));
export const WorksheetEditor = (props: WorksheetEditorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWorksheetEditor {...props} />
  </Suspense>
);

const WorksheetViewerImport = () => import('./worksheet/WorksheetViewer');
const LazyWorksheetViewer = lazy(() => WorksheetViewerImport().then(module => ({ default: module.WorksheetViewer })));
export const WorksheetViewer = (props: WorksheetViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWorksheetViewer {...props} />
  </Suspense>
);

export const preloadOrganisms = async () => {
  await CheckUnsavedChangesImport();
  await CodeRunnerEditorImport();
  await DataViewerImport();
  await DateFieldImport();
  await FieldImport();
  await PagedDataViewerImport();
  await TextFieldImport();
  await TextHeadCellImport();
  await GraphvizEditorImport();
  await GraphvizEditorModalImport();
  await GraphvizViewerImport();
  await ImageUploaderModalImport();
  await UploadImageButtonImport();
  await HorizontalMenuImport();
  await VerticalMenuImport();
  await CardNotificationImport();
  await ProblemSelectorImport();
  await ProblemVerdictTagImport();
  await UserChipImport();
  await UserNicknameLinkImport();
  await UserCodeEditorImport();
  await UsersSelectorImport();
  await MdMathEditorImport();
  await MdMathViewerImport();
  await PresentationToolButtonsImport();
  await ContentsSectionHeaderImport();
  await WorksheetAsSlidesImport();
  await WorksheetEditorImport();
  await WorksheetViewerImport();
};
