import React, { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';
import { BasicIconProps } from '../types';

const AcUnitIconImport = () => import('./AcUnitIcon');
const LazyAcUnitIcon = lazy(() => AcUnitIconImport().then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcUnitIcon {...props} />
  </Suspense>
);

const AccountCircleIconImport = () => import('./AccountCircleIcon');
const LazyAccountCircleIcon = lazy(() => AccountCircleIconImport().then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAccountCircleIcon {...props} />
  </Suspense>
);

const AcuteIconImport = () => import('./AcuteIcon');
const LazyAcuteIcon = lazy(() => AcuteIconImport().then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcuteIcon {...props} />
  </Suspense>
);

const AddIconImport = () => import('./AddIcon');
const LazyAddIcon = lazy(() => AddIconImport().then(module => ({ default: module.AddIcon })));
export const AddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddIcon {...props} />
  </Suspense>
);

const AddPhotoAlternateIconImport = () => import('./AddPhotoAlternateIcon');
const LazyAddPhotoAlternateIcon = lazy(() => AddPhotoAlternateIconImport().then(module => ({ default: module.AddPhotoAlternateIcon })));
export const AddPhotoAlternateIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddPhotoAlternateIcon {...props} />
  </Suspense>
);

const AddReactionIconImport = () => import('./AddReactionIcon');
const LazyAddReactionIcon = lazy(() => AddReactionIconImport().then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddReactionIcon {...props} />
  </Suspense>
);

const AdminPanelSettingsIconImport = () => import('./AdminPanelSettingsIcon');
const LazyAdminPanelSettingsIcon = lazy(() => AdminPanelSettingsIconImport().then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAdminPanelSettingsIcon {...props} />
  </Suspense>
);

const AlarmIconImport = () => import('./AlarmIcon');
const LazyAlarmIcon = lazy(() => AlarmIconImport().then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAlarmIcon {...props} />
  </Suspense>
);

const AppsIconImport = () => import('./AppsIcon');
const LazyAppsIcon = lazy(() => AppsIconImport().then(module => ({ default: module.AppsIcon })));
export const AppsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAppsIcon {...props} />
  </Suspense>
);

const ArrowBackIconImport = () => import('./ArrowBackIcon');
const LazyArrowBackIcon = lazy(() => ArrowBackIconImport().then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowBackIcon {...props} />
  </Suspense>
);

const ArrowDownwardIconImport = () => import('./ArrowDownwardIcon');
const LazyArrowDownwardIcon = lazy(() => ArrowDownwardIconImport().then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDownwardIcon {...props} />
  </Suspense>
);

const ArrowDropDownIconImport = () => import('./ArrowDropDownIcon');
const LazyArrowDropDownIcon = lazy(() => ArrowDropDownIconImport().then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropDownIcon {...props} />
  </Suspense>
);

const ArrowDropUpIconImport = () => import('./ArrowDropUpIcon');
const LazyArrowDropUpIcon = lazy(() => ArrowDropUpIconImport().then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropUpIcon {...props} />
  </Suspense>
);

const ArrowForwardIconImport = () => import('./ArrowForwardIcon');
const LazyArrowForwardIcon = lazy(() => ArrowForwardIconImport().then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowForwardIcon {...props} />
  </Suspense>
);

const ArrowLeftIconImport = () => import('./ArrowLeftIcon');
const LazyArrowLeftIcon = lazy(() => ArrowLeftIconImport().then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowLeftIcon {...props} />
  </Suspense>
);

const ArrowRightIconImport = () => import('./ArrowRightIcon');
const LazyArrowRightIcon = lazy(() => ArrowRightIconImport().then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowRightIcon {...props} />
  </Suspense>
);

const ArrowUpwardIconImport = () => import('./ArrowUpwardIcon');
const LazyArrowUpwardIcon = lazy(() => ArrowUpwardIconImport().then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowUpwardIcon {...props} />
  </Suspense>
);

const ArticleIconImport = () => import('./ArticleIcon');
const LazyArticleIcon = lazy(() => ArticleIconImport().then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArticleIcon {...props} />
  </Suspense>
);

const AssignmentIconImport = () => import('./AssignmentIcon');
const LazyAssignmentIcon = lazy(() => AssignmentIconImport().then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAssignmentIcon {...props} />
  </Suspense>
);

const AttachFileIconImport = () => import('./AttachFileIcon');
const LazyAttachFileIcon = lazy(() => AttachFileIconImport().then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachFileIcon {...props} />
  </Suspense>
);

const AttachmentIconImport = () => import('./AttachmentIcon');
const LazyAttachmentIcon = lazy(() => AttachmentIconImport().then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachmentIcon {...props} />
  </Suspense>
);

const AutorenewIconImport = () => import('./AutorenewIcon');
const LazyAutorenewIcon = lazy(() => AutorenewIconImport().then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAutorenewIcon {...props} />
  </Suspense>
);

const BadgeIconImport = () => import('./BadgeIcon');
const LazyBadgeIcon = lazy(() => BadgeIconImport().then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBadgeIcon {...props} />
  </Suspense>
);

const BoltIconImport = () => import('./BoltIcon');
const LazyBoltIcon = lazy(() => BoltIconImport().then(module => ({ default: module.BoltIcon })));
export const BoltIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBoltIcon {...props} />
  </Suspense>
);

const BubbleChartIconImport = () => import('./BubbleChartIcon');
const LazyBubbleChartIcon = lazy(() => BubbleChartIconImport().then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBubbleChartIcon {...props} />
  </Suspense>
);

