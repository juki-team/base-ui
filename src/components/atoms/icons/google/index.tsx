import React, { lazy, Suspense } from 'react';
import { BasicIconProps } from '../types';
import { LoadingIcon } from './AutorenewIcon';

export { LoadingIcon } from './AutorenewIcon';

// https://fonts.google.com/icons
// wight: 400, grade: 0, optical size: 24

// export * from './AccountCircleIcon';
// export * from './AcuteIcon';
// export * from './AddIcon';
// export * from './AdminPanelSettingsIcon';
// export * from './AlarmIcon';
// export * from './AppsIcon';
// export * from './ArrowBackIcon';
// export * from './ArrowDownwardIcon';

const LazyAccountCircleIcon = lazy(() => import('./AccountCircleIcon').then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAccountCircleIcon {...props} /> </Suspense>
);

const LazyAcUnitIcon = lazy(() => import('./AcUnitIcon').then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAcUnitIcon {...props} /> </Suspense>
);

const LazyAcuteIcon = lazy(() => import('./AcuteIcon').then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAcuteIcon {...props} /> </Suspense>
);

const LazAddIcon = lazy(() => import('./AddIcon').then(module => ({ default: module.AddIcon })));
export const AddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazAddIcon {...props} /> </Suspense>
);

const LazAddReactionIcon = lazy(() => import('./AddReactionIcon').then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazAddReactionIcon {...props} /> </Suspense>
);

const LazyAdminPanelSettingsIcon = lazy(() => import('./AdminPanelSettingsIcon').then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAdminPanelSettingsIcon {...props} /> </Suspense>
);

const LazyAlarmIcon = lazy(() => import('./AlarmIcon').then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAlarmIcon {...props} /> </Suspense>
);

const LazyAppsIcon = lazy(() => import('./AppsIcon').then(module => ({ default: module.AppsIcon })));
export const AppsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAppsIcon {...props} /> </Suspense>
);

const LazyArrowBackIcon = lazy(() => import('./ArrowBackIcon').then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowBackIcon {...props} /> </Suspense>
);

const LazyArrowDownwardIcon = lazy(() => import('./ArrowDownwardIcon').then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowDownwardIcon {...props} /> </Suspense>
);

const LazyArrowDropDownIcon = lazy(() => import('./ArrowDropDownIcon').then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowDropDownIcon {...props} /> </Suspense>
);

const LazyArrowDropUpIcon = lazy(() => import('./ArrowDropUpIcon').then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowDropUpIcon {...props} /> </Suspense>
);

const LazyArrowForwardIcon = lazy(() => import('./ArrowForwardIcon').then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowForwardIcon {...props} /> </Suspense>
);

const LazyArrowLeftIcon = lazy(() => import('./ArrowLeftIcon').then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowLeftIcon {...props} /> </Suspense>
);

const LazyArrowRightIcon = lazy(() => import('./ArrowRightIcon').then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowRightIcon {...props} /> </Suspense>
);

const LazyArrowUpwardIcon = lazy(() => import('./ArrowUpwardIcon').then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArrowUpwardIcon {...props} /> </Suspense>
);

const LazyArticleIcon = lazy(() => import('./ArticleIcon').then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyArticleIcon {...props} /> </Suspense>
);

const LazyAssignmentIcon = lazy(() => import('./AssignmentIcon').then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAssignmentIcon {...props} /> </Suspense>
);

const LazyAttachFileIcon = lazy(() => import('./AttachFileIcon').then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAttachFileIcon {...props} /> </Suspense>
);

const LazyAttachmentIcon = lazy(() => import('./AttachmentIcon').then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAttachmentIcon {...props} /> </Suspense>
);

const LazyAutorenewIcon = lazy(() => import('./AutorenewIcon').then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyAutorenewIcon {...props} /> </Suspense>
);

const LazyBadgeIcon = lazy(() => import('./BadgeIcon').then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyBadgeIcon {...props} /> </Suspense>
);

