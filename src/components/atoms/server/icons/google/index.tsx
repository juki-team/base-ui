import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { BasicIconProps } from '../types';

const AcUnitIconImport = () => import('./AcUnitIcon');
const LazyAcUnitIcon = lazy(() => AcUnitIconImport().then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AcUnitIcon">
    <LazyAcUnitIcon {...props} />
  </SuspenseWithTracking>
);

const AccountCircleIconImport = () => import('./AccountCircleIcon');
const LazyAccountCircleIcon = lazy(() => AccountCircleIconImport().then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AccountCircleIcon">
    <LazyAccountCircleIcon {...props} />
  </SuspenseWithTracking>
);

const AcuteIconImport = () => import('./AcuteIcon');
const LazyAcuteIcon = lazy(() => AcuteIconImport().then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AcuteIcon">
    <LazyAcuteIcon {...props} />
  </SuspenseWithTracking>
);

const AddIconImport = () => import('./AddIcon');
const LazyAddIcon = lazy(() => AddIconImport().then(module => ({ default: module.AddIcon })));
export const AddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AddIcon">
    <LazyAddIcon {...props} />
  </SuspenseWithTracking>
);

const AddReactionIconImport = () => import('./AddReactionIcon');
const LazyAddReactionIcon = lazy(() => AddReactionIconImport().then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AddReactionIcon">
    <LazyAddReactionIcon {...props} />
  </SuspenseWithTracking>
);

const AdminPanelSettingsIconImport = () => import('./AdminPanelSettingsIcon');
const LazyAdminPanelSettingsIcon = lazy(() => AdminPanelSettingsIconImport().then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AdminPanelSettingsIcon">
    <LazyAdminPanelSettingsIcon {...props} />
  </SuspenseWithTracking>
);

const AlarmIconImport = () => import('./AlarmIcon');
const LazyAlarmIcon = lazy(() => AlarmIconImport().then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AlarmIcon">
    <LazyAlarmIcon {...props} />
  </SuspenseWithTracking>
);

const AppsIconImport = () => import('./AppsIcon');
const LazyAppsIcon = lazy(() => AppsIconImport().then(module => ({ default: module.AppsIcon })));
export const AppsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AppsIcon">
    <LazyAppsIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowBackIconImport = () => import('./ArrowBackIcon');
