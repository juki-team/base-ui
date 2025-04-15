import React, { lazy, Suspense } from 'react';
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

const NotificationProviderImport = () => import('./Notifications/NotificationProvider');
const LazyNotificationProvider = lazy(() => NotificationProviderImport().then(module => ({ default: module.NotificationProvider })));
export const NotificationProvider = (props: NotificationProviderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationProvider {...props} />
  </Suspense>
);

const SoundProviderImport = () => import('./Notifications/SoundProvider');
const LazySoundProvider = lazy(() => SoundProviderImport().then(module => ({ default: module.SoundProvider })));
export const SoundProvider = (props: SoundProviderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySoundProvider {...props} />
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

export const preloadOrganisms = () => {
  void CheckUnsavedChangesImport();
  void CodeRunnerEditorImport();
  void DataViewerImport();
  void DateFieldImport();
  void FieldImport();
  void PagedDataViewerImport();
  void TextFieldImport();
  void TextHeadCellImport();
  void GraphvizEditorImport();
  void GraphvizViewerImport();
  void ImageUploaderModalImport();
  void UploadImageButtonImport();
  void HorizontalMenuImport();
  void VerticalMenuImport();
  void CardNotificationImport();
  void NotificationProviderImport();
  void SoundProviderImport();
  void ProblemSelectorImport();
  void ProblemVerdictTagImport();
  void UserChipImport();
  void UserNicknameLinkImport();
  void UserCodeEditorImport();
  void UsersSelectorImport();
  void MdMathEditorImport();
  void MdMathViewerImport();
};
