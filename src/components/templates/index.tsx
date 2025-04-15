import React, { lazy, Suspense } from 'react';
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
import { SubmissionTimeFieldProps } from './submission/types';
import { SubmitViewProps } from './submission/types';

const LazyChangePasswordModal = lazy(() => import('./ChangePasswordModal/ChangePasswordModal').then(module => ({ default: module.ChangePasswordModal })));
export const ChangePasswordModal = (props: ChangePasswordModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyChangePasswordModal {...props} />
  </Suspense>
);

const LazyEditProfileModal = lazy(() => import('./EditProfileModal/EditProfileModal').then(module => ({ default: module.EditProfileModal })));
export const EditProfileModal = (props: EditProfileModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditProfileModal {...props} />
  </Suspense>
);

const LazyImageProfileModal = lazy(() => import('./EditProfileModal/ImageProfileModal').then(module => ({ default: module.ImageProfileModal })));
export const ImageProfileModal = (props: ImageProfileModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyImageProfileModal {...props} />
  </Suspense>
);

const LazyEntityLogsModal = lazy(() => import('./EntityLogsModal/EntityLogsModal').then(module => ({ default: module.EntityLogsModal })));
export const EntityLogsModal = (props: EntityLogsModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEntityLogsModal {...props} />
  </Suspense>
);

const LazyErrorBoundary = lazy(() => import('./ErrorBoundary/ErrorBoundary').then(module => ({ default: module.ErrorBoundary })));
export const ErrorBoundary = (props: ErrorBoundaryProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyErrorBoundary {...props} />
  </Suspense>
);

const LazyHelpSection = lazy(() => import('./HelpSection/HelpSection').then(module => ({ default: module.HelpSection })));
export const HelpSection = (props: HelpSectionProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHelpSection {...props} />
  </Suspense>
);

const LazyJukiSocketAlert = lazy(() => import('./JukiSocketAlert/JukiSocketAlert').then(module => ({ default: module.JukiSocketAlert })));
export const JukiSocketAlert = (props: JukiSocketAlertProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiSocketAlert {...props} />
  </Suspense>
);

const LazyMainMenu = lazy(() => import('./MainMenu/MainMenu').then(module => ({ default: module.MainMenu })));
export const MainMenu = (props: MainMenuProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMainMenu {...props} />
  </Suspense>
);

const LazyNewVersionAvailable = lazy(() => import('./NewViersionAvailableModal/NewVersionAvailable').then(module => ({ default: module.NewVersionAvailable })));
export const NewVersionAvailable = (props: NewVersionAvailableProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNewVersionAvailable {...props} />
  </Suspense>
);

const LazyPageNotFound = lazy(() => import('./PageNotFound/PageNotFound').then(module => ({ default: module.PageNotFound })));
export const PageNotFound = (props: PageNotFoundProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPageNotFound {...props} />
  </Suspense>
);

const LazyProblemInfo = lazy(() => import('./ProblemView/ProblemInfo').then(module => ({ default: module.ProblemInfo })));
export const ProblemInfo = (props: ProblemInfoProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemInfo {...props} />
  </Suspense>
);

const LazyProblemView = lazy(() => import('./ProblemView/ProblemView').then(module => ({ default: module.ProblemView })));
export const ProblemView = <T, >(props: ProblemViewProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyProblemView {...props} />
  </Suspense>
);

const LazyResetPasswordModal = lazy(() => import('./ResetPasswordModal/ResetPasswordModal').then(module => ({ default: module.ResetPasswordModal })));
export const ResetPasswordModal = (props: ResetPasswordModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyResetPasswordModal {...props} />
  </Suspense>
);

const LazyUserPreviewModal = lazy(() => import('./UserPreviewModal/UserPreviewModal').then(module => ({ default: module.UserPreviewModal })));
export const UserPreviewModal = (props: UserPreviewModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserPreviewModal {...props} />
  </Suspense>
);

const LazyUserProfile = lazy(() => import('./UserProfile/UserProfile').then(module => ({ default: module.UserProfile })));
export const UserProfile = (props: UserProfileProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserProfile {...props} />
  </Suspense>
);

const LazyUserProfileSettings = lazy(() => import('./UserProfileSettings/UserProfileSettings').then(module => ({ default: module.UserProfileSettings })));
export const UserProfileSettings = (props: UserProfileSettingsProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUserProfileSettings {...props} />
  </Suspense>
);

const LazyContestNameLinkField = lazy(() => import('./contest/ContestNameLinkField').then(module => ({ default: module.ContestNameLinkField })));
export const ContestNameLinkField = (props: ContestNameLinkFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContestNameLinkField {...props} />
  </Suspense>
);

const LazyCreateEntityLayout = lazy(() => import('./entity/CreateEntityLayout').then(module => ({ default: module.CreateEntityLayout })));
export const CreateEntityLayout = <T, U, V>(props: CreateEntityLayoutProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCreateEntityLayout {...props} />
  </Suspense>
);

const LazyUpdateEntityLayout = lazy(() => import('./entity/UpdateEntityLayout').then(module => ({ default: module.UpdateEntityLayout })));
export const UpdateEntityLayout = <T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyUpdateEntityLayout {...props} />
  </Suspense>
);

const LazyDocumentCustomMembersContent = lazy(() => import('./members/DocumentCustomMembersContent').then(module => ({ default: module.DocumentCustomMembersContent })));
export const DocumentCustomMembersContent = (props: DocumentCustomMembersContentProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentCustomMembersContent {...props} />
  </Suspense>
);