const LazyArrowBackIcon = lazy(() => ArrowBackIconImport().then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowBackIcon">
    <LazyArrowBackIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDownwardIconImport = () => import('./ArrowDownwardIcon');
const LazyArrowDownwardIcon = lazy(() => ArrowDownwardIconImport().then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowDownwardIcon">
    <LazyArrowDownwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDropDownIconImport = () => import('./ArrowDropDownIcon');
const LazyArrowDropDownIcon = lazy(() => ArrowDropDownIconImport().then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowDropDownIcon">
    <LazyArrowDropDownIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowDropUpIconImport = () => import('./ArrowDropUpIcon');
const LazyArrowDropUpIcon = lazy(() => ArrowDropUpIconImport().then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowDropUpIcon">
    <LazyArrowDropUpIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowForwardIconImport = () => import('./ArrowForwardIcon');
const LazyArrowForwardIcon = lazy(() => ArrowForwardIconImport().then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowForwardIcon">
    <LazyArrowForwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowLeftIconImport = () => import('./ArrowLeftIcon');
const LazyArrowLeftIcon = lazy(() => ArrowLeftIconImport().then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowLeftIcon">
    <LazyArrowLeftIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowRightIconImport = () => import('./ArrowRightIcon');
const LazyArrowRightIcon = lazy(() => ArrowRightIconImport().then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowRightIcon">
    <LazyArrowRightIcon {...props} />
  </SuspenseWithTracking>
);

const ArrowUpwardIconImport = () => import('./ArrowUpwardIcon');
const LazyArrowUpwardIcon = lazy(() => ArrowUpwardIconImport().then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArrowUpwardIcon">
    <LazyArrowUpwardIcon {...props} />
  </SuspenseWithTracking>
);

const ArticleIconImport = () => import('./ArticleIcon');
const LazyArticleIcon = lazy(() => ArticleIconImport().then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ArticleIcon">
    <LazyArticleIcon {...props} />
  </SuspenseWithTracking>
);

const AssignmentIconImport = () => import('./AssignmentIcon');
const LazyAssignmentIcon = lazy(() => AssignmentIconImport().then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AssignmentIcon">
    <LazyAssignmentIcon {...props} />
  </SuspenseWithTracking>
);

const AttachFileIconImport = () => import('./AttachFileIcon');
const LazyAttachFileIcon = lazy(() => AttachFileIconImport().then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AttachFileIcon">
    <LazyAttachFileIcon {...props} />
  </SuspenseWithTracking>
);

const AttachmentIconImport = () => import('./AttachmentIcon');
const LazyAttachmentIcon = lazy(() => AttachmentIconImport().then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AttachmentIcon">
    <LazyAttachmentIcon {...props} />
  </SuspenseWithTracking>
);

const AutorenewIconImport = () => import('./AutorenewIcon');
const LazyAutorenewIcon = lazy(() => AutorenewIconImport().then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="AutorenewIcon">
    <LazyAutorenewIcon {...props} />
  </SuspenseWithTracking>
);

const BadgeIconImport = () => import('./BadgeIcon');
const LazyBadgeIcon = lazy(() => BadgeIconImport().then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="BadgeIcon">
    <LazyBadgeIcon {...props} />
  </SuspenseWithTracking>
);

const BoltIconImport = () => import('./BoltIcon');
const LazyBoltIcon = lazy(() => BoltIconImport().then(module => ({ default: module.BoltIcon })));
export const BoltIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="BoltIcon">
    <LazyBoltIcon {...props} />
  </SuspenseWithTracking>
);

const BubbleChartIconImport = () => import('./BubbleChartIcon');
const LazyBubbleChartIcon = lazy(() => BubbleChartIconImport().then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="BubbleChartIcon">
    <LazyBubbleChartIcon {...props} />
  </SuspenseWithTracking>
);

const BuildIconImport = () => import('./BuildIcon');
const LazyBuildIcon = lazy(() => BuildIconImport().then(module => ({ default: module.BuildIcon })));
export const BuildIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="BuildIcon">
    <LazyBuildIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarMonthIconImport = () => import('./CalendarMonthIcon');
const LazyCalendarMonthIcon = lazy(() => CalendarMonthIconImport().then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CalendarMonthIcon">
    <LazyCalendarMonthIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarTodayIconImport = () => import('./CalendarTodayIcon');
const LazyCalendarTodayIcon = lazy(() => CalendarTodayIconImport().then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CalendarTodayIcon">
    <LazyCalendarTodayIcon {...props} />
  </SuspenseWithTracking>
);

const CalendarViewWeekIconImport = () => import('./CalendarViewWeekIcon');
const LazyCalendarViewWeekIcon = lazy(() => CalendarViewWeekIconImport().then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CalendarViewWeekIcon">
    <LazyCalendarViewWeekIcon {...props} />
  </SuspenseWithTracking>
);

const CheckIconImport = () => import('./CheckIcon');
const LazyCheckIcon = lazy(() => CheckIconImport().then(module => ({ default: module.CheckIcon })));
export const CheckIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CheckIcon">
    <LazyCheckIcon {...props} />
  </SuspenseWithTracking>
);

const ChecklistIconImport = () => import('./ChecklistIcon');
const LazyChecklistIcon = lazy(() => ChecklistIconImport().then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ChecklistIcon">
    <LazyChecklistIcon {...props} />
  </SuspenseWithTracking>
);

const CloseIconImport = () => import('./CloseIcon');
const LazyCloseIcon = lazy(() => CloseIconImport().then(module => ({ default: module.CloseIcon })));
export const CloseIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CloseIcon">
    <LazyCloseIcon {...props} />
  </SuspenseWithTracking>
);

const CloudDownloadIconImport = () => import('./CloudDownloadIcon');
const LazyCloudDownloadIcon = lazy(() => CloudDownloadIconImport().then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CloudDownloadIcon">
    <LazyCloudDownloadIcon {...props} />
  </SuspenseWithTracking>
);

const CloudUploadIconImport = () => import('./CloudUploadIcon');
const LazyCloudUploadIcon = lazy(() => CloudUploadIconImport().then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CloudUploadIcon">
    <LazyCloudUploadIcon {...props} />
  </SuspenseWithTracking>
);

const CodeIconImport = () => import('./CodeIcon');
const LazyCodeIcon = lazy(() => CodeIconImport().then(module => ({ default: module.CodeIcon })));
export const CodeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CodeIcon">
    <LazyCodeIcon {...props} />
  </SuspenseWithTracking>
);

const CommentIconImport = () => import('./CommentIcon');
const LazyCommentIcon = lazy(() => CommentIconImport().then(module => ({ default: module.CommentIcon })));
export const CommentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CommentIcon">
    <LazyCommentIcon {...props} />
  </SuspenseWithTracking>
);

const ContactPhoneIconImport = () => import('./ContactPhoneIcon');
const LazyContactPhoneIcon = lazy(() => ContactPhoneIconImport().then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ContactPhoneIcon">
    <LazyContactPhoneIcon {...props} />
  </SuspenseWithTracking>
);

const ContactsIconImport = () => import('./ContactsIcon');
const LazyContactsIcon = lazy(() => ContactsIconImport().then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ContactsIcon">
    <LazyContactsIcon {...props} />
  </SuspenseWithTracking>
);

const ContentCopyIconImport = () => import('./ContentCopyIcon');
const LazyContentCopyIcon = lazy(() => ContentCopyIconImport().then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ContentCopyIcon">
    <LazyContentCopyIcon {...props} />
  </SuspenseWithTracking>
);

const DarkModeIconImport = () => import('./DarkModeIcon');
const LazyDarkModeIcon = lazy(() => DarkModeIconImport().then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DarkModeIcon">
    <LazyDarkModeIcon {...props} />
  </SuspenseWithTracking>
);

const DashboardIconImport = () => import('./DashboardIcon');
const LazyDashboardIcon = lazy(() => DashboardIconImport().then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DashboardIcon">
    <LazyDashboardIcon {...props} />
  </SuspenseWithTracking>
);

const DeleteIconImport = () => import('./DeleteIcon');
const LazyDeleteIcon = lazy(() => DeleteIconImport().then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DeleteIcon">
    <LazyDeleteIcon {...props} />
  </SuspenseWithTracking>
);

const DemographyIconImport = () => import('./DemographyIcon');
const LazyDemographyIcon = lazy(() => DemographyIconImport().then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DemographyIcon">
    <LazyDemographyIcon {...props} />
  </SuspenseWithTracking>
);

const DescriptionIconImport = () => import('./DescriptionIcon');
const LazyDescriptionIcon = lazy(() => DescriptionIconImport().then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DescriptionIcon">
    <LazyDescriptionIcon {...props} />
  </SuspenseWithTracking>
);

const DownloadIconImport = () => import('./DownloadIcon');
const LazyDownloadIcon = lazy(() => DownloadIconImport().then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DownloadIcon">
    <LazyDownloadIcon {...props} />
  </SuspenseWithTracking>
);

const DraftIconImport = () => import('./DraftIcon');
const LazyDraftIcon = lazy(() => DraftIconImport().then(module => ({ default: module.DraftIcon })));
export const DraftIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DraftIcon">
    <LazyDraftIcon {...props} />
  </SuspenseWithTracking>
);

const DragIndicatorIconImport = () => import('./DragIndicatorIcon');
const LazyDragIndicatorIcon = lazy(() => DragIndicatorIconImport().then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DragIndicatorIcon">
    <LazyDragIndicatorIcon {...props} />
  </SuspenseWithTracking>
);

const EditIconImport = () => import('./EditIcon');
const LazyEditIcon = lazy(() => EditIconImport().then(module => ({ default: module.EditIcon })));
export const EditIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="EditIcon">
    <LazyEditIcon {...props} />
  </SuspenseWithTracking>
);

