import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { BasicIconProps } from '../types';

const AcUnitIconImport = () => import('./AcUnitIcon');
const LazyAcUnitIcon = lazy(() => AcUnitIconImport().then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAcUnitIcon {...props} />
  </SuspenseWithTracking>
);

const AccountCircleIconImport = () => import('./AccountCircleIcon');
const LazyAccountCircleIcon = lazy(() => AccountCircleIconImport().then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAccountCircleIcon {...props} />
  </SuspenseWithTracking>
);

const AcuteIconImport = () => import('./AcuteIcon');
const LazyAcuteIcon = lazy(() => AcuteIconImport().then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAcuteIcon {...props} />
  </SuspenseWithTracking>
);

const AddIconImport = () => import('./AddIcon');
const LazyAddIcon = lazy(() => AddIconImport().then(module => ({ default: module.AddIcon })));
export const AddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAddIcon {...props} />
  </SuspenseWithTracking>
);

const AddReactionIconImport = () => import('./AddReactionIcon');
const LazyAddReactionIcon = lazy(() => AddReactionIconImport().then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAddReactionIcon {...props} />
  </SuspenseWithTracking>
);

const AdminPanelSettingsIconImport = () => import('./AdminPanelSettingsIcon');
const LazyAdminPanelSettingsIcon = lazy(() => AdminPanelSettingsIconImport().then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAdminPanelSettingsIcon {...props} />
  </SuspenseWithTracking>
);

const AlarmIconImport = () => import('./AlarmIcon');
const LazyAlarmIcon = lazy(() => AlarmIconImport().then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAlarmIcon {...props} />
  </SuspenseWithTracking>
);