const BuildIconImport = () => import('./BuildIcon');
const LazyBuildIcon = lazy(() => BuildIconImport().then(module => ({ default: module.BuildIcon })));
export const BuildIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBuildIcon {...props} />
  </Suspense>
);

const CalendarMonthIconImport = () => import('./CalendarMonthIcon');
const LazyCalendarMonthIcon = lazy(() => CalendarMonthIconImport().then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarMonthIcon {...props} />
  </Suspense>
);

const CalendarTodayIconImport = () => import('./CalendarTodayIcon');
const LazyCalendarTodayIcon = lazy(() => CalendarTodayIconImport().then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarTodayIcon {...props} />
  </Suspense>
);

const CalendarViewWeekIconImport = () => import('./CalendarViewWeekIcon');
const LazyCalendarViewWeekIcon = lazy(() => CalendarViewWeekIconImport().then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarViewWeekIcon {...props} />
  </Suspense>
);

const CheckIconImport = () => import('./CheckIcon');
const LazyCheckIcon = lazy(() => CheckIconImport().then(module => ({ default: module.CheckIcon })));
export const CheckIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon {...props} />
  </Suspense>
);

const ChecklistIconImport = () => import('./ChecklistIcon');
const LazyChecklistIcon = lazy(() => ChecklistIconImport().then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyChecklistIcon {...props} />
  </Suspense>
);

const CloseIconImport = () => import('./CloseIcon');
const LazyCloseIcon = lazy(() => CloseIconImport().then(module => ({ default: module.CloseIcon })));
export const CloseIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon {...props} />
  </Suspense>
);

const CloudDownloadIconImport = () => import('./CloudDownloadIcon');
const LazyCloudDownloadIcon = lazy(() => CloudDownloadIconImport().then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudDownloadIcon {...props} />
  </Suspense>
);

const CloudUploadIconImport = () => import('./CloudUploadIcon');
const LazyCloudUploadIcon = lazy(() => CloudUploadIconImport().then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudUploadIcon {...props} />
  </Suspense>
);

const CodeBlocksIconImport = () => import('./CodeBlocksIcon');
const LazyCodeBlocksIcon = lazy(() => CodeBlocksIconImport().then(module => ({ default: module.CodeBlocksIcon })));
export const CodeBlocksIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeBlocksIcon {...props} />
  </Suspense>
);

const CodeIconImport = () => import('./CodeIcon');
const LazyCodeIcon = lazy(() => CodeIconImport().then(module => ({ default: module.CodeIcon })));
export const CodeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeIcon {...props} />
  </Suspense>
);

const CommentIconImport = () => import('./CommentIcon');
const LazyCommentIcon = lazy(() => CommentIconImport().then(module => ({ default: module.CommentIcon })));
export const CommentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCommentIcon {...props} />
  </Suspense>
);

const ContactPhoneIconImport = () => import('./ContactPhoneIcon');
const LazyContactPhoneIcon = lazy(() => ContactPhoneIconImport().then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactPhoneIcon {...props} />
  </Suspense>
);

const ContactsIconImport = () => import('./ContactsIcon');
const LazyContactsIcon = lazy(() => ContactsIconImport().then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactsIcon {...props} />
  </Suspense>
);

const ContentCopyIconImport = () => import('./ContentCopyIcon');
const LazyContentCopyIcon = lazy(() => ContentCopyIconImport().then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContentCopyIcon {...props} />
  </Suspense>
);

const DarkModeIconImport = () => import('./DarkModeIcon');
const LazyDarkModeIcon = lazy(() => DarkModeIconImport().then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDarkModeIcon {...props} />
  </Suspense>
);

const DashboardIconImport = () => import('./DashboardIcon');
const LazyDashboardIcon = lazy(() => DashboardIconImport().then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDashboardIcon {...props} />
  </Suspense>
);

const DeleteIconImport = () => import('./DeleteIcon');
const LazyDeleteIcon = lazy(() => DeleteIconImport().then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDeleteIcon {...props} />
  </Suspense>
);

const DemographyIconImport = () => import('./DemographyIcon');
const LazyDemographyIcon = lazy(() => DemographyIconImport().then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDemographyIcon {...props} />
  </Suspense>
);

const DescriptionIconImport = () => import('./DescriptionIcon');
const LazyDescriptionIcon = lazy(() => DescriptionIconImport().then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDescriptionIcon {...props} />
  </Suspense>
);

const DownloadIconImport = () => import('./DownloadIcon');
const LazyDownloadIcon = lazy(() => DownloadIconImport().then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDownloadIcon {...props} />
  </Suspense>
);

const DraftIconImport = () => import('./DraftIcon');
const LazyDraftIcon = lazy(() => DraftIconImport().then(module => ({ default: module.DraftIcon })));
export const DraftIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDraftIcon {...props} />
  </Suspense>
);

const DragIndicatorIconImport = () => import('./DragIndicatorIcon');
const LazyDragIndicatorIcon = lazy(() => DragIndicatorIconImport().then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDragIndicatorIcon {...props} />
  </Suspense>
);

const EditIconImport = () => import('./EditIcon');
const LazyEditIcon = lazy(() => EditIconImport().then(module => ({ default: module.EditIcon })));
export const EditIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditIcon {...props} />
  </Suspense>
);

const EditNoteIconImport = () => import('./EditNoteIcon');
const LazyEditNoteIcon = lazy(() => EditNoteIconImport().then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditNoteIcon {...props} />
  </Suspense>
);