const EditNoteIconImport = () => import('./EditNoteIcon');
const LazyEditNoteIcon = lazy(() => EditNoteIconImport().then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="EditNoteIcon">
    <LazyEditNoteIcon {...props} />
  </SuspenseWithTracking>
);

const ErrorIconImport = () => import('./ErrorIcon');
const LazyErrorIcon = lazy(() => ErrorIconImport().then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ErrorIcon">
    <LazyErrorIcon {...props} />
  </SuspenseWithTracking>
);

const EventIconImport = () => import('./EventIcon');
const LazyEventIcon = lazy(() => EventIconImport().then(module => ({ default: module.EventIcon })));
export const EventIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="EventIcon">
    <LazyEventIcon {...props} />
  </SuspenseWithTracking>
);

const ExpandLessIconImport = () => import('./ExpandLessIcon');
const LazyExpandLessIcon = lazy(() => ExpandLessIconImport().then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ExpandLessIcon">
    <LazyExpandLessIcon {...props} />
  </SuspenseWithTracking>
);

const ExpandMoreIconImport = () => import('./ExpandMoreIcon');
const LazyExpandMoreIcon = lazy(() => ExpandMoreIconImport().then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ExpandMoreIcon">
    <LazyExpandMoreIcon {...props} />
  </SuspenseWithTracking>
);

const ExtensionIconImport = () => import('./ExtensionIcon');
const LazyExtensionIcon = lazy(() => ExtensionIconImport().then(module => ({ default: module.ExtensionIcon })));
export const ExtensionIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ExtensionIcon">
    <LazyExtensionIcon {...props} />
  </SuspenseWithTracking>
);

const FileOpenIconImport = () => import('./FileOpenIcon');
const LazyFileOpenIcon = lazy(() => FileOpenIconImport().then(module => ({ default: module.FileOpenIcon })));
export const FileOpenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FileOpenIcon">
    <LazyFileOpenIcon {...props} />
  </SuspenseWithTracking>
);

const FilterListIconImport = () => import('./FilterListIcon');
const LazyFilterListIcon = lazy(() => FilterListIconImport().then(module => ({ default: module.FilterListIcon })));
export const FilterListIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FilterListIcon">
    <LazyFilterListIcon {...props} />
  </SuspenseWithTracking>
);

const FolderIconImport = () => import('./FolderIcon');
const LazyFolderIcon = lazy(() => FolderIconImport().then(module => ({ default: module.FolderIcon })));
export const FolderIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FolderIcon">
    <LazyFolderIcon {...props} />
  </SuspenseWithTracking>
);

const FolderManagedIconImport = () => import('./FolderManagedIcon');
const LazyFolderManagedIcon = lazy(() => FolderManagedIconImport().then(module => ({ default: module.FolderManagedIcon })));
export const FolderManagedIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FolderManagedIcon">
    <LazyFolderManagedIcon {...props} />
  </SuspenseWithTracking>
);

const FolderOpenIconImport = () => import('./FolderOpenIcon');
const LazyFolderOpenIcon = lazy(() => FolderOpenIconImport().then(module => ({ default: module.FolderOpenIcon })));
export const FolderOpenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FolderOpenIcon">
    <LazyFolderOpenIcon {...props} />
  </SuspenseWithTracking>
);

const ForwardIconImport = () => import('./ForwardIcon');
const LazyForwardIcon = lazy(() => ForwardIconImport().then(module => ({ default: module.ForwardIcon })));
export const ForwardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ForwardIcon">
    <LazyForwardIcon {...props} />
  </SuspenseWithTracking>
);

const FullscreenExitIconImport = () => import('./FullscreenExitIcon');
const LazyFullscreenExitIcon = lazy(() => FullscreenExitIconImport().then(module => ({ default: module.FullscreenExitIcon })));
export const FullscreenExitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FullscreenExitIcon">
    <LazyFullscreenExitIcon {...props} />
  </SuspenseWithTracking>
);