const LazyBoltIcon = lazy(() => import('./BoltIcon').then(module => ({ default: module.BoltIcon })));
export const BoltIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyBoltIcon {...props} /> </Suspense>
);

const LazyBubbleChartIcon = lazy(() => import('./BubbleChartIcon').then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyBubbleChartIcon {...props} /> </Suspense>
);

const LazyBuildIcon = lazy(() => import('./BuildIcon').then(module => ({ default: module.BuildIcon })));
export const BuildIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyBuildIcon {...props} /> </Suspense>
);

const LazyCalendarMonthIcon = lazy(() => import('./CalendarMonthIcon').then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCalendarMonthIcon {...props} /> </Suspense>
);

const LazyCalendarTodayIcon = lazy(() => import('./CalendarTodayIcon').then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCalendarTodayIcon {...props} /> </Suspense>
);

const LazyCalendarViewWeekIcon = lazy(() => import('./CalendarViewWeekIcon').then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCalendarViewWeekIcon {...props} /> </Suspense>
);

const LazyCheckIcon = lazy(() => import('./CheckIcon').then(module => ({ default: module.CheckIcon })));
export const CheckIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCheckIcon {...props} /> </Suspense>
);

const LazyChecklistIcon = lazy(() => import('./ChecklistIcon').then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyChecklistIcon {...props} /> </Suspense>
);

const LazyCloseIcon = lazy(() => import('./CloseIcon').then(module => ({ default: module.CloseIcon })));
export const CloseIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCloseIcon {...props} /> </Suspense>
);

const LazyCloudDownloadIcon = lazy(() => import('./CloudDownloadIcon').then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCloudDownloadIcon {...props} /> </Suspense>
);

const LazyCloudUploadIcon = lazy(() => import('./CloudUploadIcon').then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCloudUploadIcon {...props} /> </Suspense>
);

const LazyCodeIcon = lazy(() => import('./CodeIcon').then(module => ({ default: module.CodeIcon })));
export const CodeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCodeIcon {...props} /> </Suspense>
);

const LazyCommentIcon = lazy(() => import('./CommentIcon').then(module => ({ default: module.CommentIcon })));
export const CommentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyCommentIcon {...props} /> </Suspense>
);

const LazyContactPhoneIcon = lazy(() => import('./ContactPhoneIcon').then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyContactPhoneIcon {...props} /> </Suspense>
);

const LazyContactsIcon = lazy(() => import('./ContactsIcon').then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyContactsIcon {...props} /> </Suspense>
);

const LazyContentCopyIcon = lazy(() => import('./ContentCopyIcon').then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyContentCopyIcon {...props} /> </Suspense>
);

const LazyDarkModeIcon = lazy(() => import('./DarkModeIcon').then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDarkModeIcon {...props} /> </Suspense>
);

const LazyDashboardIcon = lazy(() => import('./DashboardIcon').then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDashboardIcon {...props} /> </Suspense>
);

const LazyDeleteIcon = lazy(() => import('./DeleteIcon').then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDeleteIcon {...props} /> </Suspense>
);

const LazyDemographyIcon = lazy(() => import('./DemographyIcon').then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDemographyIcon {...props} /> </Suspense>
);

const LazyDescriptionIcon = lazy(() => import('./DescriptionIcon').then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDescriptionIcon {...props} /> </Suspense>
);

const LazyDownloadIcon = lazy(() => import('./DownloadIcon').then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDownloadIcon {...props} /> </Suspense>
);

const LazyDraftIcon = lazy(() => import('./DraftIcon').then(module => ({ default: module.DraftIcon })));
export const DraftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDraftIcon {...props} /> </Suspense>
);

const LazyDragIndicatorIcon = lazy(() => import('./DragIndicatorIcon').then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyDragIndicatorIcon {...props} /> </Suspense>
);

const LazyEditIcon = lazy(() => import('./EditIcon').then(module => ({ default: module.EditIcon })));
export const EditIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyEditIcon {...props} /> </Suspense>
);