const AppsIconImport = () => import('./AppsIcon');
const LazyAppsIcon = lazy(() => AppsIconImport().then(module => ({ default: module.AppsIcon })));
export const AppsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAppsIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowBackIconImport = () => import('./ArrowBackIcon');
const LazyArrowBackIcon = lazy(() => ArrowBackIconImport().then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowBackIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDownwardIconImport = () => import('./ArrowDownwardIcon');
const LazyArrowDownwardIcon = lazy(() => ArrowDownwardIconImport().then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDownwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDropDownIconImport = () => import('./ArrowDropDownIcon');
const LazyArrowDropDownIcon = lazy(() => ArrowDropDownIconImport().then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropDownIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDropUpIconImport = () => import('./ArrowDropUpIcon');
const LazyArrowDropUpIcon = lazy(() => ArrowDropUpIconImport().then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropUpIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowForwardIconImport = () => import('./ArrowForwardIcon');
const LazyArrowForwardIcon = lazy(() => ArrowForwardIconImport().then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowForwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowLeftIconImport = () => import('./ArrowLeftIcon');
const LazyArrowLeftIcon = lazy(() => ArrowLeftIconImport().then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowLeftIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowRightIconImport = () => import('./ArrowRightIcon');
const LazyArrowRightIcon = lazy(() => ArrowRightIconImport().then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowRightIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowUpwardIconImport = () => import('./ArrowUpwardIcon');
const LazyArrowUpwardIcon = lazy(() => ArrowUpwardIconImport().then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArrowUpwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArticleIconImport = () => import('./ArticleIcon');
const LazyArticleIcon = lazy(() => ArticleIconImport().then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyArticleIcon {...props} />
  </SuspenseWithTracking>
);

const AssignmentIconImport = () => import('./AssignmentIcon');
const LazyAssignmentIcon = lazy(() => AssignmentIconImport().then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAssignmentIcon {...props} />
  </SuspenseWithTracking>
);

const AttachFileIconImport = () => import('./AttachFileIcon');
const LazyAttachFileIcon = lazy(() => AttachFileIconImport().then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAttachFileIcon {...props} />
  </SuspenseWithTracking>
);

const AttachmentIconImport = () => import('./AttachmentIcon');
const LazyAttachmentIcon = lazy(() => AttachmentIconImport().then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAttachmentIcon {...props} />
  </SuspenseWithTracking>
);

const AutorenewIconImport = () => import('./AutorenewIcon');
const LazyAutorenewIcon = lazy(() => AutorenewIconImport().then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyAutorenewIcon {...props} />
  </SuspenseWithTracking>
);

const BadgeIconImport = () => import('./BadgeIcon');
const LazyBadgeIcon = lazy(() => BadgeIconImport().then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyBadgeIcon {...props} />
  </SuspenseWithTracking>
);

const BoltIconImport = () => import('./BoltIcon');
const LazyBoltIcon = lazy(() => BoltIconImport().then(module => ({ default: module.BoltIcon })));
export const BoltIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyBoltIcon {...props} />
  </SuspenseWithTracking>
);

const BubbleChartIconImport = () => import('./BubbleChartIcon');
const LazyBubbleChartIcon = lazy(() => BubbleChartIconImport().then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyBubbleChartIcon {...props} />
  </SuspenseWithTracking>
);

const BuildIconImport = () => import('./BuildIcon');
const LazyBuildIcon = lazy(() => BuildIconImport().then(module => ({ default: module.BuildIcon })));
export const BuildIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyBuildIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarMonthIconImport = () => import('./CalendarMonthIcon');
const LazyCalendarMonthIcon = lazy(() => CalendarMonthIconImport().then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarMonthIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarTodayIconImport = () => import('./CalendarTodayIcon');
const LazyCalendarTodayIcon = lazy(() => CalendarTodayIconImport().then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarTodayIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarViewWeekIconImport = () => import('./CalendarViewWeekIcon');
const LazyCalendarViewWeekIcon = lazy(() => CalendarViewWeekIconImport().then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarViewWeekIcon {...props} />
  </SuspenseWithTracking>
);

const CheckIconImport = () => import('./CheckIcon');
const LazyCheckIcon = lazy(() => CheckIconImport().then(module => ({ default: module.CheckIcon })));
export const CheckIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon {...props} />
  </SuspenseWithTracking>
);

const ChecklistIconImport = () => import('./ChecklistIcon');
const LazyChecklistIcon = lazy(() => ChecklistIconImport().then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyChecklistIcon {...props} />
  </SuspenseWithTracking>
);

const CloseIconImport = () => import('./CloseIcon');
const LazyCloseIcon = lazy(() => CloseIconImport().then(module => ({ default: module.CloseIcon })));
export const CloseIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon {...props} />
  </SuspenseWithTracking>
);

const CloudDownloadIconImport = () => import('./CloudDownloadIcon');
const LazyCloudDownloadIcon = lazy(() => CloudDownloadIconImport().then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCloudDownloadIcon {...props} />
  </SuspenseWithTracking>
);

const CloudUploadIconImport = () => import('./CloudUploadIcon');
const LazyCloudUploadIcon = lazy(() => CloudUploadIconImport().then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCloudUploadIcon {...props} />
  </SuspenseWithTracking>
);

const CodeIconImport = () => import('./CodeIcon');
const LazyCodeIcon = lazy(() => CodeIconImport().then(module => ({ default: module.CodeIcon })));
export const CodeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCodeIcon {...props} />
  </SuspenseWithTracking>
);

const CommentIconImport = () => import('./CommentIcon');
const LazyCommentIcon = lazy(() => CommentIconImport().then(module => ({ default: module.CommentIcon })));
export const CommentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyCommentIcon {...props} />
  </SuspenseWithTracking>
);

const ContactPhoneIconImport = () => import('./ContactPhoneIcon');
const LazyContactPhoneIcon = lazy(() => ContactPhoneIconImport().then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyContactPhoneIcon {...props} />
  </SuspenseWithTracking>
);

const ContactsIconImport = () => import('./ContactsIcon');
const LazyContactsIcon = lazy(() => ContactsIconImport().then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyContactsIcon {...props} />
  </SuspenseWithTracking>
);

const ContentCopyIconImport = () => import('./ContentCopyIcon');
const LazyContentCopyIcon = lazy(() => ContentCopyIconImport().then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyContentCopyIcon {...props} />
  </SuspenseWithTracking>
);

const DarkModeIconImport = () => import('./DarkModeIcon');
const LazyDarkModeIcon = lazy(() => DarkModeIconImport().then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDarkModeIcon {...props} />
  </SuspenseWithTracking>
);

const DashboardIconImport = () => import('./DashboardIcon');
const LazyDashboardIcon = lazy(() => DashboardIconImport().then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDashboardIcon {...props} />
  </SuspenseWithTracking>
);

const DeleteIconImport = () => import('./DeleteIcon');
const LazyDeleteIcon = lazy(() => DeleteIconImport().then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDeleteIcon {...props} />
  </SuspenseWithTracking>
);

const DemographyIconImport = () => import('./DemographyIcon');
const LazyDemographyIcon = lazy(() => DemographyIconImport().then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDemographyIcon {...props} />
  </SuspenseWithTracking>
);

const DescriptionIconImport = () => import('./DescriptionIcon');
const LazyDescriptionIcon = lazy(() => DescriptionIconImport().then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDescriptionIcon {...props} />
  </SuspenseWithTracking>
);

const DownloadIconImport = () => import('./DownloadIcon');
const LazyDownloadIcon = lazy(() => DownloadIconImport().then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDownloadIcon {...props} />
  </SuspenseWithTracking>
);

const DraftIconImport = () => import('./DraftIcon');
const LazyDraftIcon = lazy(() => DraftIconImport().then(module => ({ default: module.DraftIcon })));
export const DraftIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDraftIcon {...props} />
  </SuspenseWithTracking>
);

const DragIndicatorIconImport = () => import('./DragIndicatorIcon');
const LazyDragIndicatorIcon = lazy(() => DragIndicatorIconImport().then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyDragIndicatorIcon {...props} />
  </SuspenseWithTracking>
);

const EditIconImport = () => import('./EditIcon');
const LazyEditIcon = lazy(() => EditIconImport().then(module => ({ default: module.EditIcon })));
export const EditIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyEditIcon {...props} />
  </SuspenseWithTracking>
);

const EditNoteIconImport = () => import('./EditNoteIcon');
const LazyEditNoteIcon = lazy(() => EditNoteIconImport().then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyEditNoteIcon {...props} />
  </SuspenseWithTracking>
);

const ErrorIconImport = () => import('./ErrorIcon');
const LazyErrorIcon = lazy(() => ErrorIconImport().then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyErrorIcon {...props} />
  </SuspenseWithTracking>
);

const EventIconImport = () => import('./EventIcon');
const LazyEventIcon = lazy(() => EventIconImport().then(module => ({ default: module.EventIcon })));
export const EventIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyEventIcon {...props} />
  </SuspenseWithTracking>
);

const ExpandLessIconImport = () => import('./ExpandLessIcon');
const LazyExpandLessIcon = lazy(() => ExpandLessIconImport().then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyExpandLessIcon {...props} />
  </SuspenseWithTracking>
);

const ExpandMoreIconImport = () => import('./ExpandMoreIcon');
const LazyExpandMoreIcon = lazy(() => ExpandMoreIconImport().then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyExpandMoreIcon {...props} />
  </SuspenseWithTracking>
);

const ExtensionIconImport = () => import('./ExtensionIcon');
const LazyExtensionIcon = lazy(() => ExtensionIconImport().then(module => ({ default: module.ExtensionIcon })));
export const ExtensionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyExtensionIcon {...props} />
  </SuspenseWithTracking>
);

const FileOpenIconImport = () => import('./FileOpenIcon');
const LazyFileOpenIcon = lazy(() => FileOpenIconImport().then(module => ({ default: module.FileOpenIcon })));
export const FileOpenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFileOpenIcon {...props} />
  </SuspenseWithTracking>
);

