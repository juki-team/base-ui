import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../SpinIcon';
import { BasicIconProps } from '../types';

const LazyAcUnitIcon = lazy(() => import('./AcUnitIcon').then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcUnitIcon {...props} />
  </Suspense>
);

const LazyAccountCircleIcon = lazy(() => import('./AccountCircleIcon').then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAccountCircleIcon {...props} />
  </Suspense>
);

const LazyAcuteIcon = lazy(() => import('./AcuteIcon').then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcuteIcon {...props} />
  </Suspense>
);

const LazyAddIcon = lazy(() => import('./AddIcon').then(module => ({ default: module.AddIcon })));
export const AddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddIcon {...props} />
  </Suspense>
);

const LazyAddReactionIcon = lazy(() => import('./AddReactionIcon').then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddReactionIcon {...props} />
  </Suspense>
);

const LazyAdminPanelSettingsIcon = lazy(() => import('./AdminPanelSettingsIcon').then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAdminPanelSettingsIcon {...props} />
  </Suspense>
);

const LazyAlarmIcon = lazy(() => import('./AlarmIcon').then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAlarmIcon {...props} />
  </Suspense>
);

const LazyAppsIcon = lazy(() => import('./AppsIcon').then(module => ({ default: module.AppsIcon })));
export const AppsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAppsIcon {...props} />
  </Suspense>
);

const LazyArrowBackIcon = lazy(() => import('./ArrowBackIcon').then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowBackIcon {...props} />
  </Suspense>
);

const LazyArrowDownwardIcon = lazy(() => import('./ArrowDownwardIcon').then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDownwardIcon {...props} />
  </Suspense>
);

const LazyArrowDropDownIcon = lazy(() => import('./ArrowDropDownIcon').then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropDownIcon {...props} />
  </Suspense>
);

const LazyArrowDropUpIcon = lazy(() => import('./ArrowDropUpIcon').then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropUpIcon {...props} />
  </Suspense>
);

const LazyArrowForwardIcon = lazy(() => import('./ArrowForwardIcon').then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowForwardIcon {...props} />
  </Suspense>
);

const LazyArrowLeftIcon = lazy(() => import('./ArrowLeftIcon').then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowLeftIcon {...props} />
  </Suspense>
);

const LazyArrowRightIcon = lazy(() => import('./ArrowRightIcon').then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowRightIcon {...props} />
  </Suspense>
);

const LazyArrowUpwardIcon = lazy(() => import('./ArrowUpwardIcon').then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowUpwardIcon {...props} />
  </Suspense>
);

const LazyArticleIcon = lazy(() => import('./ArticleIcon').then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArticleIcon {...props} />
  </Suspense>
);

const LazyAssignmentIcon = lazy(() => import('./AssignmentIcon').then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAssignmentIcon {...props} />
  </Suspense>
);

const LazyAttachFileIcon = lazy(() => import('./AttachFileIcon').then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachFileIcon {...props} />
  </Suspense>
);

const LazyAttachmentIcon = lazy(() => import('./AttachmentIcon').then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachmentIcon {...props} />
  </Suspense>
);

const LazyAutorenewIcon = lazy(() => import('./AutorenewIcon').then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAutorenewIcon {...props} />
  </Suspense>
);

const LazyBadgeIcon = lazy(() => import('./BadgeIcon').then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBadgeIcon {...props} />
  </Suspense>
);

const LazyBoltIcon = lazy(() => import('./BoltIcon').then(module => ({ default: module.BoltIcon })));
export const BoltIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBoltIcon {...props} />
  </Suspense>
);

const LazyBubbleChartIcon = lazy(() => import('./BubbleChartIcon').then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBubbleChartIcon {...props} />
  </Suspense>
);

const LazyBuildIcon = lazy(() => import('./BuildIcon').then(module => ({ default: module.BuildIcon })));
export const BuildIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBuildIcon {...props} />
  </Suspense>
);

