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

const LazyCheckUnsavedChanges = lazy(() => import('./CheckUnsavedChanges/CheckUnsavedChanges').then(module => ({ default: module.CheckUnsavedChanges })));
export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCheckUnsavedChanges {...props} />
  </Suspense>
);

const LazyCodeRunnerEditor = lazy(() => import('./CodeRunnerEditor/CodeRunnerEditor').then(module => ({ default: module.CodeRunnerEditor })));
export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCodeRunnerEditor {...props} />
  </Suspense>
);

const LazyDataViewer = lazy(() => import('./DataViewer/DataViewer').then(module => ({ default: module.DataViewer })));
export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyDataViewer {...props} />
  </Suspense>
);

const LazyDateField = lazy(() => import('./DataViewer/DateField').then(module => ({ default: module.DateField })));
export const DateField = (props: DateFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDateField {...props} />
  </Suspense>
);

const LazyField = lazy(() => import('./DataViewer/Field').then(module => ({ default: module.Field })));
export const Field = (props: FieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyField {...props} />
  </Suspense>
);

const LazyPagedDataViewer = lazy(() => import('./DataViewer/PagedDataViewer').then(module => ({ default: module.PagedDataViewer })));
export const PagedDataViewer = <T extends { [key: string]: any }, V = "T">(props: PagedDataViewerProps<T, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyPagedDataViewer {...props} />
  </Suspense>
);

const LazyTextField = lazy(() => import('./DataViewer/TextField').then(module => ({ default: module.TextField })));
export const TextField = (props: TextFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTextField {...props} />
  </Suspense>
);

const LazyTextHeadCell = lazy(() => import('./DataViewer/TextHeadCell').then(module => ({ default: module.TextHeadCell })));
export const TextHeadCell = (props: TextHeadCellProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTextHeadCell {...props} />
  </Suspense>
);

const LazyGraphvizEditor = lazy(() => import('./Graphviz/GraphvizEditor').then(module => ({ default: module.GraphvizEditor })));
export const GraphvizEditor = (props: GraphvizEditorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGraphvizEditor {...props} />
  </Suspense>
);

const LazyGraphvizViewer = lazy(() => import('./Graphviz/GraphvizViewer').then(module => ({ default: module.GraphvizViewer })));
export const GraphvizViewer = (props: GraphvizViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGraphvizViewer {...props} />
  </Suspense>
);

const LazyImageUploaderModal = lazy(() => import('./ImageUploader/ImageUploaderModal').then(module => ({ default: module.ImageUploaderModal })));
export const ImageUploaderModal = (props: ImageUploaderModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyImageUploaderModal {...props} />
  </Suspense>
);

const LazyUploadImageButton = lazy(() => import('./ImageUploader/UploadImageButton').then(module => ({ default: module.UploadImageButton })));
export const UploadImageButton = (props: UploadImageButtonProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUploadImageButton {...props} />
  </Suspense>
);

const LazyHorizontalMenu = lazy(() => import('./Menu/HorizontalMenu').then(module => ({ default: module.HorizontalMenu })));
export const HorizontalMenu = (props: HorizontalMenuProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHorizontalMenu {...props} />
  </Suspense>
);

const LazyVerticalMenu = lazy(() => import('./Menu/VerticalMenu').then(module => ({ default: module.VerticalMenu })));
export const VerticalMenu = (props: VerticalMenuProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalMenu {...props} />
  </Suspense>
);

const LazyCardNotification = lazy(() => import('./Notifications/CardNotification').then(module => ({ default: module.CardNotification })));
export const CardNotification = (props: CardNotificationProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCardNotification {...props} />
  </Suspense>
);

const LazyNotificationProvider = lazy(() => import('./Notifications/NotificationProvider').then(module => ({ default: module.NotificationProvider })));
export const NotificationProvider = (props: NotificationProviderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationProvider {...props} />
  </Suspense>
);

const LazySoundProvider = lazy(() => import('./Notifications/SoundProvider').then(module => ({ default: module.SoundProvider })));
export const SoundProvider = (props: SoundProviderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySoundProvider {...props} />
  </Suspense>
);

const LazyProblemSelector = lazy(() => import('./ProblemSelector/ProblemSelector').then(module => ({ default: module.ProblemSelector })));
export const ProblemSelector = (props: ProblemSelectorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemSelector {...props} />
  </Suspense>
);

const LazyProblemVerdictTag = lazy(() => import('./ProblemVerdictTag/ProblemVerdictTag').then(module => ({ default: module.ProblemVerdictTag })));
export const ProblemVerdictTag = (props: ProblemVerdictTagProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemVerdictTag {...props} />
  </Suspense>
);

const LazyUserChip = lazy(() => import('./UserChip/UserChip').then(module => ({ default: module.UserChip })));
export const UserChip = (props: UserChipProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserChip {...props} />
  </Suspense>
);

const LazyUserNicknameLink = lazy(() => import('./UserChip/UserNicknameLink').then(module => ({ default: module.UserNicknameLink })));
export const UserNicknameLink = (props: UserNicknameLinkProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserNicknameLink {...props} />
  </Suspense>
);

const LazyUserCodeEditor = lazy(() => import('./UserCodeEditor/UserCodeEditor').then(module => ({ default: module.UserCodeEditor })));
export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyUserCodeEditor {...props} />
  </Suspense>
);

const LazyUsersSelector = lazy(() => import('./UsersSelector/UsersSelector').then(module => ({ default: module.UsersSelector })));
export const UsersSelector = (props: UsersSelectorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUsersSelector {...props} />
  </Suspense>
);

const LazyMdMathEditor = lazy(() => import('./mdMath/MdMathEditor').then(module => ({ default: module.MdMathEditor })));
export const MdMathEditor = (props: MdMathEditorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMdMathEditor {...props} />
  </Suspense>
);

const LazyMdMathViewer = lazy(() => import('./mdMath/MdMathViewer').then(module => ({ default: module.MdMathViewer })));
export const MdMathViewer = (props: MdMathViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMdMathViewer {...props} />
  </Suspense>
);