const FilterListIconImport = () => import('./FilterListIcon');
const LazyFilterListIcon = lazy(() => FilterListIconImport().then(module => ({ default: module.FilterListIcon })));
export const FilterListIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFilterListIcon {...props} />
  </SuspenseWithTracking>
);

const FolderIconImport = () => import('./FolderIcon');
const LazyFolderIcon = lazy(() => FolderIconImport().then(module => ({ default: module.FolderIcon })));
export const FolderIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFolderIcon {...props} />
  </SuspenseWithTracking>
);

const FolderManagedIconImport = () => import('./FolderManagedIcon');
const LazyFolderManagedIcon = lazy(() => FolderManagedIconImport().then(module => ({ default: module.FolderManagedIcon })));
export const FolderManagedIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFolderManagedIcon {...props} />
  </SuspenseWithTracking>
);

const FolderOpenIconImport = () => import('./FolderOpenIcon');
const LazyFolderOpenIcon = lazy(() => FolderOpenIconImport().then(module => ({ default: module.FolderOpenIcon })));
export const FolderOpenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFolderOpenIcon {...props} />
  </SuspenseWithTracking>
);

const ForwardIconImport = () => import('./ForwardIcon');
const LazyForwardIcon = lazy(() => ForwardIconImport().then(module => ({ default: module.ForwardIcon })));
export const ForwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyForwardIcon {...props} />
  </SuspenseWithTracking>
);

const FullscreenExitIconImport = () => import('./FullscreenExitIcon');
const LazyFullscreenExitIcon = lazy(() => FullscreenExitIconImport().then(module => ({ default: module.FullscreenExitIcon })));
export const FullscreenExitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenExitIcon {...props} />
  </SuspenseWithTracking>
);

const FullscreenIconImport = () => import('./FullscreenIcon');
const LazyFullscreenIcon = lazy(() => FullscreenIconImport().then(module => ({ default: module.FullscreenIcon })));
export const FullscreenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenIcon {...props} />
  </SuspenseWithTracking>
);

const GlobeIconImport = () => import('./GlobeIcon');
const LazyGlobeIcon = lazy(() => GlobeIconImport().then(module => ({ default: module.GlobeIcon })));
export const GlobeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyGlobeIcon {...props} />
  </SuspenseWithTracking>
);

const GroupAddIconImport = () => import('./GroupAddIcon');
const LazyGroupAddIcon = lazy(() => GroupAddIconImport().then(module => ({ default: module.GroupAddIcon })));
export const GroupAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyGroupAddIcon {...props} />
  </SuspenseWithTracking>
);

const GroupIconImport = () => import('./GroupIcon');
const LazyGroupIcon = lazy(() => GroupIconImport().then(module => ({ default: module.GroupIcon })));
export const GroupIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyGroupIcon {...props} />
  </SuspenseWithTracking>
);

const GroupsIconImport = () => import('./GroupsIcon');
const LazyGroupsIcon = lazy(() => GroupsIconImport().then(module => ({ default: module.GroupsIcon })));
export const GroupsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyGroupsIcon {...props} />
  </SuspenseWithTracking>
);

const HardDriveIconImport = () => import('./HardDriveIcon');
const LazyHardDriveIcon = lazy(() => HardDriveIconImport().then(module => ({ default: module.HardDriveIcon })));
export const HardDriveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHardDriveIcon {...props} />
  </SuspenseWithTracking>
);

const HelpIconImport = () => import('./HelpIcon');
const LazyHelpIcon = lazy(() => HelpIconImport().then(module => ({ default: module.HelpIcon })));
export const HelpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHelpIcon {...props} />
  </SuspenseWithTracking>
);

const HistoryIconImport = () => import('./HistoryIcon');
const LazyHistoryIcon = lazy(() => HistoryIconImport().then(module => ({ default: module.HistoryIcon })));
export const HistoryIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHistoryIcon {...props} />
  </SuspenseWithTracking>
);