const ErrorIconImport = () => import('./ErrorIcon');
const LazyErrorIcon = lazy(() => ErrorIconImport().then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyErrorIcon {...props} />
  </Suspense>
);

const EventIconImport = () => import('./EventIcon');
const LazyEventIcon = lazy(() => EventIconImport().then(module => ({ default: module.EventIcon })));
export const EventIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEventIcon {...props} />
  </Suspense>
);

const EventListIconImport = () => import('./EventListIcon');
const LazyEventListIcon = lazy(() => EventListIconImport().then(module => ({ default: module.EventListIcon })));
export const EventListIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEventListIcon {...props} />
  </Suspense>
);

const ExclamationIconImport = () => import('./ExclamationIcon');
const LazyExclamationIcon = lazy(() => ExclamationIconImport().then(module => ({ default: module.ExclamationIcon })));
export const ExclamationIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon {...props} />
  </Suspense>
);

const ExpandLessIconImport = () => import('./ExpandLessIcon');
const LazyExpandLessIcon = lazy(() => ExpandLessIconImport().then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandLessIcon {...props} />
  </Suspense>
);

const ExpandMoreIconImport = () => import('./ExpandMoreIcon');
const LazyExpandMoreIcon = lazy(() => ExpandMoreIconImport().then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandMoreIcon {...props} />
  </Suspense>
);

const ExtensionIconImport = () => import('./ExtensionIcon');
const LazyExtensionIcon = lazy(() => ExtensionIconImport().then(module => ({ default: module.ExtensionIcon })));
export const ExtensionIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExtensionIcon {...props} />
  </Suspense>
);

const FileOpenIconImport = () => import('./FileOpenIcon');
const LazyFileOpenIcon = lazy(() => FileOpenIconImport().then(module => ({ default: module.FileOpenIcon })));
export const FileOpenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFileOpenIcon {...props} />
  </Suspense>
);

const FilterListIconImport = () => import('./FilterListIcon');
const LazyFilterListIcon = lazy(() => FilterListIconImport().then(module => ({ default: module.FilterListIcon })));
export const FilterListIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFilterListIcon {...props} />
  </Suspense>
);

const FolderIconImport = () => import('./FolderIcon');
const LazyFolderIcon = lazy(() => FolderIconImport().then(module => ({ default: module.FolderIcon })));
export const FolderIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderIcon {...props} />
  </Suspense>
);

const FolderManagedIconImport = () => import('./FolderManagedIcon');
const LazyFolderManagedIcon = lazy(() => FolderManagedIconImport().then(module => ({ default: module.FolderManagedIcon })));
export const FolderManagedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderManagedIcon {...props} />
  </Suspense>
);

const FolderOpenIconImport = () => import('./FolderOpenIcon');
const LazyFolderOpenIcon = lazy(() => FolderOpenIconImport().then(module => ({ default: module.FolderOpenIcon })));
export const FolderOpenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderOpenIcon {...props} />
  </Suspense>
);

const FormatBoldIconImport = () => import('./FormatBoldIcon');
const LazyFormatBoldIcon = lazy(() => FormatBoldIconImport().then(module => ({ default: module.FormatBoldIcon })));
export const FormatBoldIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatBoldIcon {...props} />
  </Suspense>
);

const FormatH1IconImport = () => import('./FormatH1Icon');
const LazyFormatH1Icon = lazy(() => FormatH1IconImport().then(module => ({ default: module.FormatH1Icon })));
export const FormatH1Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH1Icon {...props} />
  </Suspense>
);

const FormatH2IconImport = () => import('./FormatH2Icon');
const LazyFormatH2Icon = lazy(() => FormatH2IconImport().then(module => ({ default: module.FormatH2Icon })));
export const FormatH2Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH2Icon {...props} />
  </Suspense>
);

const FormatH3IconImport = () => import('./FormatH3Icon');
const LazyFormatH3Icon = lazy(() => FormatH3IconImport().then(module => ({ default: module.FormatH3Icon })));
export const FormatH3Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH3Icon {...props} />
  </Suspense>
);

const FormatH4IconImport = () => import('./FormatH4Icon');
const LazyFormatH4Icon = lazy(() => FormatH4IconImport().then(module => ({ default: module.FormatH4Icon })));
export const FormatH4Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH4Icon {...props} />
  </Suspense>
);

const FormatH5IconImport = () => import('./FormatH5Icon');
const LazyFormatH5Icon = lazy(() => FormatH5IconImport().then(module => ({ default: module.FormatH5Icon })));
export const FormatH5Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH5Icon {...props} />
  </Suspense>
);

const FormatH6IconImport = () => import('./FormatH6Icon');
const LazyFormatH6Icon = lazy(() => FormatH6IconImport().then(module => ({ default: module.FormatH6Icon })));
export const FormatH6Icon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH6Icon {...props} />
  </Suspense>
);

const FormatInkHighlighterIconImport = () => import('./FormatInkHighlighterIcon');
const LazyFormatInkHighlighterIcon = lazy(() => FormatInkHighlighterIconImport().then(module => ({ default: module.FormatInkHighlighterIcon })));
export const FormatInkHighlighterIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatInkHighlighterIcon {...props} />
  </Suspense>
);

const FormatItalicIconImport = () => import('./FormatItalicIcon');
const LazyFormatItalicIcon = lazy(() => FormatItalicIconImport().then(module => ({ default: module.FormatItalicIcon })));
export const FormatItalicIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatItalicIcon {...props} />
  </Suspense>
);

