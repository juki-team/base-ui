import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../SuspenseWithTracking';
import { SpinIcon } from '../atoms/server/icons/SpinIcon';
import { ChangePasswordModalProps } from './ChangePasswordModal/types';
import { EditProfileModalProps } from './EditProfileModal/types';
import { ImageProfileModalProps } from './EditProfileModal/types';
import { EntityLogsModalProps } from './EntityLogsModal/types';
import { ErrorBoundaryProps } from './ErrorBoundary/types';
import { HelpSectionProps } from './HelpSection/types';
import { JukiSocketAlertProps } from './JukiSocketAlert/types';
import { MainMenuProps } from './MainMenu/types';
import { NewVersionAvailableProps } from './NewViersionAvailableModal/types';
import { PageNotFoundProps } from './PageNotFound/types';
import { ProblemInfoProps } from './ProblemView/types';
import { ProblemViewProps } from './ProblemView/types';
import { ResetPasswordModalProps } from './ResetPasswordModal/types';
import { UserPreviewModalProps } from './UserPreviewModal/types';
import { UserProfileProps } from './UserProfile/types';
import { UserProfileSettingsProps } from './UserProfileSettings/types';
import { ContestNameLinkFieldProps } from './contest/types';
import { CreateEntityLayoutProps } from './entity/types';
import { UpdateEntityLayoutProps } from './entity/types';
import { DocumentCustomMembersContentProps } from './members/types';
import { DocumentMembersButtonProps } from './members/types';
import { DocumentMembersContentProps } from './members/types';
import { ProblemAdminActionsFieldProps } from './problem/types';
import { ProblemCrawlerFieldProps } from './problem/types';
import { ProblemKeyFieldProps } from './problem/types';
import { ProblemModeFieldProps } from './problem/types';
import { ProblemNameLinkFieldProps } from './problem/types';
import { ProblemNameModalFieldProps } from './problem/types';
import { ProblemOwnerFieldProps } from './problem/types';
import { ProblemStatusProps } from './problem/types';
import { ProblemTagsFieldProps } from './problem/types';
import { ProblemTypeFieldProps } from './problem/types';
import { SubmissionContestFieldProps } from './submission/types';
import { SubmissionContestProblemFieldProps } from './submission/types';
import { SubmissionDateFieldProps } from './submission/types';
import { SubmissionLanguageFieldProps } from './submission/types';
import { SubmissionModalProps } from './submission/types';
import { SubmissionNicknameFieldProps } from './submission/types';
import { SubmissionProblemFieldProps } from './submission/types';
import { SubmissionRejudgeButtonProps } from './submission/types';
import { SubmissionTimeFieldProps } from './submission/types';
import { SubmitViewProps } from './submission/types';

const ChangePasswordModalImport = () => import('./ChangePasswordModal/ChangePasswordModal');
const LazyChangePasswordModal = lazy(() => ChangePasswordModalImport().then(module => ({ default: module.ChangePasswordModal })));
export const ChangePasswordModal = (props: ChangePasswordModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyChangePasswordModal {...props} />
  </SuspenseWithTracking>
);

const EditProfileModalImport = () => import('./EditProfileModal/EditProfileModal');
const LazyEditProfileModal = lazy(() => EditProfileModalImport().then(module => ({ default: module.EditProfileModal })));
export const EditProfileModal = (props: EditProfileModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyEditProfileModal {...props} />
  </SuspenseWithTracking>
);

const ImageProfileModalImport = () => import('./EditProfileModal/ImageProfileModal');
const LazyImageProfileModal = lazy(() => ImageProfileModalImport().then(module => ({ default: module.ImageProfileModal })));
export const ImageProfileModal = (props: ImageProfileModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyImageProfileModal {...props} />
  </SuspenseWithTracking>
);

const EntityLogsModalImport = () => import('./EntityLogsModal/EntityLogsModal');
const LazyEntityLogsModal = lazy(() => EntityLogsModalImport().then(module => ({ default: module.EntityLogsModal })));
export const EntityLogsModal = (props: EntityLogsModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyEntityLogsModal {...props} />
  </SuspenseWithTracking>
);

const ErrorBoundaryImport = () => import('./ErrorBoundary/ErrorBoundary');
const LazyErrorBoundary = lazy(() => ErrorBoundaryImport().then(module => ({ default: module.ErrorBoundary })));
export const ErrorBoundary = (props: ErrorBoundaryProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyErrorBoundary {...props} />
  </SuspenseWithTracking>
);

const HelpSectionImport = () => import('./HelpSection/HelpSection');
const LazyHelpSection = lazy(() => HelpSectionImport().then(module => ({ default: module.HelpSection })));
export const HelpSection = (props: HelpSectionProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHelpSection {...props} />
  </SuspenseWithTracking>
);