const LazyCalendarMonthIcon = lazy(() => import('./CalendarMonthIcon').then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarMonthIcon {...props} />
  </Suspense>
);

const LazyCalendarTodayIcon = lazy(() => import('./CalendarTodayIcon').then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarTodayIcon {...props} />
  </Suspense>
);

const LazyCalendarViewWeekIcon = lazy(() => import('./CalendarViewWeekIcon').then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarViewWeekIcon {...props} />
  </Suspense>
);

const LazyCheckIcon = lazy(() => import('./CheckIcon').then(module => ({ default: module.CheckIcon })));
export const CheckIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon {...props} />
  </Suspense>
);

const LazyChecklistIcon = lazy(() => import('./ChecklistIcon').then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyChecklistIcon {...props} />
  </Suspense>
);

const LazyCloseIcon = lazy(() => import('./CloseIcon').then(module => ({ default: module.CloseIcon })));
export const CloseIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon {...props} />
  </Suspense>
);

const LazyCloudDownloadIcon = lazy(() => import('./CloudDownloadIcon').then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudDownloadIcon {...props} />
  </Suspense>
);

const LazyCloudUploadIcon = lazy(() => import('./CloudUploadIcon').then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudUploadIcon {...props} />
  </Suspense>
);

const LazyCodeIcon = lazy(() => import('./CodeIcon').then(module => ({ default: module.CodeIcon })));
export const CodeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeIcon {...props} />
  </Suspense>
);

const LazyCommentIcon = lazy(() => import('./CommentIcon').then(module => ({ default: module.CommentIcon })));
export const CommentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCommentIcon {...props} />
  </Suspense>
);

const LazyContactPhoneIcon = lazy(() => import('./ContactPhoneIcon').then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactPhoneIcon {...props} />
  </Suspense>
);

const LazyContactsIcon = lazy(() => import('./ContactsIcon').then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactsIcon {...props} />
  </Suspense>
);

const LazyContentCopyIcon = lazy(() => import('./ContentCopyIcon').then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContentCopyIcon {...props} />
  </Suspense>
);

const LazyDarkModeIcon = lazy(() => import('./DarkModeIcon').then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDarkModeIcon {...props} />
  </Suspense>
);

const LazyDashboardIcon = lazy(() => import('./DashboardIcon').then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDashboardIcon {...props} />
  </Suspense>
);

const LazyDeleteIcon = lazy(() => import('./DeleteIcon').then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDeleteIcon {...props} />
  </Suspense>
);

const LazyDemographyIcon = lazy(() => import('./DemographyIcon').then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDemographyIcon {...props} />
  </Suspense>
);

const LazyDescriptionIcon = lazy(() => import('./DescriptionIcon').then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDescriptionIcon {...props} />
  </Suspense>
);

const LazyDownloadIcon = lazy(() => import('./DownloadIcon').then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDownloadIcon {...props} />
  </Suspense>
);

const LazyDraftIcon = lazy(() => import('./DraftIcon').then(module => ({ default: module.DraftIcon })));
export const DraftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDraftIcon {...props} />
  </Suspense>
);

const LazyDragIndicatorIcon = lazy(() => import('./DragIndicatorIcon').then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDragIndicatorIcon {...props} />
  </Suspense>
);

const LazyEditIcon = lazy(() => import('./EditIcon').then(module => ({ default: module.EditIcon })));
export const EditIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditIcon {...props} />
  </Suspense>
);

const LazyEditNoteIcon = lazy(() => import('./EditNoteIcon').then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditNoteIcon {...props} />
  </Suspense>
);

const LazyErrorIcon = lazy(() => import('./ErrorIcon').then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyErrorIcon {...props} />
  </Suspense>
);

const LazyEventIcon = lazy(() => import('./EventIcon').then(module => ({ default: module.EventIcon })));
export const EventIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEventIcon {...props} />
  </Suspense>
);