const FormatListBulletedIconImport = () => import('./FormatListBulletedIcon');
const LazyFormatListBulletedIcon = lazy(() => FormatListBulletedIconImport().then(module => ({ default: module.FormatListBulletedIcon })));
export const FormatListBulletedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatListBulletedIcon {...props} />
  </Suspense>
);

const FormatListNumberedIconImport = () => import('./FormatListNumberedIcon');
const LazyFormatListNumberedIcon = lazy(() => FormatListNumberedIconImport().then(module => ({ default: module.FormatListNumberedIcon })));
export const FormatListNumberedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatListNumberedIcon {...props} />
  </Suspense>
);

const FormatQuoteIconImport = () => import('./FormatQuoteIcon');
const LazyFormatQuoteIcon = lazy(() => FormatQuoteIconImport().then(module => ({ default: module.FormatQuoteIcon })));
export const FormatQuoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatQuoteIcon {...props} />
  </Suspense>
);

const FormatStrikethroughIconImport = () => import('./FormatStrikethroughIcon');
const LazyFormatStrikethroughIcon = lazy(() => FormatStrikethroughIconImport().then(module => ({ default: module.FormatStrikethroughIcon })));
export const FormatStrikethroughIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatStrikethroughIcon {...props} />
  </Suspense>
);

const ForwardIconImport = () => import('./ForwardIcon');
const LazyForwardIcon = lazy(() => ForwardIconImport().then(module => ({ default: module.ForwardIcon })));
export const ForwardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyForwardIcon {...props} />
  </Suspense>
);

const FullscreenExitIconImport = () => import('./FullscreenExitIcon');
const LazyFullscreenExitIcon = lazy(() => FullscreenExitIconImport().then(module => ({ default: module.FullscreenExitIcon })));
export const FullscreenExitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenExitIcon {...props} />
  </Suspense>
);

const FullscreenIconImport = () => import('./FullscreenIcon');
const LazyFullscreenIcon = lazy(() => FullscreenIconImport().then(module => ({ default: module.FullscreenIcon })));
export const FullscreenIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenIcon {...props} />
  </Suspense>
);

const GlobeIconImport = () => import('./GlobeIcon');
const LazyGlobeIcon = lazy(() => GlobeIconImport().then(module => ({ default: module.GlobeIcon })));
export const GlobeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGlobeIcon {...props} />
  </Suspense>
);

const GroupAddIconImport = () => import('./GroupAddIcon');
const LazyGroupAddIcon = lazy(() => GroupAddIconImport().then(module => ({ default: module.GroupAddIcon })));
export const GroupAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupAddIcon {...props} />
  </Suspense>
);

const GroupIconImport = () => import('./GroupIcon');
const LazyGroupIcon = lazy(() => GroupIconImport().then(module => ({ default: module.GroupIcon })));
export const GroupIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupIcon {...props} />
  </Suspense>
);

const GroupsIconImport = () => import('./GroupsIcon');
const LazyGroupsIcon = lazy(() => GroupsIconImport().then(module => ({ default: module.GroupsIcon })));
export const GroupsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupsIcon {...props} />
  </Suspense>
);

const HardDriveIconImport = () => import('./HardDriveIcon');
const LazyHardDriveIcon = lazy(() => HardDriveIconImport().then(module => ({ default: module.HardDriveIcon })));
export const HardDriveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHardDriveIcon {...props} />
  </Suspense>
);

const HelpIconImport = () => import('./HelpIcon');
const LazyHelpIcon = lazy(() => HelpIconImport().then(module => ({ default: module.HelpIcon })));
export const HelpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHelpIcon {...props} />
  </Suspense>
);

const HistoryIconImport = () => import('./HistoryIcon');
const LazyHistoryIcon = lazy(() => HistoryIconImport().then(module => ({ default: module.HistoryIcon })));
export const HistoryIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHistoryIcon {...props} />
  </Suspense>
);

const HomeIconImport = () => import('./HomeIcon');
const LazyHomeIcon = lazy(() => HomeIconImport().then(module => ({ default: module.HomeIcon })));
export const HomeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeIcon {...props} />
  </Suspense>
);

const HomeStorageIconImport = () => import('./HomeStorageIcon');
const LazyHomeStorageIcon = lazy(() => HomeStorageIconImport().then(module => ({ default: module.HomeStorageIcon })));
export const HomeStorageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeStorageIcon {...props} />
  </Suspense>
);

const InfoIIconImport = () => import('./InfoIIcon');
const LazyInfoIIcon = lazy(() => InfoIIconImport().then(module => ({ default: module.InfoIIcon })));
export const InfoIIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInfoIIcon {...props} />
  </Suspense>
);

const InvertColorsIconImport = () => import('./InvertColorsIcon');
const LazyInvertColorsIcon = lazy(() => InvertColorsIconImport().then(module => ({ default: module.InvertColorsIcon })));
export const InvertColorsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInvertColorsIcon {...props} />
  </Suspense>
);

const LanguageIconImport = () => import('./LanguageIcon');
const LazyLanguageIcon = lazy(() => LanguageIconImport().then(module => ({ default: module.LanguageIcon })));
export const LanguageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLanguageIcon {...props} />
  </Suspense>
);

const LeaderboardIconImport = () => import('./LeaderboardIcon');
const LazyLeaderboardIcon = lazy(() => LeaderboardIconImport().then(module => ({ default: module.LeaderboardIcon })));
export const LeaderboardIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLeaderboardIcon {...props} />
  </Suspense>
);

const LibraryBooksIconImport = () => import('./LibraryBooksIcon');
const LazyLibraryBooksIcon = lazy(() => LibraryBooksIconImport().then(module => ({ default: module.LibraryBooksIcon })));
export const LibraryBooksIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLibraryBooksIcon {...props} />
  </Suspense>
);