const JukiSocketAlertImport = () => import('./JukiSocketAlert/JukiSocketAlert');
const LazyJukiSocketAlert = lazy(() => JukiSocketAlertImport().then(module => ({ default: module.JukiSocketAlert })));
export const JukiSocketAlert = (props: JukiSocketAlertProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyJukiSocketAlert {...props} />
  </SuspenseWithTracking>
);

const MainMenuImport = () => import('./MainMenu/MainMenu');
const LazyMainMenu = lazy(() => MainMenuImport().then(module => ({ default: module.MainMenu })));
export const MainMenu = (props: MainMenuProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMainMenu {...props} />
  </SuspenseWithTracking>
);

const NewVersionAvailableImport = () => import('./NewViersionAvailableModal/NewVersionAvailable');
const LazyNewVersionAvailable = lazy(() => NewVersionAvailableImport().then(module => ({ default: module.NewVersionAvailable })));
export const NewVersionAvailable = (props: NewVersionAvailableProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNewVersionAvailable {...props} />
  </SuspenseWithTracking>
);

const PageNotFoundImport = () => import('./PageNotFound/PageNotFound');
const LazyPageNotFound = lazy(() => PageNotFoundImport().then(module => ({ default: module.PageNotFound })));
export const PageNotFound = (props: PageNotFoundProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPageNotFound {...props} />
  </SuspenseWithTracking>
);

const ProblemInfoImport = () => import('./ProblemView/ProblemInfo');
const LazyProblemInfo = lazy(() => ProblemInfoImport().then(module => ({ default: module.ProblemInfo })));
export const ProblemInfo = (props: ProblemInfoProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemInfo {...props} />
  </SuspenseWithTracking>
);

const ProblemViewImport = () => import('./ProblemView/ProblemView');
const LazyProblemView = lazy(() => ProblemViewImport().then(module => ({ default: module.ProblemView })));
export const ProblemView = <T, >(props: ProblemViewProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyProblemView {...props} />
  </SuspenseWithTracking>
);

const ResetPasswordModalImport = () => import('./ResetPasswordModal/ResetPasswordModal');
const LazyResetPasswordModal = lazy(() => ResetPasswordModalImport().then(module => ({ default: module.ResetPasswordModal })));
export const ResetPasswordModal = (props: ResetPasswordModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyResetPasswordModal {...props} />
  </SuspenseWithTracking>
);

const UserPreviewModalImport = () => import('./UserPreviewModal/UserPreviewModal');
const LazyUserPreviewModal = lazy(() => UserPreviewModalImport().then(module => ({ default: module.UserPreviewModal })));
export const UserPreviewModal = (props: UserPreviewModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUserPreviewModal {...props} />
  </SuspenseWithTracking>
);

const UserProfileImport = () => import('./UserProfile/UserProfile');
const LazyUserProfile = lazy(() => UserProfileImport().then(module => ({ default: module.UserProfile })));
export const UserProfile = (props: UserProfileProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUserProfile {...props} />
  </SuspenseWithTracking>
);

const UserProfileSettingsImport = () => import('./UserProfileSettings/UserProfileSettings');
const LazyUserProfileSettings = lazy(() => UserProfileSettingsImport().then(module => ({ default: module.UserProfileSettings })));
export const UserProfileSettings = (props: UserProfileSettingsProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUserProfileSettings {...props} />
  </SuspenseWithTracking>
);

const ContestNameLinkFieldImport = () => import('./contest/ContestNameLinkField');
const LazyContestNameLinkField = lazy(() => ContestNameLinkFieldImport().then(module => ({ default: module.ContestNameLinkField })));
export const ContestNameLinkField = (props: ContestNameLinkFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyContestNameLinkField {...props} />
  </SuspenseWithTracking>
);

const CreateEntityLayoutImport = () => import('./entity/CreateEntityLayout');
const LazyCreateEntityLayout = lazy(() => CreateEntityLayoutImport().then(module => ({ default: module.CreateEntityLayout })));
export const CreateEntityLayout = <T, U, V>(props: CreateEntityLayoutProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCreateEntityLayout {...props} />
  </SuspenseWithTracking>
);

const UpdateEntityLayoutImport = () => import('./entity/UpdateEntityLayout');
const LazyUpdateEntityLayout = lazy(() => UpdateEntityLayoutImport().then(module => ({ default: module.UpdateEntityLayout })));
export const UpdateEntityLayout = <T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyUpdateEntityLayout {...props} />
  </SuspenseWithTracking>
);

const DocumentCustomMembersContentImport = () => import('./members/DocumentCustomMembersContent');
const LazyDocumentCustomMembersContent = lazy(() => DocumentCustomMembersContentImport().then(module => ({ default: module.DocumentCustomMembersContent })));
export const DocumentCustomMembersContent = (props: DocumentCustomMembersContentProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentCustomMembersContent {...props} />
  </SuspenseWithTracking>
);