const LazyExpandLessIcon = lazy(() => import('./ExpandLessIcon').then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandLessIcon {...props} />
  </Suspense>
);

const LazyExpandMoreIcon = lazy(() => import('./ExpandMoreIcon').then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandMoreIcon {...props} />
  </Suspense>
);

const LazyExtensionIcon = lazy(() => import('./ExtensionIcon').then(module => ({ default: module.ExtensionIcon })));
export const ExtensionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExtensionIcon {...props} />
  </Suspense>
);

const LazyFileOpenIcon = lazy(() => import('./FileOpenIcon').then(module => ({ default: module.FileOpenIcon })));
export const FileOpenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFileOpenIcon {...props} />
  </Suspense>
);

const LazyFilterListIcon = lazy(() => import('./FilterListIcon').then(module => ({ default: module.FilterListIcon })));
export const FilterListIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFilterListIcon {...props} />
  </Suspense>
);

const LazyFolderIcon = lazy(() => import('./FolderIcon').then(module => ({ default: module.FolderIcon })));
export const FolderIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderIcon {...props} />
  </Suspense>
);

const LazyFolderManagedIcon = lazy(() => import('./FolderManagedIcon').then(module => ({ default: module.FolderManagedIcon })));
export const FolderManagedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderManagedIcon {...props} />
  </Suspense>
);

const LazyFolderOpenIcon = lazy(() => import('./FolderOpenIcon').then(module => ({ default: module.FolderOpenIcon })));
export const FolderOpenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderOpenIcon {...props} />
  </Suspense>
);

const LazyForwardIcon = lazy(() => import('./ForwardIcon').then(module => ({ default: module.ForwardIcon })));
export const ForwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyForwardIcon {...props} />
  </Suspense>
);

const LazyFullscreenExitIcon = lazy(() => import('./FullscreenExitIcon').then(module => ({ default: module.FullscreenExitIcon })));
export const FullscreenExitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenExitIcon {...props} />
  </Suspense>
);

const LazyFullscreenIcon = lazy(() => import('./FullscreenIcon').then(module => ({ default: module.FullscreenIcon })));
export const FullscreenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenIcon {...props} />
  </Suspense>
);

const LazyGlobeIcon = lazy(() => import('./GlobeIcon').then(module => ({ default: module.GlobeIcon })));
export const GlobeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGlobeIcon {...props} />
  </Suspense>
);

const LazyGroupAddIcon = lazy(() => import('./GroupAddIcon').then(module => ({ default: module.GroupAddIcon })));
export const GroupAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupAddIcon {...props} />
  </Suspense>
);

const LazyGroupIcon = lazy(() => import('./GroupIcon').then(module => ({ default: module.GroupIcon })));
export const GroupIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupIcon {...props} />
  </Suspense>
);

const LazyGroupsIcon = lazy(() => import('./GroupsIcon').then(module => ({ default: module.GroupsIcon })));
export const GroupsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupsIcon {...props} />
  </Suspense>
);

const LazyHardDriveIcon = lazy(() => import('./HardDriveIcon').then(module => ({ default: module.HardDriveIcon })));
export const HardDriveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHardDriveIcon {...props} />
  </Suspense>
);

const LazyHelpIcon = lazy(() => import('./HelpIcon').then(module => ({ default: module.HelpIcon })));
export const HelpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHelpIcon {...props} />
  </Suspense>
);

const LazyHistoryIcon = lazy(() => import('./HistoryIcon').then(module => ({ default: module.HistoryIcon })));
export const HistoryIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHistoryIcon {...props} />
  </Suspense>
);

const LazyHomeIcon = lazy(() => import('./HomeIcon').then(module => ({ default: module.HomeIcon })));
export const HomeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeIcon {...props} />
  </Suspense>
);

const LazyHomeStorageIcon = lazy(() => import('./HomeStorageIcon').then(module => ({ default: module.HomeStorageIcon })));
export const HomeStorageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeStorageIcon {...props} />
  </Suspense>
);