const HomeIconImport = () => import('./HomeIcon');
const LazyHomeIcon = lazy(() => HomeIconImport().then(module => ({ default: module.HomeIcon })));
export const HomeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHomeIcon {...props} />
  </SuspenseWithTracking>
);

const HomeStorageIconImport = () => import('./HomeStorageIcon');
const LazyHomeStorageIcon = lazy(() => HomeStorageIconImport().then(module => ({ default: module.HomeStorageIcon })));
export const HomeStorageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyHomeStorageIcon {...props} />
  </SuspenseWithTracking>
);

const InfoIconImport = () => import('./InfoIcon');
const LazyInfoIcon = lazy(() => InfoIconImport().then(module => ({ default: module.InfoIcon })));
export const InfoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyInfoIcon {...props} />
  </SuspenseWithTracking>
);

const InvertColorsIconImport = () => import('./InvertColorsIcon');
const LazyInvertColorsIcon = lazy(() => InvertColorsIconImport().then(module => ({ default: module.InvertColorsIcon })));
export const InvertColorsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyInvertColorsIcon {...props} />
  </SuspenseWithTracking>
);

const LanguageIconImport = () => import('./LanguageIcon');
const LazyLanguageIcon = lazy(() => LanguageIconImport().then(module => ({ default: module.LanguageIcon })));
export const LanguageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLanguageIcon {...props} />
  </SuspenseWithTracking>
);

const LeaderboardIconImport = () => import('./LeaderboardIcon');
const LazyLeaderboardIcon = lazy(() => LeaderboardIconImport().then(module => ({ default: module.LeaderboardIcon })));
export const LeaderboardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLeaderboardIcon {...props} />
  </SuspenseWithTracking>
);

const LibraryBooksIconImport = () => import('./LibraryBooksIcon');
const LazyLibraryBooksIcon = lazy(() => LibraryBooksIconImport().then(module => ({ default: module.LibraryBooksIcon })));
export const LibraryBooksIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLibraryBooksIcon {...props} />
  </SuspenseWithTracking>
);

const LightModeIconImport = () => import('./LightModeIcon');
const LazyLightModeIcon = lazy(() => LightModeIconImport().then(module => ({ default: module.LightModeIcon })));
export const LightModeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLightModeIcon {...props} />
  </SuspenseWithTracking>
);

const LinkIconImport = () => import('./LinkIcon');
const LazyLinkIcon = lazy(() => LinkIconImport().then(module => ({ default: module.LinkIcon })));
export const LinkIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLinkIcon {...props} />
  </SuspenseWithTracking>
);

const ListIconImport = () => import('./ListIcon');
const LazyListIcon = lazy(() => ListIconImport().then(module => ({ default: module.ListIcon })));
export const ListIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyListIcon {...props} />
  </SuspenseWithTracking>
);

const LoadingIconImport = () => import('./LoadingIcon');
const LazyLoadingIcon = lazy(() => LoadingIconImport().then(module => ({ default: module.LoadingIcon })));
export const LoadingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLoadingIcon {...props} />
  </SuspenseWithTracking>
);

const LocationCityIconImport = () => import('./LocationCityIcon');
const LazyLocationCityIcon = lazy(() => LocationCityIconImport().then(module => ({ default: module.LocationCityIcon })));
export const LocationCityIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLocationCityIcon {...props} />
  </SuspenseWithTracking>
);

const LocationOnIconImport = () => import('./LocationOnIcon');
const LazyLocationOnIcon = lazy(() => LocationOnIconImport().then(module => ({ default: module.LocationOnIcon })));
export const LocationOnIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLocationOnIcon {...props} />
  </SuspenseWithTracking>
);

const LockIconImport = () => import('./LockIcon');
const LazyLockIcon = lazy(() => LockIconImport().then(module => ({ default: module.LockIcon })));
export const LockIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLockIcon {...props} />
  </SuspenseWithTracking>
);

const LockPersonIconImport = () => import('./LockPersonIcon');
const LazyLockPersonIcon = lazy(() => LockPersonIconImport().then(module => ({ default: module.LockPersonIcon })));
export const LockPersonIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLockPersonIcon {...props} />
  </SuspenseWithTracking>
);

const LoginIconImport = () => import('./LoginIcon');
const LazyLoginIcon = lazy(() => LoginIconImport().then(module => ({ default: module.LoginIcon })));
export const LoginIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLoginIcon {...props} />
  </SuspenseWithTracking>
);

const LogoutIconImport = () => import('./LogoutIcon');
const LazyLogoutIcon = lazy(() => LogoutIconImport().then(module => ({ default: module.LogoutIcon })));
export const LogoutIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyLogoutIcon {...props} />
  </SuspenseWithTracking>
);

const MailIconImport = () => import('./MailIcon');
const LazyMailIcon = lazy(() => MailIconImport().then(module => ({ default: module.MailIcon })));
export const MailIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMailIcon {...props} />
  </SuspenseWithTracking>
);

const ManageAccountsIconImport = () => import('./ManageAccountsIcon');
const LazyManageAccountsIcon = lazy(() => ManageAccountsIconImport().then(module => ({ default: module.ManageAccountsIcon })));
export const ManageAccountsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyManageAccountsIcon {...props} />
  </SuspenseWithTracking>
);