const DocumentMembersButtonImport = () => import('./members/DocumentMembersButton');
const LazyDocumentMembersButton = lazy(() => DocumentMembersButtonImport().then(module => ({ default: module.DocumentMembersButton })));
export const DocumentMembersButton = (props: DocumentMembersButtonProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentMembersButton {...props} />
  </SuspenseWithTracking>
);

const DocumentMembersContentImport = () => import('./members/DocumentMembersContent');
const LazyDocumentMembersContent = lazy(() => DocumentMembersContentImport().then(module => ({ default: module.DocumentMembersContent })));
export const DocumentMembersContent = (props: DocumentMembersContentProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentMembersContent {...props} />
  </SuspenseWithTracking>
);

const ProblemAdminActionsFieldImport = () => import('./problem/ProblemAdminActionsField');
const LazyProblemAdminActionsField = lazy(() => ProblemAdminActionsFieldImport().then(module => ({ default: module.ProblemAdminActionsField })));
export const ProblemAdminActionsField = (props: ProblemAdminActionsFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemAdminActionsField {...props} />
  </SuspenseWithTracking>
);

const ProblemCrawlerFieldImport = () => import('./problem/ProblemCrawlerField');
const LazyProblemCrawlerField = lazy(() => ProblemCrawlerFieldImport().then(module => ({ default: module.ProblemCrawlerField })));
export const ProblemCrawlerField = (props: ProblemCrawlerFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemCrawlerField {...props} />
  </SuspenseWithTracking>
);

const ProblemKeyFieldImport = () => import('./problem/ProblemKeyField');
const LazyProblemKeyField = lazy(() => ProblemKeyFieldImport().then(module => ({ default: module.ProblemKeyField })));
export const ProblemKeyField = (props: ProblemKeyFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemKeyField {...props} />
  </SuspenseWithTracking>
);

const ProblemModeFieldImport = () => import('./problem/ProblemModeField');
const LazyProblemModeField = lazy(() => ProblemModeFieldImport().then(module => ({ default: module.ProblemModeField })));
export const ProblemModeField = (props: ProblemModeFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemModeField {...props} />
  </SuspenseWithTracking>
);

const ProblemNameLinkFieldImport = () => import('./problem/ProblemNameLinkField');
const LazyProblemNameLinkField = lazy(() => ProblemNameLinkFieldImport().then(module => ({ default: module.ProblemNameLinkField })));
export const ProblemNameLinkField = (props: ProblemNameLinkFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemNameLinkField {...props} />
  </SuspenseWithTracking>
);

const ProblemNameModalFieldImport = () => import('./problem/ProblemNameModalField');
const LazyProblemNameModalField = lazy(() => ProblemNameModalFieldImport().then(module => ({ default: module.ProblemNameModalField })));
export const ProblemNameModalField = (props: ProblemNameModalFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemNameModalField {...props} />
  </SuspenseWithTracking>
);

const ProblemOwnerFieldImport = () => import('./problem/ProblemOwnerField');
const LazyProblemOwnerField = lazy(() => ProblemOwnerFieldImport().then(module => ({ default: module.ProblemOwnerField })));
export const ProblemOwnerField = (props: ProblemOwnerFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemOwnerField {...props} />
  </SuspenseWithTracking>
);

const ProblemStatusImport = () => import('./problem/ProblemStatus');
const LazyProblemStatus = lazy(() => ProblemStatusImport().then(module => ({ default: module.ProblemStatus })));
export const ProblemStatus = (props: ProblemStatusProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemStatus {...props} />
  </SuspenseWithTracking>
);

const ProblemTagsFieldImport = () => import('./problem/ProblemTagsField');
const LazyProblemTagsField = lazy(() => ProblemTagsFieldImport().then(module => ({ default: module.ProblemTagsField })));
export const ProblemTagsField = (props: ProblemTagsFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemTagsField {...props} />
  </SuspenseWithTracking>
);

const ProblemTypeFieldImport = () => import('./problem/ProblemTypeField');
const LazyProblemTypeField = lazy(() => ProblemTypeFieldImport().then(module => ({ default: module.ProblemTypeField })));
export const ProblemTypeField = (props: ProblemTypeFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyProblemTypeField {...props} />
  </SuspenseWithTracking>
);

const SubmissionContestFieldImport = () => import('./submission/SubmissionContestField');
const LazySubmissionContestField = lazy(() => SubmissionContestFieldImport().then(module => ({ default: module.SubmissionContestField })));
export const SubmissionContestField = (props: SubmissionContestFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionContestField {...props} />
  </SuspenseWithTracking>
);