const FullscreenIconImport = () => import('./FullscreenIcon');
const LazyFullscreenIcon = lazy(() => FullscreenIconImport().then(module => ({ default: module.FullscreenIcon })));
export const FullscreenIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FullscreenIcon">
    <LazyFullscreenIcon {...props} />
  </SuspenseWithTracking>
);

const GlobeIconImport = () => import('./GlobeIcon');
const LazyGlobeIcon = lazy(() => GlobeIconImport().then(module => ({ default: module.GlobeIcon })));
export const GlobeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GlobeIcon">
    <LazyGlobeIcon {...props} />
  </SuspenseWithTracking>
);

const GroupAddIconImport = () => import('./GroupAddIcon');
const LazyGroupAddIcon = lazy(() => GroupAddIconImport().then(module => ({ default: module.GroupAddIcon })));
export const GroupAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GroupAddIcon">
    <LazyGroupAddIcon {...props} />
  </SuspenseWithTracking>
);

const GroupIconImport = () => import('./GroupIcon');
const LazyGroupIcon = lazy(() => GroupIconImport().then(module => ({ default: module.GroupIcon })));
export const GroupIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GroupIcon">
    <LazyGroupIcon {...props} />
  </SuspenseWithTracking>
);

const GroupsIconImport = () => import('./GroupsIcon');
const LazyGroupsIcon = lazy(() => GroupsIconImport().then(module => ({ default: module.GroupsIcon })));
export const GroupsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="GroupsIcon">
    <LazyGroupsIcon {...props} />
  </SuspenseWithTracking>
);

const HardDriveIconImport = () => import('./HardDriveIcon');
const LazyHardDriveIcon = lazy(() => HardDriveIconImport().then(module => ({ default: module.HardDriveIcon })));
export const HardDriveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HardDriveIcon">
    <LazyHardDriveIcon {...props} />
  </SuspenseWithTracking>
);

const HelpIconImport = () => import('./HelpIcon');
const LazyHelpIcon = lazy(() => HelpIconImport().then(module => ({ default: module.HelpIcon })));
export const HelpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HelpIcon">
    <LazyHelpIcon {...props} />
  </SuspenseWithTracking>
);

const HistoryIconImport = () => import('./HistoryIcon');
const LazyHistoryIcon = lazy(() => HistoryIconImport().then(module => ({ default: module.HistoryIcon })));
export const HistoryIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HistoryIcon">
    <LazyHistoryIcon {...props} />
  </SuspenseWithTracking>
);

const HomeIconImport = () => import('./HomeIcon');
const LazyHomeIcon = lazy(() => HomeIconImport().then(module => ({ default: module.HomeIcon })));
export const HomeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HomeIcon">
    <LazyHomeIcon {...props} />
  </SuspenseWithTracking>
);

const HomeStorageIconImport = () => import('./HomeStorageIcon');
const LazyHomeStorageIcon = lazy(() => HomeStorageIconImport().then(module => ({ default: module.HomeStorageIcon })));
export const HomeStorageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HomeStorageIcon">
    <LazyHomeStorageIcon {...props} />
  </SuspenseWithTracking>
);

const InfoIconImport = () => import('./InfoIcon');
const LazyInfoIcon = lazy(() => InfoIconImport().then(module => ({ default: module.InfoIcon })));
export const InfoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InfoIcon">
    <LazyInfoIcon {...props} />
  </SuspenseWithTracking>
);

const InvertColorsIconImport = () => import('./InvertColorsIcon');
const LazyInvertColorsIcon = lazy(() => InvertColorsIconImport().then(module => ({ default: module.InvertColorsIcon })));
export const InvertColorsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InvertColorsIcon">
    <LazyInvertColorsIcon {...props} />
  </SuspenseWithTracking>
);

const LanguageIconImport = () => import('./LanguageIcon');
const LazyLanguageIcon = lazy(() => LanguageIconImport().then(module => ({ default: module.LanguageIcon })));
export const LanguageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LanguageIcon">
    <LazyLanguageIcon {...props} />
  </SuspenseWithTracking>
);

const LeaderboardIconImport = () => import('./LeaderboardIcon');
const LazyLeaderboardIcon = lazy(() => LeaderboardIconImport().then(module => ({ default: module.LeaderboardIcon })));
export const LeaderboardIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LeaderboardIcon">
    <LazyLeaderboardIcon {...props} />
  </SuspenseWithTracking>
);

const LibraryBooksIconImport = () => import('./LibraryBooksIcon');
const LazyLibraryBooksIcon = lazy(() => LibraryBooksIconImport().then(module => ({ default: module.LibraryBooksIcon })));
export const LibraryBooksIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LibraryBooksIcon">
    <LazyLibraryBooksIcon {...props} />
  </SuspenseWithTracking>
);

const LightModeIconImport = () => import('./LightModeIcon');
const LazyLightModeIcon = lazy(() => LightModeIconImport().then(module => ({ default: module.LightModeIcon })));
export const LightModeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LightModeIcon">
    <LazyLightModeIcon {...props} />
  </SuspenseWithTracking>
);

const LinkIconImport = () => import('./LinkIcon');
const LazyLinkIcon = lazy(() => LinkIconImport().then(module => ({ default: module.LinkIcon })));
export const LinkIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LinkIcon">
    <LazyLinkIcon {...props} />
  </SuspenseWithTracking>
);

