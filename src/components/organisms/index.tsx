import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../SuspenseWithTracking';
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
import { GraphvizViewerProps } from './Graphviz/types';
import { ImageUploaderModalProps } from './ImageUploader/types';
import { UploadImageButtonProps } from './ImageUploader/types';
import { HorizontalMenuProps } from './Menu/types';
import { VerticalMenuProps } from './Menu/types';
import { CardNotificationProps } from './Notifications/types';
import { NotificationProviderProps } from './Notifications/types';
import { SoundProviderProps } from './Notifications/types';
import { ProblemSelectorProps } from './ProblemSelector/types';
import { ProblemVerdictTagProps } from './ProblemVerdictTag/types';
import { UserChipProps } from './UserChip/types';
import { UserNicknameLinkProps } from './UserChip/types';
import { UserCodeEditorProps } from './UserCodeEditor/types';
import { UsersSelectorProps } from './UsersSelector/types';
import { MdMathEditorProps } from './mdMath/types';
import { MdMathViewerProps } from './mdMath/types';

const CheckUnsavedChangesImport = () => import('./CheckUnsavedChanges/CheckUnsavedChanges');
const LazyCheckUnsavedChanges = lazy(() => CheckUnsavedChangesImport().then(module => ({ default: module.CheckUnsavedChanges })));
export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CheckUnsavedChanges">
    {/*@ts-ignore*/}
    <LazyCheckUnsavedChanges {...props} />
  </SuspenseWithTracking>
);

const CodeRunnerEditorImport = () => import('./CodeRunnerEditor/CodeRunnerEditor');
const LazyCodeRunnerEditor = lazy(() => CodeRunnerEditorImport().then(module => ({ default: module.CodeRunnerEditor })));
export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CodeRunnerEditor">
    {/*@ts-ignore*/}
    <LazyCodeRunnerEditor {...props} />
  </SuspenseWithTracking>
);

const DataViewerImport = () => import('./DataViewer/DataViewer');
const LazyDataViewer = lazy(() => DataViewerImport().then(module => ({ default: module.DataViewer })));
export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DataViewer">
    {/*@ts-ignore*/}
    <LazyDataViewer {...props} />
  </SuspenseWithTracking>
);

const DateFieldImport = () => import('./DataViewer/DateField');
const LazyDateField = lazy(() => DateFieldImport().then(module => ({ default: module.DateField })));
export const DateField = (props: DateFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DateField">
    <LazyDateField {...props} />
  </SuspenseWithTracking>
);

const FieldImport = () => import('./DataViewer/Field');
const LazyField = lazy(() => FieldImport().then(module => ({ default: module.Field })));
export const Field = (props: FieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Field">
    <LazyField {...props} />
  </SuspenseWithTracking>
);

const PagedDataViewerImport = () => import('./DataViewer/PagedDataViewer');
const LazyPagedDataViewer = lazy(() => PagedDataViewerImport().then(module => ({ default: module.PagedDataViewer })));
export const PagedDataViewer = <T extends { [key: string]: any }, V = "T">(props: PagedDataViewerProps<T, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PagedDataViewer">
    {/*@ts-ignore*/}
    <LazyPagedDataViewer {...props} />
  </SuspenseWithTracking>
);

const TextFieldImport = () => import('./DataViewer/TextField');
const LazyTextField = lazy(() => TextFieldImport().then(module => ({ default: module.TextField })));
export const TextField = (props: TextFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TextField">
    <LazyTextField {...props} />
  </SuspenseWithTracking>
);

const TextHeadCellImport = () => import('./DataViewer/TextHeadCell');
const LazyTextHeadCell = lazy(() => TextHeadCellImport().then(module => ({ default: module.TextHeadCell })));
export const TextHeadCell = (props: TextHeadCellProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TextHeadCell">
    <LazyTextHeadCell {...props} />
  </SuspenseWithTracking>
);

const GraphvizEditorImport = () => import('./Graphviz/GraphvizEditor');
const LazyGraphvizEditor = lazy(() => GraphvizEditorImport().then(module => ({ default: module.GraphvizEditor })));
export const GraphvizEditor = (props: GraphvizEditorProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GraphvizEditor">
    <LazyGraphvizEditor {...props} />
  </SuspenseWithTracking>
);

const GraphvizViewerImport = () => import('./Graphviz/GraphvizViewer');
const LazyGraphvizViewer = lazy(() => GraphvizViewerImport().then(module => ({ default: module.GraphvizViewer })));
export const GraphvizViewer = (props: GraphvizViewerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GraphvizViewer">
    <LazyGraphvizViewer {...props} />
  </SuspenseWithTracking>
);

const ImageUploaderModalImport = () => import('./ImageUploader/ImageUploaderModal');
const LazyImageUploaderModal = lazy(() => ImageUploaderModalImport().then(module => ({ default: module.ImageUploaderModal })));
export const ImageUploaderModal = (props: ImageUploaderModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ImageUploaderModal">
    <LazyImageUploaderModal {...props} />
  </SuspenseWithTracking>
);

const UploadImageButtonImport = () => import('./ImageUploader/UploadImageButton');
const LazyUploadImageButton = lazy(() => UploadImageButtonImport().then(module => ({ default: module.UploadImageButton })));
export const UploadImageButton = (props: UploadImageButtonProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UploadImageButton">
    <LazyUploadImageButton {...props} />
  </SuspenseWithTracking>
);