const LazyEditNoteIcon = lazy(() => import('./EditNoteIcon').then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyEditNoteIcon {...props} /> </Suspense>
);

const LazyErrorIcon = lazy(() => import('./ErrorIcon').then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyErrorIcon {...props} /> </Suspense>
);

const LazyEventIcon = lazy(() => import('./EventIcon').then(module => ({ default: module.EventIcon })));
export const EventIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyEventIcon {...props} /> </Suspense>
);

const LazyExpandLessIcon = lazy(() => import('./ExpandLessIcon').then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyExpandLessIcon {...props} /> </Suspense>
);

const LazyExpandMoreIcon = lazy(() => import('./ExpandMoreIcon').then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = (props: BasicIconProps) => (
  <Suspense fallback={<LoadingIcon size="tiny" />}><LazyExpandMoreIcon {...props} /> </Suspense>
);

export * from './ExtensionIcon';
export * from './FileOpenIcon';
export * from './FilterListIcon';
export * from './FilterListIcon';
export * from './FolderIcon';
export * from './FolderManagedIcon';
export * from './FolderOpenIcon';
export * from './ForwardIcon';
export * from './FullscreenExitIcon';
export * from './FullscreenIcon';
export * from './Globe';
export * from './GroupAddIcon';
export * from './GroupIcon';
export * from './GroupsIcon';
export * from './HardDriveIcon';
export * from './HelpIcon';
export * from './HistoryIcon';
export * from './HomeIcon';
export * from './HomeStorageIcon';
export * from './InfoIcon';
export * from './InvertColorsIcon';
export * from './LanguageIcon';
export * from './LeaderboardIcon';
export * from './LibraryBooksIcon';
export * from './LightModeIcon';
export * from './LinkIcon';
export * from './ListIcon';
export * from './LocationCityIcon';
export * from './LocationOnIcon';
export * from './LockIcon';
export * from './LockPersonIcon';
export * from './LoginIcon';
export * from './LogoutIcon';
export * from './MailIcon';
export * from './ManageAccountsIcon';
export * from './ManageSearchIcon';
export * from './ManufacturingIcon';
export * from './MenuBookIcon';
export * from './MenuIcon';
export * from './MoreTimeIcon';
export * from './NavigateBeforeIcon';
export * from './NavigateNextIcon';
export * from './NewReleasesIcon';
export * from './NoteAddIcon';
export * from './NoteIcon';
export * from './NotificationsActiveIcon';
export * from './OpenInNewIcon';
export * from './PageInfoIcon';
export * from './PaletteIcon';
export * from './PendingActionsIcon';
export * from './PendingIcon';
export * from './PersonIcon';
export * from './PhotoLibraryIcon';
export * from './PictureAsPdfIcon';
export * from './PlayArrowIcon';
export * from './PlayCircleIcon';
export * from './PostAddIcon';
export * from './PreviewIcon';
export * from './PublicIcon';
export * from './PublishIcon';
export * from './RedoIcon';
export * from './RefreshIcon';
export * from './ReplyAllIcon';
export * from './ReplyIcon';
export * from './SaveIcon';
export * from './ScheduleIcon';
export * from './SchoolIcon';
export * from './SearchIcon';
export * from './SendIcon';
export * from './SettingsAlertIcon';
export * from './SettingsIcon';
export * from './SettingsSuggestIcon';
export * from './ShareIcon';
export * from './SideNavigationIcon';
export * from './SpeedIcon';
export * from './StopCircleIcon';
export * from './StorageIcon';
export * from './SupportAgentIcon';
export * from './SyncIcon';
export * from './TaskIcon';
export * from './TimerIcon';
export * from './TrendingUpIcon';
export * from './TrophyIcon';
export * from './UndoIcon';
export * from './UpdateIcon';
export * from './VerticalSplitIcon';
export * from './ViewCozyIcon';
export * from './ViewHeadlineIcon';
export * from './ViewModuleIcon';
export * from './VisibilityIcon';
export * from './VisibilityOffIcon';
export * from './VoidIcon';
export * from './WarningIcon';