const ListIconImport = () => import('./ListIcon');
const LazyListIcon = lazy(() => ListIconImport().then(module => ({ default: module.ListIcon })));
export const ListIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ListIcon">
    <LazyListIcon {...props} />
  </SuspenseWithTracking>
);

const LoadingIconImport = () => import('./LoadingIcon');
const LazyLoadingIcon = lazy(() => LoadingIconImport().then(module => ({ default: module.LoadingIcon })));
export const LoadingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LoadingIcon">
    <LazyLoadingIcon {...props} />
  </SuspenseWithTracking>
);

const LocationCityIconImport = () => import('./LocationCityIcon');
const LazyLocationCityIcon = lazy(() => LocationCityIconImport().then(module => ({ default: module.LocationCityIcon })));
export const LocationCityIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LocationCityIcon">
    <LazyLocationCityIcon {...props} />
  </SuspenseWithTracking>
);

const LocationOnIconImport = () => import('./LocationOnIcon');
const LazyLocationOnIcon = lazy(() => LocationOnIconImport().then(module => ({ default: module.LocationOnIcon })));
export const LocationOnIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LocationOnIcon">
    <LazyLocationOnIcon {...props} />
  </SuspenseWithTracking>
);

const LockIconImport = () => import('./LockIcon');
const LazyLockIcon = lazy(() => LockIconImport().then(module => ({ default: module.LockIcon })));
export const LockIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LockIcon">
    <LazyLockIcon {...props} />
  </SuspenseWithTracking>
);

const LockPersonIconImport = () => import('./LockPersonIcon');
const LazyLockPersonIcon = lazy(() => LockPersonIconImport().then(module => ({ default: module.LockPersonIcon })));
export const LockPersonIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LockPersonIcon">
    <LazyLockPersonIcon {...props} />
  </SuspenseWithTracking>
);

const LoginIconImport = () => import('./LoginIcon');
const LazyLoginIcon = lazy(() => LoginIconImport().then(module => ({ default: module.LoginIcon })));
export const LoginIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LoginIcon">
    <LazyLoginIcon {...props} />
  </SuspenseWithTracking>
);

const LogoutIconImport = () => import('./LogoutIcon');
const LazyLogoutIcon = lazy(() => LogoutIconImport().then(module => ({ default: module.LogoutIcon })));
export const LogoutIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LogoutIcon">
    <LazyLogoutIcon {...props} />
  </SuspenseWithTracking>
);

const MailIconImport = () => import('./MailIcon');
const LazyMailIcon = lazy(() => MailIconImport().then(module => ({ default: module.MailIcon })));
export const MailIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MailIcon">
    <LazyMailIcon {...props} />
  </SuspenseWithTracking>
);

const ManageAccountsIconImport = () => import('./ManageAccountsIcon');
const LazyManageAccountsIcon = lazy(() => ManageAccountsIconImport().then(module => ({ default: module.ManageAccountsIcon })));
export const ManageAccountsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ManageAccountsIcon">
    <LazyManageAccountsIcon {...props} />
  </SuspenseWithTracking>
);

const ManageSearchIconImport = () => import('./ManageSearchIcon');
const LazyManageSearchIcon = lazy(() => ManageSearchIconImport().then(module => ({ default: module.ManageSearchIcon })));
export const ManageSearchIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ManageSearchIcon">
    <LazyManageSearchIcon {...props} />
  </SuspenseWithTracking>
);

const ManufacturingIconImport = () => import('./ManufacturingIcon');
const LazyManufacturingIcon = lazy(() => ManufacturingIconImport().then(module => ({ default: module.ManufacturingIcon })));
export const ManufacturingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ManufacturingIcon">
    <LazyManufacturingIcon {...props} />
  </SuspenseWithTracking>
);

const MenuBookIconImport = () => import('./MenuBookIcon');
const LazyMenuBookIcon = lazy(() => MenuBookIconImport().then(module => ({ default: module.MenuBookIcon })));
export const MenuBookIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MenuBookIcon">
    <LazyMenuBookIcon {...props} />
  </SuspenseWithTracking>
);

const MenuIconImport = () => import('./MenuIcon');
const LazyMenuIcon = lazy(() => MenuIconImport().then(module => ({ default: module.MenuIcon })));
export const MenuIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MenuIcon">
    <LazyMenuIcon {...props} />
  </SuspenseWithTracking>
);

const MoreTimeIconImport = () => import('./MoreTimeIcon');
const LazyMoreTimeIcon = lazy(() => MoreTimeIconImport().then(module => ({ default: module.MoreTimeIcon })));
export const MoreTimeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MoreTimeIcon">
    <LazyMoreTimeIcon {...props} />
  </SuspenseWithTracking>
);

const NavigateBeforeIconImport = () => import('./NavigateBeforeIcon');
const LazyNavigateBeforeIcon = lazy(() => NavigateBeforeIconImport().then(module => ({ default: module.NavigateBeforeIcon })));
export const NavigateBeforeIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NavigateBeforeIcon">
    <LazyNavigateBeforeIcon {...props} />
  </SuspenseWithTracking>
);

const NavigateNextIconImport = () => import('./NavigateNextIcon');
const LazyNavigateNextIcon = lazy(() => NavigateNextIconImport().then(module => ({ default: module.NavigateNextIcon })));
export const NavigateNextIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NavigateNextIcon">
    <LazyNavigateNextIcon {...props} />
  </SuspenseWithTracking>
);