const HorizontalMenuImport = () => import('./Menu/HorizontalMenu');
const LazyHorizontalMenu = lazy(() => HorizontalMenuImport().then(module => ({ default: module.HorizontalMenu })));
export const HorizontalMenu = (props: HorizontalMenuProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HorizontalMenu">
    <LazyHorizontalMenu {...props} />
  </SuspenseWithTracking>
);

const VerticalMenuImport = () => import('./Menu/VerticalMenu');
const LazyVerticalMenu = lazy(() => VerticalMenuImport().then(module => ({ default: module.VerticalMenu })));
export const VerticalMenu = (props: VerticalMenuProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VerticalMenu">
    <LazyVerticalMenu {...props} />
  </SuspenseWithTracking>
);

const CardNotificationImport = () => import('./Notifications/CardNotification');
const LazyCardNotification = lazy(() => CardNotificationImport().then(module => ({ default: module.CardNotification })));
export const CardNotification = (props: CardNotificationProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CardNotification">
    <LazyCardNotification {...props} />
  </SuspenseWithTracking>
);

const NotificationProviderImport = () => import('./Notifications/NotificationProvider');
const LazyNotificationProvider = lazy(() => NotificationProviderImport().then(module => ({ default: module.NotificationProvider })));
export const NotificationProvider = (props: NotificationProviderProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NotificationProvider">
    <LazyNotificationProvider {...props} />
  </SuspenseWithTracking>
);

const SoundProviderImport = () => import('./Notifications/SoundProvider');
const LazySoundProvider = lazy(() => SoundProviderImport().then(module => ({ default: module.SoundProvider })));
export const SoundProvider = (props: SoundProviderProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SoundProvider">
    <LazySoundProvider {...props} />
  </SuspenseWithTracking>
);

const ProblemSelectorImport = () => import('./ProblemSelector/ProblemSelector');
const LazyProblemSelector = lazy(() => ProblemSelectorImport().then(module => ({ default: module.ProblemSelector })));
export const ProblemSelector = (props: ProblemSelectorProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ProblemSelector">
    <LazyProblemSelector {...props} />
  </SuspenseWithTracking>
);

const ProblemVerdictTagImport = () => import('./ProblemVerdictTag/ProblemVerdictTag');
const LazyProblemVerdictTag = lazy(() => ProblemVerdictTagImport().then(module => ({ default: module.ProblemVerdictTag })));
export const ProblemVerdictTag = (props: ProblemVerdictTagProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ProblemVerdictTag">
    <LazyProblemVerdictTag {...props} />
  </SuspenseWithTracking>
);

const UserChipImport = () => import('./UserChip/UserChip');
const LazyUserChip = lazy(() => UserChipImport().then(module => ({ default: module.UserChip })));
export const UserChip = (props: UserChipProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UserChip">
    <LazyUserChip {...props} />
  </SuspenseWithTracking>
);

const UserNicknameLinkImport = () => import('./UserChip/UserNicknameLink');
const LazyUserNicknameLink = lazy(() => UserNicknameLinkImport().then(module => ({ default: module.UserNicknameLink })));
export const UserNicknameLink = (props: UserNicknameLinkProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UserNicknameLink">
    <LazyUserNicknameLink {...props} />
  </SuspenseWithTracking>
);

const UserCodeEditorImport = () => import('./UserCodeEditor/UserCodeEditor');
const LazyUserCodeEditor = lazy(() => UserCodeEditorImport().then(module => ({ default: module.UserCodeEditor })));
export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UserCodeEditor">
    {/*@ts-ignore*/}
    <LazyUserCodeEditor {...props} />
  </SuspenseWithTracking>
);

const UsersSelectorImport = () => import('./UsersSelector/UsersSelector');
const LazyUsersSelector = lazy(() => UsersSelectorImport().then(module => ({ default: module.UsersSelector })));
export const UsersSelector = (props: UsersSelectorProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UsersSelector">
    <LazyUsersSelector {...props} />
  </SuspenseWithTracking>
);

const MdMathEditorImport = () => import('./mdMath/MdMathEditor');
const LazyMdMathEditor = lazy(() => MdMathEditorImport().then(module => ({ default: module.MdMathEditor })));
export const MdMathEditor = (props: MdMathEditorProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MdMathEditor">
    <LazyMdMathEditor {...props} />
  </SuspenseWithTracking>
);

const MdMathViewerImport = () => import('./mdMath/MdMathViewer');
const LazyMdMathViewer = lazy(() => MdMathViewerImport().then(module => ({ default: module.MdMathViewer })));
export const MdMathViewer = (props: MdMathViewerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MdMathViewer">
    <LazyMdMathViewer {...props} />
  </SuspenseWithTracking>
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
  await GraphvizViewerImport();
  await ImageUploaderModalImport();
  await UploadImageButtonImport();
  await HorizontalMenuImport();
  await VerticalMenuImport();
  await CardNotificationImport();
  await NotificationProviderImport();
  await SoundProviderImport();
  await ProblemSelectorImport();
  await ProblemVerdictTagImport();
  await UserChipImport();
  await UserNicknameLinkImport();
  await UserCodeEditorImport();
  await UsersSelectorImport();
  await MdMathEditorImport();
  await MdMathViewerImport();
};