const LightModeIconImport = () => import('./LightModeIcon');
const LazyLightModeIcon = lazy(() => LightModeIconImport().then(module => ({ default: module.LightModeIcon })));
export const LightModeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLightModeIcon {...props} />
  </Suspense>
);

const LinkIconImport = () => import('./LinkIcon');
const LazyLinkIcon = lazy(() => LinkIconImport().then(module => ({ default: module.LinkIcon })));
export const LinkIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkIcon {...props} />
  </Suspense>
);

const LinkOffIconImport = () => import('./LinkOffIcon');
const LazyLinkOffIcon = lazy(() => LinkOffIconImport().then(module => ({ default: module.LinkOffIcon })));
export const LinkOffIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkOffIcon {...props} />
  </Suspense>
);

const ListIconImport = () => import('./ListIcon');
const LazyListIcon = lazy(() => ListIconImport().then(module => ({ default: module.ListIcon })));
export const ListIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyListIcon {...props} />
  </Suspense>
);

const LoadingIconImport = () => import('./LoadingIcon');
const LazyLoadingIcon = lazy(() => LoadingIconImport().then(module => ({ default: module.LoadingIcon })));
export const LoadingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoadingIcon {...props} />
  </Suspense>
);

const LocationCityIconImport = () => import('./LocationCityIcon');
const LazyLocationCityIcon = lazy(() => LocationCityIconImport().then(module => ({ default: module.LocationCityIcon })));
export const LocationCityIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationCityIcon {...props} />
  </Suspense>
);

const LocationOnIconImport = () => import('./LocationOnIcon');
const LazyLocationOnIcon = lazy(() => LocationOnIconImport().then(module => ({ default: module.LocationOnIcon })));
export const LocationOnIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationOnIcon {...props} />
  </Suspense>
);

const LockIconImport = () => import('./LockIcon');
const LazyLockIcon = lazy(() => LockIconImport().then(module => ({ default: module.LockIcon })));
export const LockIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockIcon {...props} />
  </Suspense>
);

const LockPersonIconImport = () => import('./LockPersonIcon');
const LazyLockPersonIcon = lazy(() => LockPersonIconImport().then(module => ({ default: module.LockPersonIcon })));
export const LockPersonIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockPersonIcon {...props} />
  </Suspense>
);

const LoginIconImport = () => import('./LoginIcon');
const LazyLoginIcon = lazy(() => LoginIconImport().then(module => ({ default: module.LoginIcon })));
export const LoginIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoginIcon {...props} />
  </Suspense>
);

const LogoutIconImport = () => import('./LogoutIcon');
const LazyLogoutIcon = lazy(() => LogoutIconImport().then(module => ({ default: module.LogoutIcon })));
export const LogoutIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLogoutIcon {...props} />
  </Suspense>
);

const MailIconImport = () => import('./MailIcon');
const LazyMailIcon = lazy(() => MailIconImport().then(module => ({ default: module.MailIcon })));
export const MailIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMailIcon {...props} />
  </Suspense>
);

const ManageAccountsIconImport = () => import('./ManageAccountsIcon');
const LazyManageAccountsIcon = lazy(() => ManageAccountsIconImport().then(module => ({ default: module.ManageAccountsIcon })));
export const ManageAccountsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageAccountsIcon {...props} />
  </Suspense>
);

const ManageSearchIconImport = () => import('./ManageSearchIcon');
const LazyManageSearchIcon = lazy(() => ManageSearchIconImport().then(module => ({ default: module.ManageSearchIcon })));
export const ManageSearchIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageSearchIcon {...props} />
  </Suspense>
);

const ManufacturingIconImport = () => import('./ManufacturingIcon');
const LazyManufacturingIcon = lazy(() => ManufacturingIconImport().then(module => ({ default: module.ManufacturingIcon })));
export const ManufacturingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManufacturingIcon {...props} />
  </Suspense>
);

const MenuBookIconImport = () => import('./MenuBookIcon');
const LazyMenuBookIcon = lazy(() => MenuBookIconImport().then(module => ({ default: module.MenuBookIcon })));
export const MenuBookIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuBookIcon {...props} />
  </Suspense>
);

const MenuIconImport = () => import('./MenuIcon');
const LazyMenuIcon = lazy(() => MenuIconImport().then(module => ({ default: module.MenuIcon })));
export const MenuIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuIcon {...props} />
  </Suspense>
);

const MoreTimeIconImport = () => import('./MoreTimeIcon');
const LazyMoreTimeIcon = lazy(() => MoreTimeIconImport().then(module => ({ default: module.MoreTimeIcon })));
export const MoreTimeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMoreTimeIcon {...props} />
  </Suspense>
);

const MoreVertIconImport = () => import('./MoreVertIcon');
const LazyMoreVertIcon = lazy(() => MoreVertIconImport().then(module => ({ default: module.MoreVertIcon })));
export const MoreVertIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMoreVertIcon {...props} />
  </Suspense>
);

const NavigateBeforeIconImport = () => import('./NavigateBeforeIcon');
const LazyNavigateBeforeIcon = lazy(() => NavigateBeforeIconImport().then(module => ({ default: module.NavigateBeforeIcon })));
export const NavigateBeforeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateBeforeIcon {...props} />
  </Suspense>
);