const LazyInfoIcon = lazy(() => import('./InfoIcon').then(module => ({ default: module.InfoIcon })));
export const InfoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInfoIcon {...props} />
  </Suspense>
);

const LazyInvertColorsIcon = lazy(() => import('./InvertColorsIcon').then(module => ({ default: module.InvertColorsIcon })));
export const InvertColorsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInvertColorsIcon {...props} />
  </Suspense>
);

const LazyLanguageIcon = lazy(() => import('./LanguageIcon').then(module => ({ default: module.LanguageIcon })));
export const LanguageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLanguageIcon {...props} />
  </Suspense>
);

const LazyLeaderboardIcon = lazy(() => import('./LeaderboardIcon').then(module => ({ default: module.LeaderboardIcon })));
export const LeaderboardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLeaderboardIcon {...props} />
  </Suspense>
);

const LazyLibraryBooksIcon = lazy(() => import('./LibraryBooksIcon').then(module => ({ default: module.LibraryBooksIcon })));
export const LibraryBooksIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLibraryBooksIcon {...props} />
  </Suspense>
);

const LazyLightModeIcon = lazy(() => import('./LightModeIcon').then(module => ({ default: module.LightModeIcon })));
export const LightModeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLightModeIcon {...props} />
  </Suspense>
);

const LazyLinkIcon = lazy(() => import('./LinkIcon').then(module => ({ default: module.LinkIcon })));
export const LinkIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkIcon {...props} />
  </Suspense>
);

const LazyListIcon = lazy(() => import('./ListIcon').then(module => ({ default: module.ListIcon })));
export const ListIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyListIcon {...props} />
  </Suspense>
);

const LazyLoadingIcon = lazy(() => import('./LoadingIcon').then(module => ({ default: module.LoadingIcon })));
export const LoadingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoadingIcon {...props} />
  </Suspense>
);

const LazyLocationCityIcon = lazy(() => import('./LocationCityIcon').then(module => ({ default: module.LocationCityIcon })));
export const LocationCityIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationCityIcon {...props} />
  </Suspense>
);

const LazyLocationOnIcon = lazy(() => import('./LocationOnIcon').then(module => ({ default: module.LocationOnIcon })));
export const LocationOnIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationOnIcon {...props} />
  </Suspense>
);

const LazyLockIcon = lazy(() => import('./LockIcon').then(module => ({ default: module.LockIcon })));
export const LockIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockIcon {...props} />
  </Suspense>
);

const LazyLockPersonIcon = lazy(() => import('./LockPersonIcon').then(module => ({ default: module.LockPersonIcon })));
export const LockPersonIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockPersonIcon {...props} />
  </Suspense>
);

const LazyLoginIcon = lazy(() => import('./LoginIcon').then(module => ({ default: module.LoginIcon })));
export const LoginIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoginIcon {...props} />
  </Suspense>
);

const LazyLogoutIcon = lazy(() => import('./LogoutIcon').then(module => ({ default: module.LogoutIcon })));
export const LogoutIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLogoutIcon {...props} />
  </Suspense>
);

const LazyMailIcon = lazy(() => import('./MailIcon').then(module => ({ default: module.MailIcon })));
export const MailIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMailIcon {...props} />
  </Suspense>
);

const LazyManageAccountsIcon = lazy(() => import('./ManageAccountsIcon').then(module => ({ default: module.ManageAccountsIcon })));
export const ManageAccountsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageAccountsIcon {...props} />
  </Suspense>
);

const LazyManageSearchIcon = lazy(() => import('./ManageSearchIcon').then(module => ({ default: module.ManageSearchIcon })));
export const ManageSearchIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageSearchIcon {...props} />
  </Suspense>
);

const LazyManufacturingIcon = lazy(() => import('./ManufacturingIcon').then(module => ({ default: module.ManufacturingIcon })));
export const ManufacturingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManufacturingIcon {...props} />
  </Suspense>
);