const ManageSearchIconImport = () => import('./ManageSearchIcon');
const LazyManageSearchIcon = lazy(() => ManageSearchIconImport().then(module => ({ default: module.ManageSearchIcon })));
export const ManageSearchIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyManageSearchIcon {...props} />
  </SuspenseWithTracking>
);

const ManufacturingIconImport = () => import('./ManufacturingIcon');
const LazyManufacturingIcon = lazy(() => ManufacturingIconImport().then(module => ({ default: module.ManufacturingIcon })));
export const ManufacturingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyManufacturingIcon {...props} />
  </SuspenseWithTracking>
);

const MenuBookIconImport = () => import('./MenuBookIcon');
const LazyMenuBookIcon = lazy(() => MenuBookIconImport().then(module => ({ default: module.MenuBookIcon })));
export const MenuBookIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMenuBookIcon {...props} />
  </SuspenseWithTracking>
);

const MenuIconImport = () => import('./MenuIcon');
const LazyMenuIcon = lazy(() => MenuIconImport().then(module => ({ default: module.MenuIcon })));
export const MenuIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMenuIcon {...props} />
  </SuspenseWithTracking>
);

const MoreTimeIconImport = () => import('./MoreTimeIcon');
const LazyMoreTimeIcon = lazy(() => MoreTimeIconImport().then(module => ({ default: module.MoreTimeIcon })));
export const MoreTimeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyMoreTimeIcon {...props} />
  </SuspenseWithTracking>
);

const NavigateBeforeIconImport = () => import('./NavigateBeforeIcon');
const LazyNavigateBeforeIcon = lazy(() => NavigateBeforeIconImport().then(module => ({ default: module.NavigateBeforeIcon })));
export const NavigateBeforeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateBeforeIcon {...props} />
  </SuspenseWithTracking>
);

const NavigateNextIconImport = () => import('./NavigateNextIcon');
const LazyNavigateNextIcon = lazy(() => NavigateNextIconImport().then(module => ({ default: module.NavigateNextIcon })));
export const NavigateNextIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateNextIcon {...props} />
  </SuspenseWithTracking>
);

const NewReleasesIconImport = () => import('./NewReleasesIcon');
const LazyNewReleasesIcon = lazy(() => NewReleasesIconImport().then(module => ({ default: module.NewReleasesIcon })));
export const NewReleasesIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNewReleasesIcon {...props} />
  </SuspenseWithTracking>
);

const NoteAddIconImport = () => import('./NoteAddIcon');
const LazyNoteAddIcon = lazy(() => NoteAddIconImport().then(module => ({ default: module.NoteAddIcon })));
export const NoteAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNoteAddIcon {...props} />
  </SuspenseWithTracking>
);

const NoteIconImport = () => import('./NoteIcon');
const LazyNoteIcon = lazy(() => NoteIconImport().then(module => ({ default: module.NoteIcon })));
export const NoteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNoteIcon {...props} />
  </SuspenseWithTracking>
);

const NotificationsActiveIconImport = () => import('./NotificationsActiveIcon');
const LazyNotificationsActiveIcon = lazy(() => NotificationsActiveIconImport().then(module => ({ default: module.NotificationsActiveIcon })));
export const NotificationsActiveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationsActiveIcon {...props} />
  </SuspenseWithTracking>
);

const OpenInNewIconImport = () => import('./OpenInNewIcon');
const LazyOpenInNewIcon = lazy(() => OpenInNewIconImport().then(module => ({ default: module.OpenInNewIcon })));
export const OpenInNewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyOpenInNewIcon {...props} />
  </SuspenseWithTracking>
);

const PageInfoIconImport = () => import('./PageInfoIcon');
const LazyPageInfoIcon = lazy(() => PageInfoIconImport().then(module => ({ default: module.PageInfoIcon })));
export const PageInfoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPageInfoIcon {...props} />
  </SuspenseWithTracking>
);

const PaletteIconImport = () => import('./PaletteIcon');
const LazyPaletteIcon = lazy(() => PaletteIconImport().then(module => ({ default: module.PaletteIcon })));
export const PaletteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPaletteIcon {...props} />
  </SuspenseWithTracking>
);

const PendingActionsIconImport = () => import('./PendingActionsIcon');
const LazyPendingActionsIcon = lazy(() => PendingActionsIconImport().then(module => ({ default: module.PendingActionsIcon })));
export const PendingActionsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPendingActionsIcon {...props} />
  </SuspenseWithTracking>
);

const PendingIconImport = () => import('./PendingIcon');
const LazyPendingIcon = lazy(() => PendingIconImport().then(module => ({ default: module.PendingIcon })));
export const PendingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPendingIcon {...props} />
  </SuspenseWithTracking>
);

const PersonIconImport = () => import('./PersonIcon');
const LazyPersonIcon = lazy(() => PersonIconImport().then(module => ({ default: module.PersonIcon })));
export const PersonIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPersonIcon {...props} />
  </SuspenseWithTracking>
);

const PhotoLibraryIconImport = () => import('./PhotoLibraryIcon');
const LazyPhotoLibraryIcon = lazy(() => PhotoLibraryIconImport().then(module => ({ default: module.PhotoLibraryIcon })));
export const PhotoLibraryIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPhotoLibraryIcon {...props} />
  </SuspenseWithTracking>
);