const NavigateNextIconImport = () => import('./NavigateNextIcon');
const LazyNavigateNextIcon = lazy(() => NavigateNextIconImport().then(module => ({ default: module.NavigateNextIcon })));
export const NavigateNextIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateNextIcon {...props} />
  </Suspense>
);

const NewReleasesIconImport = () => import('./NewReleasesIcon');
const LazyNewReleasesIcon = lazy(() => NewReleasesIconImport().then(module => ({ default: module.NewReleasesIcon })));
export const NewReleasesIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNewReleasesIcon {...props} />
  </Suspense>
);

const NoteAddIconImport = () => import('./NoteAddIcon');
const LazyNoteAddIcon = lazy(() => NoteAddIconImport().then(module => ({ default: module.NoteAddIcon })));
export const NoteAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteAddIcon {...props} />
  </Suspense>
);

const NoteIconImport = () => import('./NoteIcon');
const LazyNoteIcon = lazy(() => NoteIconImport().then(module => ({ default: module.NoteIcon })));
export const NoteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteIcon {...props} />
  </Suspense>
);

const NotificationsActiveIconImport = () => import('./NotificationsActiveIcon');
const LazyNotificationsActiveIcon = lazy(() => NotificationsActiveIconImport().then(module => ({ default: module.NotificationsActiveIcon })));
export const NotificationsActiveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationsActiveIcon {...props} />
  </Suspense>
);

const OpenInNewIconImport = () => import('./OpenInNewIcon');
const LazyOpenInNewIcon = lazy(() => OpenInNewIconImport().then(module => ({ default: module.OpenInNewIcon })));
export const OpenInNewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyOpenInNewIcon {...props} />
  </Suspense>
);

const PageInfoIconImport = () => import('./PageInfoIcon');
const LazyPageInfoIcon = lazy(() => PageInfoIconImport().then(module => ({ default: module.PageInfoIcon })));
export const PageInfoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPageInfoIcon {...props} />
  </Suspense>
);

const PaletteIconImport = () => import('./PaletteIcon');
const LazyPaletteIcon = lazy(() => PaletteIconImport().then(module => ({ default: module.PaletteIcon })));
export const PaletteIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPaletteIcon {...props} />
  </Suspense>
);

const PendingActionsIconImport = () => import('./PendingActionsIcon');
const LazyPendingActionsIcon = lazy(() => PendingActionsIconImport().then(module => ({ default: module.PendingActionsIcon })));
export const PendingActionsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingActionsIcon {...props} />
  </Suspense>
);

const PendingIconImport = () => import('./PendingIcon');
const LazyPendingIcon = lazy(() => PendingIconImport().then(module => ({ default: module.PendingIcon })));
export const PendingIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingIcon {...props} />
  </Suspense>
);

const PersonIconImport = () => import('./PersonIcon');
const LazyPersonIcon = lazy(() => PersonIconImport().then(module => ({ default: module.PersonIcon })));
export const PersonIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPersonIcon {...props} />
  </Suspense>
);

const PhotoLibraryIconImport = () => import('./PhotoLibraryIcon');
const LazyPhotoLibraryIcon = lazy(() => PhotoLibraryIconImport().then(module => ({ default: module.PhotoLibraryIcon })));
export const PhotoLibraryIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPhotoLibraryIcon {...props} />
  </Suspense>
);

const PictureAsPdfIconImport = () => import('./PictureAsPdfIcon');
const LazyPictureAsPdfIcon = lazy(() => PictureAsPdfIconImport().then(module => ({ default: module.PictureAsPdfIcon })));
export const PictureAsPdfIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPictureAsPdfIcon {...props} />
  </Suspense>
);

const PlayArrowIconImport = () => import('./PlayArrowIcon');
const LazyPlayArrowIcon = lazy(() => PlayArrowIconImport().then(module => ({ default: module.PlayArrowIcon })));
export const PlayArrowIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayArrowIcon {...props} />
  </Suspense>
);

const PlayCircleIconImport = () => import('./PlayCircleIcon');
const LazyPlayCircleIcon = lazy(() => PlayCircleIconImport().then(module => ({ default: module.PlayCircleIcon })));
export const PlayCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayCircleIcon {...props} />
  </Suspense>
);

const PostAddIconImport = () => import('./PostAddIcon');
const LazyPostAddIcon = lazy(() => PostAddIconImport().then(module => ({ default: module.PostAddIcon })));
export const PostAddIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPostAddIcon {...props} />
  </Suspense>
);

const PreviewIconImport = () => import('./PreviewIcon');
const LazyPreviewIcon = lazy(() => PreviewIconImport().then(module => ({ default: module.PreviewIcon })));
export const PreviewIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPreviewIcon {...props} />
  </Suspense>
);

const PriorityHighIconImport = () => import('./PriorityHighIcon');
const LazyPriorityHighIcon = lazy(() => PriorityHighIconImport().then(module => ({ default: module.PriorityHighIcon })));
export const PriorityHighIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPriorityHighIcon {...props} />
  </Suspense>
);

const PublicIconImport = () => import('./PublicIcon');
const LazyPublicIcon = lazy(() => PublicIconImport().then(module => ({ default: module.PublicIcon })));
export const PublicIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublicIcon {...props} />
  </Suspense>
);

const PublishIconImport = () => import('./PublishIcon');
const LazyPublishIcon = lazy(() => PublishIconImport().then(module => ({ default: module.PublishIcon })));
export const PublishIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublishIcon {...props} />
  </Suspense>
);

const RedoIconImport = () => import('./RedoIcon');
const LazyRedoIcon = lazy(() => RedoIconImport().then(module => ({ default: module.RedoIcon })));
export const RedoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRedoIcon {...props} />
  </Suspense>
);