const NewReleasesIconImport = () => import('./NewReleasesIcon');
const LazyNewReleasesIcon = lazy(() => NewReleasesIconImport().then(module => ({ default: module.NewReleasesIcon })));
export const NewReleasesIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NewReleasesIcon">
    <LazyNewReleasesIcon {...props} />
  </SuspenseWithTracking>
);

const NoteAddIconImport = () => import('./NoteAddIcon');
const LazyNoteAddIcon = lazy(() => NoteAddIconImport().then(module => ({ default: module.NoteAddIcon })));
export const NoteAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NoteAddIcon">
    <LazyNoteAddIcon {...props} />
  </SuspenseWithTracking>
);

const NoteIconImport = () => import('./NoteIcon');
const LazyNoteIcon = lazy(() => NoteIconImport().then(module => ({ default: module.NoteIcon })));
export const NoteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NoteIcon">
    <LazyNoteIcon {...props} />
  </SuspenseWithTracking>
);

const NotificationsActiveIconImport = () => import('./NotificationsActiveIcon');
const LazyNotificationsActiveIcon = lazy(() => NotificationsActiveIconImport().then(module => ({ default: module.NotificationsActiveIcon })));
export const NotificationsActiveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="NotificationsActiveIcon">
    <LazyNotificationsActiveIcon {...props} />
  </SuspenseWithTracking>
);

const OpenInNewIconImport = () => import('./OpenInNewIcon');
const LazyOpenInNewIcon = lazy(() => OpenInNewIconImport().then(module => ({ default: module.OpenInNewIcon })));
export const OpenInNewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="OpenInNewIcon">
    <LazyOpenInNewIcon {...props} />
  </SuspenseWithTracking>
);

const PageInfoIconImport = () => import('./PageInfoIcon');
const LazyPageInfoIcon = lazy(() => PageInfoIconImport().then(module => ({ default: module.PageInfoIcon })));
export const PageInfoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PageInfoIcon">
    <LazyPageInfoIcon {...props} />
  </SuspenseWithTracking>
);

const PaletteIconImport = () => import('./PaletteIcon');
const LazyPaletteIcon = lazy(() => PaletteIconImport().then(module => ({ default: module.PaletteIcon })));
export const PaletteIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PaletteIcon">
    <LazyPaletteIcon {...props} />
  </SuspenseWithTracking>
);

const PendingActionsIconImport = () => import('./PendingActionsIcon');
const LazyPendingActionsIcon = lazy(() => PendingActionsIconImport().then(module => ({ default: module.PendingActionsIcon })));
export const PendingActionsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PendingActionsIcon">
    <LazyPendingActionsIcon {...props} />
  </SuspenseWithTracking>
);

const PendingIconImport = () => import('./PendingIcon');
const LazyPendingIcon = lazy(() => PendingIconImport().then(module => ({ default: module.PendingIcon })));
export const PendingIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PendingIcon">
    <LazyPendingIcon {...props} />
  </SuspenseWithTracking>
);

const PersonIconImport = () => import('./PersonIcon');
const LazyPersonIcon = lazy(() => PersonIconImport().then(module => ({ default: module.PersonIcon })));
export const PersonIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PersonIcon">
    <LazyPersonIcon {...props} />
  </SuspenseWithTracking>
);

const PhotoLibraryIconImport = () => import('./PhotoLibraryIcon');
const LazyPhotoLibraryIcon = lazy(() => PhotoLibraryIconImport().then(module => ({ default: module.PhotoLibraryIcon })));
export const PhotoLibraryIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PhotoLibraryIcon">
    <LazyPhotoLibraryIcon {...props} />
  </SuspenseWithTracking>
);

const PictureAsPdfIconImport = () => import('./PictureAsPdfIcon');
const LazyPictureAsPdfIcon = lazy(() => PictureAsPdfIconImport().then(module => ({ default: module.PictureAsPdfIcon })));
export const PictureAsPdfIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PictureAsPdfIcon">
    <LazyPictureAsPdfIcon {...props} />
  </SuspenseWithTracking>
);

const PlayArrowIconImport = () => import('./PlayArrowIcon');
const LazyPlayArrowIcon = lazy(() => PlayArrowIconImport().then(module => ({ default: module.PlayArrowIcon })));
export const PlayArrowIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PlayArrowIcon">
    <LazyPlayArrowIcon {...props} />
  </SuspenseWithTracking>
);

const PlayCircleIconImport = () => import('./PlayCircleIcon');
const LazyPlayCircleIcon = lazy(() => PlayCircleIconImport().then(module => ({ default: module.PlayCircleIcon })));
export const PlayCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PlayCircleIcon">
    <LazyPlayCircleIcon {...props} />
  </SuspenseWithTracking>
);

const PostAddIconImport = () => import('./PostAddIcon');
const LazyPostAddIcon = lazy(() => PostAddIconImport().then(module => ({ default: module.PostAddIcon })));
export const PostAddIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PostAddIcon">
    <LazyPostAddIcon {...props} />
  </SuspenseWithTracking>
);

const PreviewIconImport = () => import('./PreviewIcon');
const LazyPreviewIcon = lazy(() => PreviewIconImport().then(module => ({ default: module.PreviewIcon })));
export const PreviewIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PreviewIcon">
    <LazyPreviewIcon {...props} />
  </SuspenseWithTracking>
);