const PictureAsPdfIconImport = () => import('./PictureAsPdfIcon');
const LazyPictureAsPdfIcon = lazy(() => PictureAsPdfIconImport().then(module => ({ default: module.PictureAsPdfIcon })));
export const PictureAsPdfIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPictureAsPdfIcon {...props} />
  </SuspenseWithTracking>
);

const PlayArrowIconImport = () => import('./PlayArrowIcon');
const LazyPlayArrowIcon = lazy(() => PlayArrowIconImport().then(module => ({ default: module.PlayArrowIcon })));
export const PlayArrowIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPlayArrowIcon {...props} />
  </SuspenseWithTracking>
);

const PlayCircleIconImport = () => import('./PlayCircleIcon');
const LazyPlayCircleIcon = lazy(() => PlayCircleIconImport().then(module => ({ default: module.PlayCircleIcon })));
export const PlayCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPlayCircleIcon {...props} />
  </SuspenseWithTracking>
);

const PostAddIconImport = () => import('./PostAddIcon');
const LazyPostAddIcon = lazy(() => PostAddIconImport().then(module => ({ default: module.PostAddIcon })));
export const PostAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPostAddIcon {...props} />
  </SuspenseWithTracking>
);

const PreviewIconImport = () => import('./PreviewIcon');
const LazyPreviewIcon = lazy(() => PreviewIconImport().then(module => ({ default: module.PreviewIcon })));
export const PreviewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPreviewIcon {...props} />
  </SuspenseWithTracking>
);

const PublicIconImport = () => import('./PublicIcon');
const LazyPublicIcon = lazy(() => PublicIconImport().then(module => ({ default: module.PublicIcon })));
export const PublicIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPublicIcon {...props} />
  </SuspenseWithTracking>
);

const PublishIconImport = () => import('./PublishIcon');
const LazyPublishIcon = lazy(() => PublishIconImport().then(module => ({ default: module.PublishIcon })));
export const PublishIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyPublishIcon {...props} />
  </SuspenseWithTracking>
);

const RedoIconImport = () => import('./RedoIcon');
const LazyRedoIcon = lazy(() => RedoIconImport().then(module => ({ default: module.RedoIcon })));
export const RedoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyRedoIcon {...props} />
  </SuspenseWithTracking>
);

const RefreshIconImport = () => import('./RefreshIcon');
const LazyRefreshIcon = lazy(() => RefreshIconImport().then(module => ({ default: module.RefreshIcon })));
export const RefreshIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyRefreshIcon {...props} />
  </SuspenseWithTracking>
);

const ReplyAllIconImport = () => import('./ReplyAllIcon');
const LazyReplyAllIcon = lazy(() => ReplyAllIconImport().then(module => ({ default: module.ReplyAllIcon })));
export const ReplyAllIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyReplyAllIcon {...props} />
  </SuspenseWithTracking>
);

const ReplyIconImport = () => import('./ReplyIcon');
const LazyReplyIcon = lazy(() => ReplyIconImport().then(module => ({ default: module.ReplyIcon })));
export const ReplyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyReplyIcon {...props} />
  </SuspenseWithTracking>
);

const SaveIconImport = () => import('./SaveIcon');
const LazySaveIcon = lazy(() => SaveIconImport().then(module => ({ default: module.SaveIcon })));
export const SaveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySaveIcon {...props} />
  </SuspenseWithTracking>
);

const ScheduleIconImport = () => import('./ScheduleIcon');
const LazyScheduleIcon = lazy(() => ScheduleIconImport().then(module => ({ default: module.ScheduleIcon })));
export const ScheduleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyScheduleIcon {...props} />
  </SuspenseWithTracking>
);

const SchoolIconImport = () => import('./SchoolIcon');
const LazySchoolIcon = lazy(() => SchoolIconImport().then(module => ({ default: module.SchoolIcon })));
export const SchoolIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySchoolIcon {...props} />
  </SuspenseWithTracking>
);

const SearchIconImport = () => import('./SearchIcon');
const LazySearchIcon = lazy(() => SearchIconImport().then(module => ({ default: module.SearchIcon })));
export const SearchIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySearchIcon {...props} />
  </SuspenseWithTracking>
);

const SendIconImport = () => import('./SendIcon');
const LazySendIcon = lazy(() => SendIconImport().then(module => ({ default: module.SendIcon })));
export const SendIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySendIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsAlertIconImport = () => import('./SettingsAlertIcon');
const LazySettingsAlertIcon = lazy(() => SettingsAlertIconImport().then(module => ({ default: module.SettingsAlertIcon })));
export const SettingsAlertIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySettingsAlertIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsIconImport = () => import('./SettingsIcon');
const LazySettingsIcon = lazy(() => SettingsIconImport().then(module => ({ default: module.SettingsIcon })));
export const SettingsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySettingsIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsSuggestIconImport = () => import('./SettingsSuggestIcon');
const LazySettingsSuggestIcon = lazy(() => SettingsSuggestIconImport().then(module => ({ default: module.SettingsSuggestIcon })));
export const SettingsSuggestIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySettingsSuggestIcon {...props} />
  </SuspenseWithTracking>
);

const ShareIconImport = () => import('./ShareIcon');
const LazyShareIcon = lazy(() => ShareIconImport().then(module => ({ default: module.ShareIcon })));
export const ShareIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyShareIcon {...props} />
  </SuspenseWithTracking>
);