const RefreshIconImport = () => import('./RefreshIcon');
const LazyRefreshIcon = lazy(() => RefreshIconImport().then(module => ({ default: module.RefreshIcon })));
export const RefreshIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRefreshIcon {...props} />
  </Suspense>
);

const ReplyAllIconImport = () => import('./ReplyAllIcon');
const LazyReplyAllIcon = lazy(() => ReplyAllIconImport().then(module => ({ default: module.ReplyAllIcon })));
export const ReplyAllIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyAllIcon {...props} />
  </Suspense>
);

const ReplyIconImport = () => import('./ReplyIcon');
const LazyReplyIcon = lazy(() => ReplyIconImport().then(module => ({ default: module.ReplyIcon })));
export const ReplyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyIcon {...props} />
  </Suspense>
);

const SaveIconImport = () => import('./SaveIcon');
const LazySaveIcon = lazy(() => SaveIconImport().then(module => ({ default: module.SaveIcon })));
export const SaveIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySaveIcon {...props} />
  </Suspense>
);

const ScheduleIconImport = () => import('./ScheduleIcon');
const LazyScheduleIcon = lazy(() => ScheduleIconImport().then(module => ({ default: module.ScheduleIcon })));
export const ScheduleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyScheduleIcon {...props} />
  </Suspense>
);

const SchoolIconImport = () => import('./SchoolIcon');
const LazySchoolIcon = lazy(() => SchoolIconImport().then(module => ({ default: module.SchoolIcon })));
export const SchoolIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySchoolIcon {...props} />
  </Suspense>
);

const SearchIconImport = () => import('./SearchIcon');
const LazySearchIcon = lazy(() => SearchIconImport().then(module => ({ default: module.SearchIcon })));
export const SearchIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySearchIcon {...props} />
  </Suspense>
);

const SendIconImport = () => import('./SendIcon');
const LazySendIcon = lazy(() => SendIconImport().then(module => ({ default: module.SendIcon })));
export const SendIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySendIcon {...props} />
  </Suspense>
);

const SettingsAlertIconImport = () => import('./SettingsAlertIcon');
const LazySettingsAlertIcon = lazy(() => SettingsAlertIconImport().then(module => ({ default: module.SettingsAlertIcon })));
export const SettingsAlertIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsAlertIcon {...props} />
  </Suspense>
);

const SettingsIconImport = () => import('./SettingsIcon');
const LazySettingsIcon = lazy(() => SettingsIconImport().then(module => ({ default: module.SettingsIcon })));
export const SettingsIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsIcon {...props} />
  </Suspense>
);

const SettingsSuggestIconImport = () => import('./SettingsSuggestIcon');
const LazySettingsSuggestIcon = lazy(() => SettingsSuggestIconImport().then(module => ({ default: module.SettingsSuggestIcon })));
export const SettingsSuggestIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsSuggestIcon {...props} />
  </Suspense>
);

const ShareIconImport = () => import('./ShareIcon');
const LazyShareIcon = lazy(() => ShareIconImport().then(module => ({ default: module.ShareIcon })));
export const ShareIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyShareIcon {...props} />
  </Suspense>
);

const SideNavigationIconImport = () => import('./SideNavigationIcon');
const LazySideNavigationIcon = lazy(() => SideNavigationIconImport().then(module => ({ default: module.SideNavigationIcon })));
export const SideNavigationIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySideNavigationIcon {...props} />
  </Suspense>
);

const SpeedIconImport = () => import('./SpeedIcon');
const LazySpeedIcon = lazy(() => SpeedIconImport().then(module => ({ default: module.SpeedIcon })));
export const SpeedIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySpeedIcon {...props} />
  </Suspense>
);

const StepIntoIconImport = () => import('./StepIntoIcon');
const LazyStepIntoIcon = lazy(() => StepIntoIconImport().then(module => ({ default: module.StepIntoIcon })));
export const StepIntoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStepIntoIcon {...props} />
  </Suspense>
);

const StepOutIconImport = () => import('./StepOutIcon');
const LazyStepOutIcon = lazy(() => StepOutIconImport().then(module => ({ default: module.StepOutIcon })));
export const StepOutIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStepOutIcon {...props} />
  </Suspense>
);

const StopCircleIconImport = () => import('./StopCircleIcon');
const LazyStopCircleIcon = lazy(() => StopCircleIconImport().then(module => ({ default: module.StopCircleIcon })));
export const StopCircleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStopCircleIcon {...props} />
  </Suspense>
);

const StorageIconImport = () => import('./StorageIcon');
const LazyStorageIcon = lazy(() => StorageIconImport().then(module => ({ default: module.StorageIcon })));
export const StorageIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStorageIcon {...props} />
  </Suspense>
);

const SupportAgentIconImport = () => import('./SupportAgentIcon');
const LazySupportAgentIcon = lazy(() => SupportAgentIconImport().then(module => ({ default: module.SupportAgentIcon })));
export const SupportAgentIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySupportAgentIcon {...props} />
  </Suspense>
);

const SyncIconImport = () => import('./SyncIcon');
const LazySyncIcon = lazy(() => SyncIconImport().then(module => ({ default: module.SyncIcon })));
export const SyncIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySyncIcon {...props} />
  </Suspense>
);

const TableEyeIconImport = () => import('./TableEyeIcon');
const LazyTableEyeIcon = lazy(() => TableEyeIconImport().then(module => ({ default: module.TableEyeIcon })));
export const TableEyeIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTableEyeIcon {...props} />
  </Suspense>
);