const PublicIconImport = () => import('./PublicIcon');
const LazyPublicIcon = lazy(() => PublicIconImport().then(module => ({ default: module.PublicIcon })));
export const PublicIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PublicIcon">
    <LazyPublicIcon {...props} />
  </SuspenseWithTracking>
);

const PublishIconImport = () => import('./PublishIcon');
const LazyPublishIcon = lazy(() => PublishIconImport().then(module => ({ default: module.PublishIcon })));
export const PublishIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PublishIcon">
    <LazyPublishIcon {...props} />
  </SuspenseWithTracking>
);

const RedoIconImport = () => import('./RedoIcon');
const LazyRedoIcon = lazy(() => RedoIconImport().then(module => ({ default: module.RedoIcon })));
export const RedoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="RedoIcon">
    <LazyRedoIcon {...props} />
  </SuspenseWithTracking>
);

const RefreshIconImport = () => import('./RefreshIcon');
const LazyRefreshIcon = lazy(() => RefreshIconImport().then(module => ({ default: module.RefreshIcon })));
export const RefreshIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="RefreshIcon">
    <LazyRefreshIcon {...props} />
  </SuspenseWithTracking>
);

const ReplyAllIconImport = () => import('./ReplyAllIcon');
const LazyReplyAllIcon = lazy(() => ReplyAllIconImport().then(module => ({ default: module.ReplyAllIcon })));
export const ReplyAllIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ReplyAllIcon">
    <LazyReplyAllIcon {...props} />
  </SuspenseWithTracking>
);

const ReplyIconImport = () => import('./ReplyIcon');
const LazyReplyIcon = lazy(() => ReplyIconImport().then(module => ({ default: module.ReplyIcon })));
export const ReplyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ReplyIcon">
    <LazyReplyIcon {...props} />
  </SuspenseWithTracking>
);

const SaveIconImport = () => import('./SaveIcon');
const LazySaveIcon = lazy(() => SaveIconImport().then(module => ({ default: module.SaveIcon })));
export const SaveIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SaveIcon">
    <LazySaveIcon {...props} />
  </SuspenseWithTracking>
);

const ScheduleIconImport = () => import('./ScheduleIcon');
const LazyScheduleIcon = lazy(() => ScheduleIconImport().then(module => ({ default: module.ScheduleIcon })));
export const ScheduleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ScheduleIcon">
    <LazyScheduleIcon {...props} />
  </SuspenseWithTracking>
);

const SchoolIconImport = () => import('./SchoolIcon');
const LazySchoolIcon = lazy(() => SchoolIconImport().then(module => ({ default: module.SchoolIcon })));
export const SchoolIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SchoolIcon">
    <LazySchoolIcon {...props} />
  </SuspenseWithTracking>
);

const SearchIconImport = () => import('./SearchIcon');
const LazySearchIcon = lazy(() => SearchIconImport().then(module => ({ default: module.SearchIcon })));
export const SearchIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SearchIcon">
    <LazySearchIcon {...props} />
  </SuspenseWithTracking>
);

const SendIconImport = () => import('./SendIcon');
const LazySendIcon = lazy(() => SendIconImport().then(module => ({ default: module.SendIcon })));
export const SendIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SendIcon">
    <LazySendIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsAlertIconImport = () => import('./SettingsAlertIcon');
const LazySettingsAlertIcon = lazy(() => SettingsAlertIconImport().then(module => ({ default: module.SettingsAlertIcon })));
export const SettingsAlertIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SettingsAlertIcon">
    <LazySettingsAlertIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsIconImport = () => import('./SettingsIcon');
const LazySettingsIcon = lazy(() => SettingsIconImport().then(module => ({ default: module.SettingsIcon })));
export const SettingsIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SettingsIcon">
    <LazySettingsIcon {...props} />
  </SuspenseWithTracking>
);

const SettingsSuggestIconImport = () => import('./SettingsSuggestIcon');
const LazySettingsSuggestIcon = lazy(() => SettingsSuggestIconImport().then(module => ({ default: module.SettingsSuggestIcon })));
export const SettingsSuggestIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SettingsSuggestIcon">
    <LazySettingsSuggestIcon {...props} />
  </SuspenseWithTracking>
);

const ShareIconImport = () => import('./ShareIcon');
const LazyShareIcon = lazy(() => ShareIconImport().then(module => ({ default: module.ShareIcon })));
export const ShareIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ShareIcon">
    <LazyShareIcon {...props} />
  </SuspenseWithTracking>
);

const SideNavigationIconImport = () => import('./SideNavigationIcon');
const LazySideNavigationIcon = lazy(() => SideNavigationIconImport().then(module => ({ default: module.SideNavigationIcon })));
export const SideNavigationIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SideNavigationIcon">
    <LazySideNavigationIcon {...props} />
  </SuspenseWithTracking>
);

const SpeedIconImport = () => import('./SpeedIcon');
const LazySpeedIcon = lazy(() => SpeedIconImport().then(module => ({ default: module.SpeedIcon })));
export const SpeedIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SpeedIcon">
    <LazySpeedIcon {...props} />
  </SuspenseWithTracking>
);

const StopCircleIconImport = () => import('./StopCircleIcon');
const LazyStopCircleIcon = lazy(() => StopCircleIconImport().then(module => ({ default: module.StopCircleIcon })));
export const StopCircleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="StopCircleIcon">
    <LazyStopCircleIcon {...props} />
  </SuspenseWithTracking>
);