const SideNavigationIconImport = () => import('./SideNavigationIcon');
const LazySideNavigationIcon = lazy(() => SideNavigationIconImport().then(module => ({ default: module.SideNavigationIcon })));
export const SideNavigationIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySideNavigationIcon {...props} />
  </SuspenseWithTracking>
);

const SpeedIconImport = () => import('./SpeedIcon');
const LazySpeedIcon = lazy(() => SpeedIconImport().then(module => ({ default: module.SpeedIcon })));
export const SpeedIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySpeedIcon {...props} />
  </SuspenseWithTracking>
);

const StopCircleIconImport = () => import('./StopCircleIcon');
const LazyStopCircleIcon = lazy(() => StopCircleIconImport().then(module => ({ default: module.StopCircleIcon })));
export const StopCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyStopCircleIcon {...props} />
  </SuspenseWithTracking>
);

const StorageIconImport = () => import('./StorageIcon');
const LazyStorageIcon = lazy(() => StorageIconImport().then(module => ({ default: module.StorageIcon })));
export const StorageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyStorageIcon {...props} />
  </SuspenseWithTracking>
);

const SupportAgentIconImport = () => import('./SupportAgentIcon');
const LazySupportAgentIcon = lazy(() => SupportAgentIconImport().then(module => ({ default: module.SupportAgentIcon })));
export const SupportAgentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySupportAgentIcon {...props} />
  </SuspenseWithTracking>
);

const SyncIconImport = () => import('./SyncIcon');
const LazySyncIcon = lazy(() => SyncIconImport().then(module => ({ default: module.SyncIcon })));
export const SyncIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazySyncIcon {...props} />
  </SuspenseWithTracking>
);

const TaskIconImport = () => import('./TaskIcon');
const LazyTaskIcon = lazy(() => TaskIconImport().then(module => ({ default: module.TaskIcon })));
export const TaskIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyTaskIcon {...props} />
  </SuspenseWithTracking>
);

const TimerIconImport = () => import('./TimerIcon');
const LazyTimerIcon = lazy(() => TimerIconImport().then(module => ({ default: module.TimerIcon })));
export const TimerIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyTimerIcon {...props} />
  </SuspenseWithTracking>
);

const TrendingUpIconImport = () => import('./TrendingUpIcon');
const LazyTrendingUpIcon = lazy(() => TrendingUpIconImport().then(module => ({ default: module.TrendingUpIcon })));
export const TrendingUpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyTrendingUpIcon {...props} />
  </SuspenseWithTracking>
);

const TrophyIconImport = () => import('./TrophyIcon');
const LazyTrophyIcon = lazy(() => TrophyIconImport().then(module => ({ default: module.TrophyIcon })));
export const TrophyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyTrophyIcon {...props} />
  </SuspenseWithTracking>
);

const UndoIconImport = () => import('./UndoIcon');
const LazyUndoIcon = lazy(() => UndoIconImport().then(module => ({ default: module.UndoIcon })));
export const UndoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUndoIcon {...props} />
  </SuspenseWithTracking>
);

const UpdateIconImport = () => import('./UpdateIcon');
const LazyUpdateIcon = lazy(() => UpdateIconImport().then(module => ({ default: module.UpdateIcon })));
export const UpdateIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyUpdateIcon {...props} />
  </SuspenseWithTracking>
);

const VerticalSplitIconImport = () => import('./VerticalSplitIcon');
const LazyVerticalSplitIcon = lazy(() => VerticalSplitIconImport().then(module => ({ default: module.VerticalSplitIcon })));
export const VerticalSplitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalSplitIcon {...props} />
  </SuspenseWithTracking>
);

const ViewCozyIconImport = () => import('./ViewCozyIcon');
const LazyViewCozyIcon = lazy(() => ViewCozyIconImport().then(module => ({ default: module.ViewCozyIcon })));
export const ViewCozyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyViewCozyIcon {...props} />
  </SuspenseWithTracking>
);

const ViewHeadlineIconImport = () => import('./ViewHeadlineIcon');
const LazyViewHeadlineIcon = lazy(() => ViewHeadlineIconImport().then(module => ({ default: module.ViewHeadlineIcon })));
export const ViewHeadlineIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyViewHeadlineIcon {...props} />
  </SuspenseWithTracking>
);

const ViewModuleIconImport = () => import('./ViewModuleIcon');
const LazyViewModuleIcon = lazy(() => ViewModuleIconImport().then(module => ({ default: module.ViewModuleIcon })));
export const ViewModuleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyViewModuleIcon {...props} />
  </SuspenseWithTracking>
);

const VisibilityIconImport = () => import('./VisibilityIcon');
const LazyVisibilityIcon = lazy(() => VisibilityIconImport().then(module => ({ default: module.VisibilityIcon })));
export const VisibilityIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityIcon {...props} />
  </SuspenseWithTracking>
);

const VisibilityOffIconImport = () => import('./VisibilityOffIcon');
const LazyVisibilityOffIcon = lazy(() => VisibilityOffIconImport().then(module => ({ default: module.VisibilityOffIcon })));
export const VisibilityOffIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityOffIcon {...props} />
  </SuspenseWithTracking>
);