const SubmissionContestProblemFieldImport = () => import('./submission/SubmissionContestProblemField');
const LazySubmissionContestProblemField = lazy(() => SubmissionContestProblemFieldImport().then(module => ({ default: module.SubmissionContestProblemField })));
export const SubmissionContestProblemField = (props: SubmissionContestProblemFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionContestProblemField {...props} />
  </SuspenseWithTracking>
);

const SubmissionDateFieldImport = () => import('./submission/SubmissionDateField');
const LazySubmissionDateField = lazy(() => SubmissionDateFieldImport().then(module => ({ default: module.SubmissionDateField })));
export const SubmissionDateField = (props: SubmissionDateFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionDateField {...props} />
  </SuspenseWithTracking>
);

const SubmissionLanguageFieldImport = () => import('./submission/SubmissionLanguageField');
const LazySubmissionLanguageField = lazy(() => SubmissionLanguageFieldImport().then(module => ({ default: module.SubmissionLanguageField })));
export const SubmissionLanguageField = (props: SubmissionLanguageFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionLanguageField {...props} />
  </SuspenseWithTracking>
);

const SubmissionModalImport = () => import('./submission/SubmissionModal');
const LazySubmissionModal = lazy(() => SubmissionModalImport().then(module => ({ default: module.SubmissionModal })));
export const SubmissionModal = (props: SubmissionModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionModal {...props} />
  </SuspenseWithTracking>
);

const SubmissionNicknameFieldImport = () => import('./submission/SubmissionNicknameField');
const LazySubmissionNicknameField = lazy(() => SubmissionNicknameFieldImport().then(module => ({ default: module.SubmissionNicknameField })));
export const SubmissionNicknameField = (props: SubmissionNicknameFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionNicknameField {...props} />
  </SuspenseWithTracking>
);

const SubmissionProblemFieldImport = () => import('./submission/SubmissionProblemField');
const LazySubmissionProblemField = lazy(() => SubmissionProblemFieldImport().then(module => ({ default: module.SubmissionProblemField })));
export const SubmissionProblemField = (props: SubmissionProblemFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionProblemField {...props} />
  </SuspenseWithTracking>
);

const SubmissionRejudgeButtonImport = () => import('./submission/SubmissionRejudgeButton');
const LazySubmissionRejudgeButton = lazy(() => SubmissionRejudgeButtonImport().then(module => ({ default: module.SubmissionRejudgeButton })));
export const SubmissionRejudgeButton = (props: SubmissionRejudgeButtonProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionRejudgeButton {...props} />
  </SuspenseWithTracking>
);

const SubmissionTimeFieldImport = () => import('./submission/SubmissionTimeField');
const LazySubmissionTimeField = lazy(() => SubmissionTimeFieldImport().then(module => ({ default: module.SubmissionTimeField })));
export const SubmissionTimeField = (props: SubmissionTimeFieldProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionTimeField {...props} />
  </SuspenseWithTracking>
);

const SubmitViewImport = () => import('./submission/SubmitView');
const LazySubmitView = lazy(() => SubmitViewImport().then(module => ({ default: module.SubmitView })));
export const SubmitView = (props: SubmitViewProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySubmitView {...props} />
  </SuspenseWithTracking>
);

export const preloadTemplates = async () => {
  await ChangePasswordModalImport();
  await EditProfileModalImport();
  await ImageProfileModalImport();
  await EntityLogsModalImport();
  await ErrorBoundaryImport();
  await HelpSectionImport();
  await JukiSocketAlertImport();
  await MainMenuImport();
  await NewVersionAvailableImport();
  await PageNotFoundImport();
  await ProblemInfoImport();
  await ProblemViewImport();
  await ResetPasswordModalImport();
  await UserPreviewModalImport();
  await UserProfileImport();
  await UserProfileSettingsImport();
  await ContestNameLinkFieldImport();
  await CreateEntityLayoutImport();
  await UpdateEntityLayoutImport();
  await DocumentCustomMembersContentImport();
  await DocumentMembersButtonImport();
  await DocumentMembersContentImport();
  await ProblemAdminActionsFieldImport();
  await ProblemCrawlerFieldImport();
  await ProblemKeyFieldImport();
  await ProblemModeFieldImport();
  await ProblemNameLinkFieldImport();
  await ProblemNameModalFieldImport();
  await ProblemOwnerFieldImport();
  await ProblemStatusImport();
  await ProblemTagsFieldImport();
  await ProblemTypeFieldImport();
  await SubmissionContestFieldImport();
  await SubmissionContestProblemFieldImport();
  await SubmissionDateFieldImport();
  await SubmissionLanguageFieldImport();
  await SubmissionModalImport();
  await SubmissionNicknameFieldImport();
  await SubmissionProblemFieldImport();
  await SubmissionRejudgeButtonImport();
  await SubmissionTimeFieldImport();
  await SubmitViewImport();
};

export * from './helpers';