const TaskIconImport = () => import('./TaskIcon');
const LazyTaskIcon = lazy(() => TaskIconImport().then(module => ({ default: module.TaskIcon })));
export const TaskIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTaskIcon {...props} />
  </Suspense>
);

const TimerIconImport = () => import('./TimerIcon');
const LazyTimerIcon = lazy(() => TimerIconImport().then(module => ({ default: module.TimerIcon })));
export const TimerIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimerIcon {...props} />
  </Suspense>
);

const TrendingUpIconImport = () => import('./TrendingUpIcon');
const LazyTrendingUpIcon = lazy(() => TrendingUpIconImport().then(module => ({ default: module.TrendingUpIcon })));
export const TrendingUpIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrendingUpIcon {...props} />
  </Suspense>
);

const TrophyIconImport = () => import('./TrophyIcon');
const LazyTrophyIcon = lazy(() => TrophyIconImport().then(module => ({ default: module.TrophyIcon })));
export const TrophyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrophyIcon {...props} />
  </Suspense>
);

const UndoIconImport = () => import('./UndoIcon');
const LazyUndoIcon = lazy(() => UndoIconImport().then(module => ({ default: module.UndoIcon })));
export const UndoIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUndoIcon {...props} />
  </Suspense>
);

const UpdateIconImport = () => import('./UpdateIcon');
const LazyUpdateIcon = lazy(() => UpdateIconImport().then(module => ({ default: module.UpdateIcon })));
export const UpdateIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpdateIcon {...props} />
  </Suspense>
);

const VerticalSplitIconImport = () => import('./VerticalSplitIcon');
const LazyVerticalSplitIcon = lazy(() => VerticalSplitIconImport().then(module => ({ default: module.VerticalSplitIcon })));
export const VerticalSplitIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalSplitIcon {...props} />
  </Suspense>
);

const ViewCozyIconImport = () => import('./ViewCozyIcon');
const LazyViewCozyIcon = lazy(() => ViewCozyIconImport().then(module => ({ default: module.ViewCozyIcon })));
export const ViewCozyIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewCozyIcon {...props} />
  </Suspense>
);

const ViewHeadlineIconImport = () => import('./ViewHeadlineIcon');
const LazyViewHeadlineIcon = lazy(() => ViewHeadlineIconImport().then(module => ({ default: module.ViewHeadlineIcon })));
export const ViewHeadlineIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewHeadlineIcon {...props} />
  </Suspense>
);

const ViewModuleIconImport = () => import('./ViewModuleIcon');
const LazyViewModuleIcon = lazy(() => ViewModuleIconImport().then(module => ({ default: module.ViewModuleIcon })));
export const ViewModuleIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewModuleIcon {...props} />
  </Suspense>
);

const VisibilityIconImport = () => import('./VisibilityIcon');
const LazyVisibilityIcon = lazy(() => VisibilityIconImport().then(module => ({ default: module.VisibilityIcon })));
export const VisibilityIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityIcon {...props} />
  </Suspense>
);

const VisibilityOffIconImport = () => import('./VisibilityOffIcon');
const LazyVisibilityOffIcon = lazy(() => VisibilityOffIconImport().then(module => ({ default: module.VisibilityOffIcon })));
export const VisibilityOffIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityOffIcon {...props} />
  </Suspense>
);

const VoidIconImport = () => import('./VoidIcon');
const LazyVoidIcon = lazy(() => VoidIconImport().then(module => ({ default: module.VoidIcon })));
export const VoidIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVoidIcon {...props} />
  </Suspense>
);

const WarningIconImport = () => import('./WarningIcon');
const LazyWarningIcon = lazy(() => WarningIconImport().then(module => ({ default: module.WarningIcon })));
export const WarningIcon = (props: BasicIconProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWarningIcon {...props} />
  </Suspense>
);

export const preloadAtomsIconsGoogle = async () => {
  await AcUnitIconImport();
  await AccountCircleIconImport();
  await AcuteIconImport();
  await AddIconImport();
  await AddPhotoAlternateIconImport();
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
  await CodeBlocksIconImport();
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
  await EventListIconImport();
  await ExclamationIconImport();
  await ExpandLessIconImport();
  await ExpandMoreIconImport();
  await ExtensionIconImport();
  await FileOpenIconImport();
  await FilterListIconImport();
  await FolderIconImport();
  await FolderManagedIconImport();
  await FolderOpenIconImport();
  await FormatBoldIconImport();
  await FormatH1IconImport();
  await FormatH2IconImport();
  await FormatH3IconImport();
  await FormatH4IconImport();
  await FormatH5IconImport();
  await FormatH6IconImport();
  await FormatInkHighlighterIconImport();
  await FormatItalicIconImport();
  await FormatListBulletedIconImport();
  await FormatListNumberedIconImport();
  await FormatQuoteIconImport();
  await FormatStrikethroughIconImport();
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
  await InfoIIconImport();
  await InvertColorsIconImport();
  await LanguageIconImport();
  await LeaderboardIconImport();
  await LibraryBooksIconImport();
  await LightModeIconImport();
  await LinkIconImport();
  await LinkOffIconImport();
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
  await MoreVertIconImport();
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
  await PriorityHighIconImport();
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
  await StepIntoIconImport();
  await StepOutIconImport();
  await StopCircleIconImport();
  await StorageIconImport();
  await SupportAgentIconImport();
  await SyncIconImport();
  await TableEyeIconImport();
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