const VoidIconImport = () => import('./VoidIcon');
const LazyVoidIcon = lazy(() => VoidIconImport().then(module => ({ default: module.VoidIcon })));
export const VoidIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyVoidIcon {...props} />
  </SuspenseWithTracking>
);

const WarningIconImport = () => import('./WarningIcon');
const LazyWarningIcon = lazy(() => WarningIconImport().then(module => ({ default: module.WarningIcon })));
export const WarningIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />}>
    <LazyWarningIcon {...props} />
  </SuspenseWithTracking>
);

export const preloadAtomsIconsGoogle = async () => {
  await AcUnitIconImport();
  await AccountCircleIconImport();
  await AcuteIconImport();
  await AddIconImport();
  await AddReactionIconImport();
  await AdminPanelSettingsIconImport();
  await AlarmIconImport();
  await AppsIconImport();
  await ArrowBackIconImport();
  await ArrowDownwardIconImport();
  await ArrowDropDownIconImport();
  await ArrowDropUpIconImport();
  await ArrowForwardIconImport();
  await ArrowLeftIconImport();
  await ArrowRightIconImport();
  await ArrowUpwardIconImport();
  await ArticleIconImport();
  await AssignmentIconImport();
  await AttachFileIconImport();
  await AttachmentIconImport();
  await AutorenewIconImport();
  await BadgeIconImport();
  await BoltIconImport();
  await BubbleChartIconImport();
  await BuildIconImport();
  await CalendarMonthIconImport();
  await CalendarTodayIconImport();
  await CalendarViewWeekIconImport();
  await CheckIconImport();
  await ChecklistIconImport();
  await CloseIconImport();
  await CloudDownloadIconImport();
  await CloudUploadIconImport();
  await CodeIconImport();
  await CommentIconImport();
  await ContactPhoneIconImport();
  await ContactsIconImport();
  await ContentCopyIconImport();
  await DarkModeIconImport();
  await DashboardIconImport();
  await DeleteIconImport();
  await DemographyIconImport();
  await DescriptionIconImport();
  await DownloadIconImport();
  await DraftIconImport();
  await DragIndicatorIconImport();
  await EditIconImport();
  await EditNoteIconImport();
  await ErrorIconImport();
  await EventIconImport();
  await ExpandLessIconImport();
  await ExpandMoreIconImport();
  await ExtensionIconImport();
  await FileOpenIconImport();
  await FilterListIconImport();
  await FolderIconImport();
  await FolderManagedIconImport();
  await FolderOpenIconImport();
  await ForwardIconImport();
  await FullscreenExitIconImport();
  await FullscreenIconImport();
  await GlobeIconImport();
  await GroupAddIconImport();
  await GroupIconImport();
  await GroupsIconImport();
  await HardDriveIconImport();
  await HelpIconImport();
  await HistoryIconImport();
  await HomeIconImport();
  await HomeStorageIconImport();
  await InfoIconImport();
  await InvertColorsIconImport();
  await LanguageIconImport();
  await LeaderboardIconImport();
  await LibraryBooksIconImport();
  await LightModeIconImport();
  await LinkIconImport();
  await ListIconImport();
  await LoadingIconImport();
  await LocationCityIconImport();
  await LocationOnIconImport();
  await LockIconImport();
  await LockPersonIconImport();
  await LoginIconImport();
  await LogoutIconImport();
  await MailIconImport();
  await ManageAccountsIconImport();
  await ManageSearchIconImport();
  await ManufacturingIconImport();
  await MenuBookIconImport();
  await MenuIconImport();
  await MoreTimeIconImport();
  await NavigateBeforeIconImport();
  await NavigateNextIconImport();
  await NewReleasesIconImport();
  await NoteAddIconImport();
  await NoteIconImport();
  await NotificationsActiveIconImport();
  await OpenInNewIconImport();
  await PageInfoIconImport();
  await PaletteIconImport();
  await PendingActionsIconImport();
  await PendingIconImport();
  await PersonIconImport();
  await PhotoLibraryIconImport();
  await PictureAsPdfIconImport();
  await PlayArrowIconImport();
  await PlayCircleIconImport();
  await PostAddIconImport();
  await PreviewIconImport();
  await PublicIconImport();
  await PublishIconImport();
  await RedoIconImport();
  await RefreshIconImport();
  await ReplyAllIconImport();
  await ReplyIconImport();
  await SaveIconImport();
  await ScheduleIconImport();
  await SchoolIconImport();
  await SearchIconImport();
  await SendIconImport();
  await SettingsAlertIconImport();
  await SettingsIconImport();
  await SettingsSuggestIconImport();
  await ShareIconImport();
  await SideNavigationIconImport();
  await SpeedIconImport();
  await StopCircleIconImport();
  await StorageIconImport();
  await SupportAgentIconImport();
  await SyncIconImport();
  await TaskIconImport();
  await TimerIconImport();
  await TrendingUpIconImport();
  await TrophyIconImport();
  await UndoIconImport();
  await UpdateIconImport();
  await VerticalSplitIconImport();
  await ViewCozyIconImport();
  await ViewHeadlineIconImport();
  await ViewModuleIconImport();
  await VisibilityIconImport();
  await VisibilityOffIconImport();
  await VoidIconImport();
  await WarningIconImport();
};