const LazyMenuBookIcon = lazy(() => import('./MenuBookIcon').then(module => ({ default: module.MenuBookIcon })));
export const MenuBookIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuBookIcon {...props} />
  </Suspense>
);

const LazyMenuIcon = lazy(() => import('./MenuIcon').then(module => ({ default: module.MenuIcon })));
export const MenuIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuIcon {...props} />
  </Suspense>
);

const LazyMoreTimeIcon = lazy(() => import('./MoreTimeIcon').then(module => ({ default: module.MoreTimeIcon })));
export const MoreTimeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMoreTimeIcon {...props} />
  </Suspense>
);

const LazyNavigateBeforeIcon = lazy(() => import('./NavigateBeforeIcon').then(module => ({ default: module.NavigateBeforeIcon })));
export const NavigateBeforeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateBeforeIcon {...props} />
  </Suspense>
);

const LazyNavigateNextIcon = lazy(() => import('./NavigateNextIcon').then(module => ({ default: module.NavigateNextIcon })));
export const NavigateNextIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateNextIcon {...props} />
  </Suspense>
);

const LazyNewReleasesIcon = lazy(() => import('./NewReleasesIcon').then(module => ({ default: module.NewReleasesIcon })));
export const NewReleasesIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNewReleasesIcon {...props} />
  </Suspense>
);

const LazyNoteAddIcon = lazy(() => import('./NoteAddIcon').then(module => ({ default: module.NoteAddIcon })));
export const NoteAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteAddIcon {...props} />
  </Suspense>
);

const LazyNoteIcon = lazy(() => import('./NoteIcon').then(module => ({ default: module.NoteIcon })));
export const NoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteIcon {...props} />
  </Suspense>
);

const LazyNotificationsActiveIcon = lazy(() => import('./NotificationsActiveIcon').then(module => ({ default: module.NotificationsActiveIcon })));
export const NotificationsActiveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationsActiveIcon {...props} />
  </Suspense>
);

const LazyOpenInNewIcon = lazy(() => import('./OpenInNewIcon').then(module => ({ default: module.OpenInNewIcon })));
export const OpenInNewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyOpenInNewIcon {...props} />
  </Suspense>
);

const LazyPageInfoIcon = lazy(() => import('./PageInfoIcon').then(module => ({ default: module.PageInfoIcon })));
export const PageInfoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPageInfoIcon {...props} />
  </Suspense>
);

const LazyPaletteIcon = lazy(() => import('./PaletteIcon').then(module => ({ default: module.PaletteIcon })));
export const PaletteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPaletteIcon {...props} />
  </Suspense>
);

const LazyPendingActionsIcon = lazy(() => import('./PendingActionsIcon').then(module => ({ default: module.PendingActionsIcon })));
export const PendingActionsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingActionsIcon {...props} />
  </Suspense>
);

const LazyPendingIcon = lazy(() => import('./PendingIcon').then(module => ({ default: module.PendingIcon })));
export const PendingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingIcon {...props} />
  </Suspense>
);

const LazyPersonIcon = lazy(() => import('./PersonIcon').then(module => ({ default: module.PersonIcon })));
export const PersonIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPersonIcon {...props} />
  </Suspense>
);

const LazyPhotoLibraryIcon = lazy(() => import('./PhotoLibraryIcon').then(module => ({ default: module.PhotoLibraryIcon })));
export const PhotoLibraryIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPhotoLibraryIcon {...props} />
  </Suspense>
);

const LazyPictureAsPdfIcon = lazy(() => import('./PictureAsPdfIcon').then(module => ({ default: module.PictureAsPdfIcon })));
export const PictureAsPdfIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPictureAsPdfIcon {...props} />
  </Suspense>
);

const LazyPlayArrowIcon = lazy(() => import('./PlayArrowIcon').then(module => ({ default: module.PlayArrowIcon })));
export const PlayArrowIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayArrowIcon {...props} />
  </Suspense>
);