const LazyDocumentMembersButton = lazy(() => import('./members/DocumentMembersButton').then(module => ({ default: module.DocumentMembersButton })));
export const DocumentMembersButton = (props: DocumentMembersButtonProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentMembersButton {...props} />
  </Suspense>
);

const LazyDocumentMembersContent = lazy(() => import('./members/DocumentMembersContent').then(module => ({ default: module.DocumentMembersContent })));
export const DocumentMembersContent = (props: DocumentMembersContentProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDocumentMembersContent {...props} />
  </Suspense>
);

const LazyProblemAdminActionsField = lazy(() => import('./problem/ProblemAdminActionsField').then(module => ({ default: module.ProblemAdminActionsField })));
export const ProblemAdminActionsField = (props: ProblemAdminActionsFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemAdminActionsField {...props} />
  </Suspense>
);

const LazyProblemCrawlerField = lazy(() => import('./problem/ProblemCrawlerField').then(module => ({ default: module.ProblemCrawlerField })));
export const ProblemCrawlerField = (props: ProblemCrawlerFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemCrawlerField {...props} />
  </Suspense>
);

const LazyProblemKeyField = lazy(() => import('./problem/ProblemKeyField').then(module => ({ default: module.ProblemKeyField })));
export const ProblemKeyField = (props: ProblemKeyFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemKeyField {...props} />
  </Suspense>
);

const LazyProblemModeField = lazy(() => import('./problem/ProblemModeField').then(module => ({ default: module.ProblemModeField })));
export const ProblemModeField = (props: ProblemModeFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemModeField {...props} />
  </Suspense>
);

const LazyProblemNameLinkField = lazy(() => import('./problem/ProblemNameLinkField').then(module => ({ default: module.ProblemNameLinkField })));
export const ProblemNameLinkField = (props: ProblemNameLinkFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemNameLinkField {...props} />
  </Suspense>
);

const LazyProblemNameModalField = lazy(() => import('./problem/ProblemNameModalField').then(module => ({ default: module.ProblemNameModalField })));
export const ProblemNameModalField = (props: ProblemNameModalFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemNameModalField {...props} />
  </Suspense>
);

const LazyProblemOwnerField = lazy(() => import('./problem/ProblemOwnerField').then(module => ({ default: module.ProblemOwnerField })));
export const ProblemOwnerField = (props: ProblemOwnerFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemOwnerField {...props} />
  </Suspense>
);

const LazyProblemStatus = lazy(() => import('./problem/ProblemStatus').then(module => ({ default: module.ProblemStatus })));
export const ProblemStatus = (props: ProblemStatusProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemStatus {...props} />
  </Suspense>
);

const LazyProblemTagsField = lazy(() => import('./problem/ProblemTagsField').then(module => ({ default: module.ProblemTagsField })));
export const ProblemTagsField = (props: ProblemTagsFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemTagsField {...props} />
  </Suspense>
);

const LazyProblemTypeField = lazy(() => import('./problem/ProblemTypeField').then(module => ({ default: module.ProblemTypeField })));
export const ProblemTypeField = (props: ProblemTypeFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyProblemTypeField {...props} />
  </Suspense>
);

const LazySubmissionContestField = lazy(() => import('./submission/SubmissionContestField').then(module => ({ default: module.SubmissionContestField })));
export const SubmissionContestField = (props: SubmissionContestFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionContestField {...props} />
  </Suspense>
);

const LazySubmissionContestProblemField = lazy(() => import('./submission/SubmissionContestProblemField').then(module => ({ default: module.SubmissionContestProblemField })));
export const SubmissionContestProblemField = (props: SubmissionContestProblemFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionContestProblemField {...props} />
  </Suspense>
);

const LazySubmissionDateField = lazy(() => import('./submission/SubmissionDateField').then(module => ({ default: module.SubmissionDateField })));
export const SubmissionDateField = (props: SubmissionDateFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionDateField {...props} />
  </Suspense>
);

const LazySubmissionLanguageField = lazy(() => import('./submission/SubmissionLanguageField').then(module => ({ default: module.SubmissionLanguageField })));
export const SubmissionLanguageField = (props: SubmissionLanguageFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionLanguageField {...props} />
  </Suspense>
);

const LazySubmissionModal = lazy(() => import('./submission/SubmissionModal').then(module => ({ default: module.SubmissionModal })));
export const SubmissionModal = (props: SubmissionModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionModal {...props} />
  </Suspense>
);

const LazySubmissionNicknameField = lazy(() => import('./submission/SubmissionNicknameField').then(module => ({ default: module.SubmissionNicknameField })));
export const SubmissionNicknameField = (props: SubmissionNicknameFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionNicknameField {...props} />
  </Suspense>
);

const LazySubmissionProblemField = lazy(() => import('./submission/SubmissionProblemField').then(module => ({ default: module.SubmissionProblemField })));
export const SubmissionProblemField = (props: SubmissionProblemFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionProblemField {...props} />
  </Suspense>
);

const LazySubmissionTimeField = lazy(() => import('./submission/SubmissionTimeField').then(module => ({ default: module.SubmissionTimeField })));
export const SubmissionTimeField = (props: SubmissionTimeFieldProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmissionTimeField {...props} />
  </Suspense>
);

const LazySubmitView = lazy(() => import('./submission/SubmitView').then(module => ({ default: module.SubmitView })));
export const SubmitView = (props: SubmitViewProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySubmitView {...props} />
  </Suspense>
);

export * from './helpers';