const StorageIconImport = () => import('./StorageIcon');
const LazyStorageIcon = lazy(() => StorageIconImport().then(module => ({ default: module.StorageIcon })));
export const StorageIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="StorageIcon">
    <LazyStorageIcon {...props} />
  </SuspenseWithTracking>
);

const SupportAgentIconImport = () => import('./SupportAgentIcon');
const LazySupportAgentIcon = lazy(() => SupportAgentIconImport().then(module => ({ default: module.SupportAgentIcon })));
export const SupportAgentIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SupportAgentIcon">
    <LazySupportAgentIcon {...props} />
  </SuspenseWithTracking>
);

const SyncIconImport = () => import('./SyncIcon');
const LazySyncIcon = lazy(() => SyncIconImport().then(module => ({ default: module.SyncIcon })));
export const SyncIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SyncIcon">
    <LazySyncIcon {...props} />
  </SuspenseWithTracking>
);

const TaskIconImport = () => import('./TaskIcon');
const LazyTaskIcon = lazy(() => TaskIconImport().then(module => ({ default: module.TaskIcon })));
export const TaskIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TaskIcon">
    <LazyTaskIcon {...props} />
  </SuspenseWithTracking>
);

const TimerIconImport = () => import('./TimerIcon');
const LazyTimerIcon = lazy(() => TimerIconImport().then(module => ({ default: module.TimerIcon })));
export const TimerIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TimerIcon">
    <LazyTimerIcon {...props} />
  </SuspenseWithTracking>
);

const TrendingUpIconImport = () => import('./TrendingUpIcon');
const LazyTrendingUpIcon = lazy(() => TrendingUpIconImport().then(module => ({ default: module.TrendingUpIcon })));
export const TrendingUpIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TrendingUpIcon">
    <LazyTrendingUpIcon {...props} />
  </SuspenseWithTracking>
);

const TrophyIconImport = () => import('./TrophyIcon');
const LazyTrophyIcon = lazy(() => TrophyIconImport().then(module => ({ default: module.TrophyIcon })));
export const TrophyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TrophyIcon">
    <LazyTrophyIcon {...props} />
  </SuspenseWithTracking>
);

const UndoIconImport = () => import('./UndoIcon');
const LazyUndoIcon = lazy(() => UndoIconImport().then(module => ({ default: module.UndoIcon })));
export const UndoIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UndoIcon">
    <LazyUndoIcon {...props} />
  </SuspenseWithTracking>
);

const UpdateIconImport = () => import('./UpdateIcon');
const LazyUpdateIcon = lazy(() => UpdateIconImport().then(module => ({ default: module.UpdateIcon })));
export const UpdateIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="UpdateIcon">
    <LazyUpdateIcon {...props} />
  </SuspenseWithTracking>
);

const VerticalSplitIconImport = () => import('./VerticalSplitIcon');
const LazyVerticalSplitIcon = lazy(() => VerticalSplitIconImport().then(module => ({ default: module.VerticalSplitIcon })));
export const VerticalSplitIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VerticalSplitIcon">
    <LazyVerticalSplitIcon {...props} />
  </SuspenseWithTracking>
);

const ViewCozyIconImport = () => import('./ViewCozyIcon');
const LazyViewCozyIcon = lazy(() => ViewCozyIconImport().then(module => ({ default: module.ViewCozyIcon })));
export const ViewCozyIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ViewCozyIcon">
    <LazyViewCozyIcon {...props} />
  </SuspenseWithTracking>
);

const ViewHeadlineIconImport = () => import('./ViewHeadlineIcon');
const LazyViewHeadlineIcon = lazy(() => ViewHeadlineIconImport().then(module => ({ default: module.ViewHeadlineIcon })));
export const ViewHeadlineIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ViewHeadlineIcon">
    <LazyViewHeadlineIcon {...props} />
  </SuspenseWithTracking>
);

const ViewModuleIconImport = () => import('./ViewModuleIcon');
const LazyViewModuleIcon = lazy(() => ViewModuleIconImport().then(module => ({ default: module.ViewModuleIcon })));
export const ViewModuleIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ViewModuleIcon">
    <LazyViewModuleIcon {...props} />
  </SuspenseWithTracking>
);

const VisibilityIconImport = () => import('./VisibilityIcon');
const LazyVisibilityIcon = lazy(() => VisibilityIconImport().then(module => ({ default: module.VisibilityIcon })));
export const VisibilityIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VisibilityIcon">
    <LazyVisibilityIcon {...props} />
  </SuspenseWithTracking>
);

const VisibilityOffIconImport = () => import('./VisibilityOffIcon');
const LazyVisibilityOffIcon = lazy(() => VisibilityOffIconImport().then(module => ({ default: module.VisibilityOffIcon })));
export const VisibilityOffIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VisibilityOffIcon">
    <LazyVisibilityOffIcon {...props} />
  </SuspenseWithTracking>
);

const VoidIconImport = () => import('./VoidIcon');
const LazyVoidIcon = lazy(() => VoidIconImport().then(module => ({ default: module.VoidIcon })));
export const VoidIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="VoidIcon">
    <LazyVoidIcon {...props} />
  </SuspenseWithTracking>
);

const WarningIconImport = () => import('./WarningIcon');
const LazyWarningIcon = lazy(() => WarningIconImport().then(module => ({ default: module.WarningIcon })));
export const WarningIcon = (props: BasicIconProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="WarningIcon">
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