const LazyPlayCircleIcon = lazy(() => import('./PlayCircleIcon').then(module => ({ default: module.PlayCircleIcon })));
export const PlayCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayCircleIcon {...props} />
  </Suspense>
);

const LazyPostAddIcon = lazy(() => import('./PostAddIcon').then(module => ({ default: module.PostAddIcon })));
export const PostAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPostAddIcon {...props} />
  </Suspense>
);

const LazyPreviewIcon = lazy(() => import('./PreviewIcon').then(module => ({ default: module.PreviewIcon })));
export const PreviewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPreviewIcon {...props} />
  </Suspense>
);

const LazyPublicIcon = lazy(() => import('./PublicIcon').then(module => ({ default: module.PublicIcon })));
export const PublicIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublicIcon {...props} />
  </Suspense>
);

const LazyPublishIcon = lazy(() => import('./PublishIcon').then(module => ({ default: module.PublishIcon })));
export const PublishIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublishIcon {...props} />
  </Suspense>
);

const LazyRedoIcon = lazy(() => import('./RedoIcon').then(module => ({ default: module.RedoIcon })));
export const RedoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRedoIcon {...props} />
  </Suspense>
);

const LazyRefreshIcon = lazy(() => import('./RefreshIcon').then(module => ({ default: module.RefreshIcon })));
export const RefreshIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRefreshIcon {...props} />
  </Suspense>
);

const LazyReplyAllIcon = lazy(() => import('./ReplyAllIcon').then(module => ({ default: module.ReplyAllIcon })));
export const ReplyAllIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyAllIcon {...props} />
  </Suspense>
);

const LazyReplyIcon = lazy(() => import('./ReplyIcon').then(module => ({ default: module.ReplyIcon })));
export const ReplyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyIcon {...props} />
  </Suspense>
);

const LazySaveIcon = lazy(() => import('./SaveIcon').then(module => ({ default: module.SaveIcon })));
export const SaveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySaveIcon {...props} />
  </Suspense>
);

const LazyScheduleIcon = lazy(() => import('./ScheduleIcon').then(module => ({ default: module.ScheduleIcon })));
export const ScheduleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyScheduleIcon {...props} />
  </Suspense>
);

const LazySchoolIcon = lazy(() => import('./SchoolIcon').then(module => ({ default: module.SchoolIcon })));
export const SchoolIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySchoolIcon {...props} />
  </Suspense>
);

const LazySearchIcon = lazy(() => import('./SearchIcon').then(module => ({ default: module.SearchIcon })));
export const SearchIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySearchIcon {...props} />
  </Suspense>
);

const LazySendIcon = lazy(() => import('./SendIcon').then(module => ({ default: module.SendIcon })));
export const SendIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySendIcon {...props} />
  </Suspense>
);

const LazySettingsAlertIcon = lazy(() => import('./SettingsAlertIcon').then(module => ({ default: module.SettingsAlertIcon })));
export const SettingsAlertIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsAlertIcon {...props} />
  </Suspense>
);

const LazySettingsIcon = lazy(() => import('./SettingsIcon').then(module => ({ default: module.SettingsIcon })));
export const SettingsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsIcon {...props} />
  </Suspense>
);

const LazySettingsSuggestIcon = lazy(() => import('./SettingsSuggestIcon').then(module => ({ default: module.SettingsSuggestIcon })));
export const SettingsSuggestIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsSuggestIcon {...props} />
  </Suspense>
);

const LazyShareIcon = lazy(() => import('./ShareIcon').then(module => ({ default: module.ShareIcon })));
export const ShareIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyShareIcon {...props} />
  </Suspense>
);

const LazySideNavigationIcon = lazy(() => import('./SideNavigationIcon').then(module => ({ default: module.SideNavigationIcon })));
export const SideNavigationIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySideNavigationIcon {...props} />
  </Suspense>
);

const LazySpeedIcon = lazy(() => import('./SpeedIcon').then(module => ({ default: module.SpeedIcon })));
export const SpeedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySpeedIcon {...props} />
  </Suspense>
);

const LazyStopCircleIcon = lazy(() => import('./StopCircleIcon').then(module => ({ default: module.StopCircleIcon })));
export const StopCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStopCircleIcon {...props} />
  </Suspense>
);

const LazyStorageIcon = lazy(() => import('./StorageIcon').then(module => ({ default: module.StorageIcon })));
export const StorageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStorageIcon {...props} />
  </Suspense>
);

const LazySupportAgentIcon = lazy(() => import('./SupportAgentIcon').then(module => ({ default: module.SupportAgentIcon })));
export const SupportAgentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySupportAgentIcon {...props} />
  </Suspense>
);

const LazySyncIcon = lazy(() => import('./SyncIcon').then(module => ({ default: module.SyncIcon })));
export const SyncIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySyncIcon {...props} />
  </Suspense>
);

const LazyTaskIcon = lazy(() => import('./TaskIcon').then(module => ({ default: module.TaskIcon })));
export const TaskIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTaskIcon {...props} />
  </Suspense>
);

const LazyTimerIcon = lazy(() => import('./TimerIcon').then(module => ({ default: module.TimerIcon })));
export const TimerIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimerIcon {...props} />
  </Suspense>
);

const LazyTrendingUpIcon = lazy(() => import('./TrendingUpIcon').then(module => ({ default: module.TrendingUpIcon })));
export const TrendingUpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrendingUpIcon {...props} />
  </Suspense>
);

const LazyTrophyIcon = lazy(() => import('./TrophyIcon').then(module => ({ default: module.TrophyIcon })));
export const TrophyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrophyIcon {...props} />
  </Suspense>
);

const LazyUndoIcon = lazy(() => import('./UndoIcon').then(module => ({ default: module.UndoIcon })));
export const UndoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUndoIcon {...props} />
  </Suspense>
);

const LazyUpdateIcon = lazy(() => import('./UpdateIcon').then(module => ({ default: module.UpdateIcon })));
export const UpdateIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpdateIcon {...props} />
  </Suspense>
);

const LazyVerticalSplitIcon = lazy(() => import('./VerticalSplitIcon').then(module => ({ default: module.VerticalSplitIcon })));
export const VerticalSplitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalSplitIcon {...props} />
  </Suspense>
);

const LazyViewCozyIcon = lazy(() => import('./ViewCozyIcon').then(module => ({ default: module.ViewCozyIcon })));
export const ViewCozyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewCozyIcon {...props} />
  </Suspense>
);

const LazyViewHeadlineIcon = lazy(() => import('./ViewHeadlineIcon').then(module => ({ default: module.ViewHeadlineIcon })));
export const ViewHeadlineIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewHeadlineIcon {...props} />
  </Suspense>
);

const LazyViewModuleIcon = lazy(() => import('./ViewModuleIcon').then(module => ({ default: module.ViewModuleIcon })));
export const ViewModuleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewModuleIcon {...props} />
  </Suspense>
);

const LazyVisibilityIcon = lazy(() => import('./VisibilityIcon').then(module => ({ default: module.VisibilityIcon })));
export const VisibilityIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityIcon {...props} />
  </Suspense>
);

const LazyVisibilityOffIcon = lazy(() => import('./VisibilityOffIcon').then(module => ({ default: module.VisibilityOffIcon })));
export const VisibilityOffIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityOffIcon {...props} />
  </Suspense>
);

const LazyVoidIcon = lazy(() => import('./VoidIcon').then(module => ({ default: module.VoidIcon })));
export const VoidIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVoidIcon {...props} />
  </Suspense>
);

const LazyWarningIcon = lazy(() => import('./WarningIcon').then(module => ({ default: module.WarningIcon })));
export const WarningIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWarningIcon {...props} />
  </Suspense>
);
