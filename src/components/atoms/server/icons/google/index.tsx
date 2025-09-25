import { lazy, Suspense } from 'react';
//import { SuspenseWithTracking } from '../../../../SuspenseWithTracking';
import { SpinIcon } from '../SpinIcon';

const AcUnitIconImport = () => import('./AcUnitIcon');
const LazyAcUnitIcon = lazy(() => AcUnitIconImport().then(module => ({ default: module.AcUnitIcon })));
export const AcUnitIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcUnitIcon />
  </Suspense>
);

const AccountCircleIconImport = () => import('./AccountCircleIcon');
const LazyAccountCircleIcon = lazy(() => AccountCircleIconImport().then(module => ({ default: module.AccountCircleIcon })));
export const AccountCircleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAccountCircleIcon />
  </Suspense>
);

const AcuteIconImport = () => import('./AcuteIcon');
const LazyAcuteIcon = lazy(() => AcuteIconImport().then(module => ({ default: module.AcuteIcon })));
export const AcuteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAcuteIcon />
  </Suspense>
);

const AddColumnLeftIconImport = () => import('./AddColumnLeftIcon');
const LazyAddColumnLeftIcon = lazy(() => AddColumnLeftIconImport().then(module => ({ default: module.AddColumnLeftIcon })));
export const AddColumnLeftIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddColumnLeftIcon />
  </Suspense>
);

const AddColumnRightIconImport = () => import('./AddColumnRightIcon');
const LazyAddColumnRightIcon = lazy(() => AddColumnRightIconImport().then(module => ({ default: module.AddColumnRightIcon })));
export const AddColumnRightIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddColumnRightIcon />
  </Suspense>
);

const AddIconImport = () => import('./AddIcon');
const LazyAddIcon = lazy(() => AddIconImport().then(module => ({ default: module.AddIcon })));
export const AddIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddIcon />
  </Suspense>
);

const AddPhotoAlternateIconImport = () => import('./AddPhotoAlternateIcon');
const LazyAddPhotoAlternateIcon = lazy(() => AddPhotoAlternateIconImport().then(module => ({ default: module.AddPhotoAlternateIcon })));
export const AddPhotoAlternateIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddPhotoAlternateIcon />
  </Suspense>
);

const AddReactionIconImport = () => import('./AddReactionIcon');
const LazyAddReactionIcon = lazy(() => AddReactionIconImport().then(module => ({ default: module.AddReactionIcon })));
export const AddReactionIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddReactionIcon />
  </Suspense>
);

const AddRowAboveIconImport = () => import('./AddRowAboveIcon');
const LazyAddRowAboveIcon = lazy(() => AddRowAboveIconImport().then(module => ({ default: module.AddRowAboveIcon })));
export const AddRowAboveIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddRowAboveIcon />
  </Suspense>
);

const AddRowBelowIconImport = () => import('./AddRowBelowIcon');
const LazyAddRowBelowIcon = lazy(() => AddRowBelowIconImport().then(module => ({ default: module.AddRowBelowIcon })));
export const AddRowBelowIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAddRowBelowIcon />
  </Suspense>
);

const AdminPanelSettingsIconImport = () => import('./AdminPanelSettingsIcon');
const LazyAdminPanelSettingsIcon = lazy(() => AdminPanelSettingsIconImport().then(module => ({ default: module.AdminPanelSettingsIcon })));
export const AdminPanelSettingsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAdminPanelSettingsIcon />
  </Suspense>
);

const AlarmIconImport = () => import('./AlarmIcon');
const LazyAlarmIcon = lazy(() => AlarmIconImport().then(module => ({ default: module.AlarmIcon })));
export const AlarmIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAlarmIcon />
  </Suspense>
);

const AppsIconImport = () => import('./AppsIcon');
const LazyAppsIcon = lazy(() => AppsIconImport().then(module => ({ default: module.AppsIcon })));
export const AppsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAppsIcon />
  </Suspense>
);

const ArrowBackIconImport = () => import('./ArrowBackIcon');
const LazyArrowBackIcon = lazy(() => ArrowBackIconImport().then(module => ({ default: module.ArrowBackIcon })));
export const ArrowBackIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowBackIcon />
  </Suspense>
);

const ArrowDownwardIconImport = () => import('./ArrowDownwardIcon');
const LazyArrowDownwardIcon = lazy(() => ArrowDownwardIconImport().then(module => ({ default: module.ArrowDownwardIcon })));
export const ArrowDownwardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDownwardIcon />
  </Suspense>
);

const ArrowDropDownIconImport = () => import('./ArrowDropDownIcon');
const LazyArrowDropDownIcon = lazy(() => ArrowDropDownIconImport().then(module => ({ default: module.ArrowDropDownIcon })));
export const ArrowDropDownIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropDownIcon />
  </Suspense>
);

const ArrowDropUpIconImport = () => import('./ArrowDropUpIcon');
const LazyArrowDropUpIcon = lazy(() => ArrowDropUpIconImport().then(module => ({ default: module.ArrowDropUpIcon })));
export const ArrowDropUpIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowDropUpIcon />
  </Suspense>
);

const ArrowForwardIconImport = () => import('./ArrowForwardIcon');
const LazyArrowForwardIcon = lazy(() => ArrowForwardIconImport().then(module => ({ default: module.ArrowForwardIcon })));
export const ArrowForwardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowForwardIcon />
  </Suspense>
);

const ArrowLeftIconImport = () => import('./ArrowLeftIcon');
const LazyArrowLeftIcon = lazy(() => ArrowLeftIconImport().then(module => ({ default: module.ArrowLeftIcon })));
export const ArrowLeftIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowLeftIcon />
  </Suspense>
);

const ArrowRightIconImport = () => import('./ArrowRightIcon');
const LazyArrowRightIcon = lazy(() => ArrowRightIconImport().then(module => ({ default: module.ArrowRightIcon })));
export const ArrowRightIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowRightIcon />
  </Suspense>
);

const ArrowUpwardIconImport = () => import('./ArrowUpwardIcon');
const LazyArrowUpwardIcon = lazy(() => ArrowUpwardIconImport().then(module => ({ default: module.ArrowUpwardIcon })));
export const ArrowUpwardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArrowUpwardIcon />
  </Suspense>
);

const ArticleIconImport = () => import('./ArticleIcon');
const LazyArticleIcon = lazy(() => ArticleIconImport().then(module => ({ default: module.ArticleIcon })));
export const ArticleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyArticleIcon />
  </Suspense>
);

const AssignmentIconImport = () => import('./AssignmentIcon');
const LazyAssignmentIcon = lazy(() => AssignmentIconImport().then(module => ({ default: module.AssignmentIcon })));
export const AssignmentIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAssignmentIcon />
  </Suspense>
);

const AttachFileIconImport = () => import('./AttachFileIcon');
const LazyAttachFileIcon = lazy(() => AttachFileIconImport().then(module => ({ default: module.AttachFileIcon })));
export const AttachFileIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachFileIcon />
  </Suspense>
);

const AttachmentIconImport = () => import('./AttachmentIcon');
const LazyAttachmentIcon = lazy(() => AttachmentIconImport().then(module => ({ default: module.AttachmentIcon })));
export const AttachmentIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAttachmentIcon />
  </Suspense>
);

const AutorenewIconImport = () => import('./AutorenewIcon');
const LazyAutorenewIcon = lazy(() => AutorenewIconImport().then(module => ({ default: module.AutorenewIcon })));
export const AutorenewIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyAutorenewIcon />
  </Suspense>
);

const BadgeIconImport = () => import('./BadgeIcon');
const LazyBadgeIcon = lazy(() => BadgeIconImport().then(module => ({ default: module.BadgeIcon })));
export const BadgeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBadgeIcon />
  </Suspense>
);

const BoltIconImport = () => import('./BoltIcon');
const LazyBoltIcon = lazy(() => BoltIconImport().then(module => ({ default: module.BoltIcon })));
export const BoltIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBoltIcon />
  </Suspense>
);

const BubbleChartIconImport = () => import('./BubbleChartIcon');
const LazyBubbleChartIcon = lazy(() => BubbleChartIconImport().then(module => ({ default: module.BubbleChartIcon })));
export const BubbleChartIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBubbleChartIcon />
  </Suspense>
);

const BuildIconImport = () => import('./BuildIcon');
const LazyBuildIcon = lazy(() => BuildIconImport().then(module => ({ default: module.BuildIcon })));
export const BuildIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBuildIcon />
  </Suspense>
);

const CalendarMonthIconImport = () => import('./CalendarMonthIcon');
const LazyCalendarMonthIcon = lazy(() => CalendarMonthIconImport().then(module => ({ default: module.CalendarMonthIcon })));
export const CalendarMonthIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarMonthIcon />
  </Suspense>
);

const CalendarTodayIconImport = () => import('./CalendarTodayIcon');
const LazyCalendarTodayIcon = lazy(() => CalendarTodayIconImport().then(module => ({ default: module.CalendarTodayIcon })));
export const CalendarTodayIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarTodayIcon />
  </Suspense>
);

const CalendarViewWeekIconImport = () => import('./CalendarViewWeekIcon');
const LazyCalendarViewWeekIcon = lazy(() => CalendarViewWeekIconImport().then(module => ({ default: module.CalendarViewWeekIcon })));
export const CalendarViewWeekIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCalendarViewWeekIcon />
  </Suspense>
);

const CheckIconImport = () => import('./CheckIcon');
const LazyCheckIcon = lazy(() => CheckIconImport().then(module => ({ default: module.CheckIcon })));
export const CheckIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCheckIcon />
  </Suspense>
);

const ChecklistIconImport = () => import('./ChecklistIcon');
const LazyChecklistIcon = lazy(() => ChecklistIconImport().then(module => ({ default: module.ChecklistIcon })));
export const ChecklistIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyChecklistIcon />
  </Suspense>
);

const CloseIconImport = () => import('./CloseIcon');
const LazyCloseIcon = lazy(() => CloseIconImport().then(module => ({ default: module.CloseIcon })));
export const CloseIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloseIcon />
  </Suspense>
);

const CloudDownloadIconImport = () => import('./CloudDownloadIcon');
const LazyCloudDownloadIcon = lazy(() => CloudDownloadIconImport().then(module => ({ default: module.CloudDownloadIcon })));
export const CloudDownloadIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudDownloadIcon />
  </Suspense>
);

const CloudUploadIconImport = () => import('./CloudUploadIcon');
const LazyCloudUploadIcon = lazy(() => CloudUploadIconImport().then(module => ({ default: module.CloudUploadIcon })));
export const CloudUploadIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCloudUploadIcon />
  </Suspense>
);

const CodeBlocksIconImport = () => import('./CodeBlocksIcon');
const LazyCodeBlocksIcon = lazy(() => CodeBlocksIconImport().then(module => ({ default: module.CodeBlocksIcon })));
export const CodeBlocksIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeBlocksIcon />
  </Suspense>
);

const CodeIconImport = () => import('./CodeIcon');
const LazyCodeIcon = lazy(() => CodeIconImport().then(module => ({ default: module.CodeIcon })));
export const CodeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeIcon />
  </Suspense>
);

const CommentIconImport = () => import('./CommentIcon');
const LazyCommentIcon = lazy(() => CommentIconImport().then(module => ({ default: module.CommentIcon })));
export const CommentIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCommentIcon />
  </Suspense>
);

const ContactPhoneIconImport = () => import('./ContactPhoneIcon');
const LazyContactPhoneIcon = lazy(() => ContactPhoneIconImport().then(module => ({ default: module.ContactPhoneIcon })));
export const ContactPhoneIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactPhoneIcon />
  </Suspense>
);

const ContactsIconImport = () => import('./ContactsIcon');
const LazyContactsIcon = lazy(() => ContactsIconImport().then(module => ({ default: module.ContactsIcon })));
export const ContactsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContactsIcon />
  </Suspense>
);

const ContentCopyIconImport = () => import('./ContentCopyIcon');
const LazyContentCopyIcon = lazy(() => ContentCopyIconImport().then(module => ({ default: module.ContentCopyIcon })));
export const ContentCopyIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyContentCopyIcon />
  </Suspense>
);

const DarkModeIconImport = () => import('./DarkModeIcon');
const LazyDarkModeIcon = lazy(() => DarkModeIconImport().then(module => ({ default: module.DarkModeIcon })));
export const DarkModeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDarkModeIcon />
  </Suspense>
);

const DashboardIconImport = () => import('./DashboardIcon');
const LazyDashboardIcon = lazy(() => DashboardIconImport().then(module => ({ default: module.DashboardIcon })));
export const DashboardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDashboardIcon />
  </Suspense>
);

const DeleteIconImport = () => import('./DeleteIcon');
const LazyDeleteIcon = lazy(() => DeleteIconImport().then(module => ({ default: module.DeleteIcon })));
export const DeleteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDeleteIcon />
  </Suspense>
);

const DemographyIconImport = () => import('./DemographyIcon');
const LazyDemographyIcon = lazy(() => DemographyIconImport().then(module => ({ default: module.DemographyIcon })));
export const DemographyIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDemographyIcon />
  </Suspense>
);

const DescriptionIconImport = () => import('./DescriptionIcon');
const LazyDescriptionIcon = lazy(() => DescriptionIconImport().then(module => ({ default: module.DescriptionIcon })));
export const DescriptionIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDescriptionIcon />
  </Suspense>
);

const DownloadIconImport = () => import('./DownloadIcon');
const LazyDownloadIcon = lazy(() => DownloadIconImport().then(module => ({ default: module.DownloadIcon })));
export const DownloadIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDownloadIcon />
  </Suspense>
);

const DraftIconImport = () => import('./DraftIcon');
const LazyDraftIcon = lazy(() => DraftIconImport().then(module => ({ default: module.DraftIcon })));
export const DraftIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDraftIcon />
  </Suspense>
);

const DragIndicatorIconImport = () => import('./DragIndicatorIcon');
const LazyDragIndicatorIcon = lazy(() => DragIndicatorIconImport().then(module => ({ default: module.DragIndicatorIcon })));
export const DragIndicatorIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDragIndicatorIcon />
  </Suspense>
);

const EditIconImport = () => import('./EditIcon');
const LazyEditIcon = lazy(() => EditIconImport().then(module => ({ default: module.EditIcon })));
export const EditIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditIcon />
  </Suspense>
);

const EditNoteIconImport = () => import('./EditNoteIcon');
const LazyEditNoteIcon = lazy(() => EditNoteIconImport().then(module => ({ default: module.EditNoteIcon })));
export const EditNoteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEditNoteIcon />
  </Suspense>
);

const ErrorIconImport = () => import('./ErrorIcon');
const LazyErrorIcon = lazy(() => ErrorIconImport().then(module => ({ default: module.ErrorIcon })));
export const ErrorIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyErrorIcon />
  </Suspense>
);

const EventIconImport = () => import('./EventIcon');
const LazyEventIcon = lazy(() => EventIconImport().then(module => ({ default: module.EventIcon })));
export const EventIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEventIcon />
  </Suspense>
);

const EventListIconImport = () => import('./EventListIcon');
const LazyEventListIcon = lazy(() => EventListIconImport().then(module => ({ default: module.EventListIcon })));
export const EventListIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyEventListIcon />
  </Suspense>
);

const ExclamationIconImport = () => import('./ExclamationIcon');
const LazyExclamationIcon = lazy(() => ExclamationIconImport().then(module => ({ default: module.ExclamationIcon })));
export const ExclamationIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExclamationIcon />
  </Suspense>
);

const ExpandLessIconImport = () => import('./ExpandLessIcon');
const LazyExpandLessIcon = lazy(() => ExpandLessIconImport().then(module => ({ default: module.ExpandLessIcon })));
export const ExpandLessIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandLessIcon />
  </Suspense>
);

const ExpandMoreIconImport = () => import('./ExpandMoreIcon');
const LazyExpandMoreIcon = lazy(() => ExpandMoreIconImport().then(module => ({ default: module.ExpandMoreIcon })));
export const ExpandMoreIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExpandMoreIcon />
  </Suspense>
);

const ExtensionIconImport = () => import('./ExtensionIcon');
const LazyExtensionIcon = lazy(() => ExtensionIconImport().then(module => ({ default: module.ExtensionIcon })));
export const ExtensionIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyExtensionIcon />
  </Suspense>
);

const FileOpenIconImport = () => import('./FileOpenIcon');
const LazyFileOpenIcon = lazy(() => FileOpenIconImport().then(module => ({ default: module.FileOpenIcon })));
export const FileOpenIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFileOpenIcon />
  </Suspense>
);

const FilterListIconImport = () => import('./FilterListIcon');
const LazyFilterListIcon = lazy(() => FilterListIconImport().then(module => ({ default: module.FilterListIcon })));
export const FilterListIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFilterListIcon />
  </Suspense>
);

const FolderIconImport = () => import('./FolderIcon');
const LazyFolderIcon = lazy(() => FolderIconImport().then(module => ({ default: module.FolderIcon })));
export const FolderIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderIcon />
  </Suspense>
);

const FolderManagedIconImport = () => import('./FolderManagedIcon');
const LazyFolderManagedIcon = lazy(() => FolderManagedIconImport().then(module => ({ default: module.FolderManagedIcon })));
export const FolderManagedIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderManagedIcon />
  </Suspense>
);

const FolderOpenIconImport = () => import('./FolderOpenIcon');
const LazyFolderOpenIcon = lazy(() => FolderOpenIconImport().then(module => ({ default: module.FolderOpenIcon })));
export const FolderOpenIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFolderOpenIcon />
  </Suspense>
);

const FormatBoldIconImport = () => import('./FormatBoldIcon');
const LazyFormatBoldIcon = lazy(() => FormatBoldIconImport().then(module => ({ default: module.FormatBoldIcon })));
export const FormatBoldIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatBoldIcon />
  </Suspense>
);

const FormatH1IconImport = () => import('./FormatH1Icon');
const LazyFormatH1Icon = lazy(() => FormatH1IconImport().then(module => ({ default: module.FormatH1Icon })));
export const FormatH1Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH1Icon />
  </Suspense>
);

const FormatH2IconImport = () => import('./FormatH2Icon');
const LazyFormatH2Icon = lazy(() => FormatH2IconImport().then(module => ({ default: module.FormatH2Icon })));
export const FormatH2Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH2Icon />
  </Suspense>
);

const FormatH3IconImport = () => import('./FormatH3Icon');
const LazyFormatH3Icon = lazy(() => FormatH3IconImport().then(module => ({ default: module.FormatH3Icon })));
export const FormatH3Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH3Icon />
  </Suspense>
);

const FormatH4IconImport = () => import('./FormatH4Icon');
const LazyFormatH4Icon = lazy(() => FormatH4IconImport().then(module => ({ default: module.FormatH4Icon })));
export const FormatH4Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH4Icon />
  </Suspense>
);

const FormatH5IconImport = () => import('./FormatH5Icon');
const LazyFormatH5Icon = lazy(() => FormatH5IconImport().then(module => ({ default: module.FormatH5Icon })));
export const FormatH5Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH5Icon />
  </Suspense>
);

const FormatH6IconImport = () => import('./FormatH6Icon');
const LazyFormatH6Icon = lazy(() => FormatH6IconImport().then(module => ({ default: module.FormatH6Icon })));
export const FormatH6Icon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatH6Icon />
  </Suspense>
);

const FormatInkHighlighterIconImport = () => import('./FormatInkHighlighterIcon');
const LazyFormatInkHighlighterIcon = lazy(() => FormatInkHighlighterIconImport().then(module => ({ default: module.FormatInkHighlighterIcon })));
export const FormatInkHighlighterIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatInkHighlighterIcon />
  </Suspense>
);

const FormatItalicIconImport = () => import('./FormatItalicIcon');
const LazyFormatItalicIcon = lazy(() => FormatItalicIconImport().then(module => ({ default: module.FormatItalicIcon })));
export const FormatItalicIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatItalicIcon />
  </Suspense>
);

const FormatListBulletedIconImport = () => import('./FormatListBulletedIcon');
const LazyFormatListBulletedIcon = lazy(() => FormatListBulletedIconImport().then(module => ({ default: module.FormatListBulletedIcon })));
export const FormatListBulletedIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatListBulletedIcon />
  </Suspense>
);

const FormatListNumberedIconImport = () => import('./FormatListNumberedIcon');
const LazyFormatListNumberedIcon = lazy(() => FormatListNumberedIconImport().then(module => ({ default: module.FormatListNumberedIcon })));
export const FormatListNumberedIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatListNumberedIcon />
  </Suspense>
);

const FormatQuoteIconImport = () => import('./FormatQuoteIcon');
const LazyFormatQuoteIcon = lazy(() => FormatQuoteIconImport().then(module => ({ default: module.FormatQuoteIcon })));
export const FormatQuoteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatQuoteIcon />
  </Suspense>
);

const FormatStrikethroughIconImport = () => import('./FormatStrikethroughIcon');
const LazyFormatStrikethroughIcon = lazy(() => FormatStrikethroughIconImport().then(module => ({ default: module.FormatStrikethroughIcon })));
export const FormatStrikethroughIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFormatStrikethroughIcon />
  </Suspense>
);

const ForwardIconImport = () => import('./ForwardIcon');
const LazyForwardIcon = lazy(() => ForwardIconImport().then(module => ({ default: module.ForwardIcon })));
export const ForwardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyForwardIcon />
  </Suspense>
);

const FullscreenExitIconImport = () => import('./FullscreenExitIcon');
const LazyFullscreenExitIcon = lazy(() => FullscreenExitIconImport().then(module => ({ default: module.FullscreenExitIcon })));
export const FullscreenExitIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenExitIcon />
  </Suspense>
);

const FullscreenIconImport = () => import('./FullscreenIcon');
const LazyFullscreenIcon = lazy(() => FullscreenIconImport().then(module => ({ default: module.FullscreenIcon })));
export const FullscreenIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFullscreenIcon />
  </Suspense>
);

const GlobeIconImport = () => import('./GlobeIcon');
const LazyGlobeIcon = lazy(() => GlobeIconImport().then(module => ({ default: module.GlobeIcon })));
export const GlobeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGlobeIcon />
  </Suspense>
);

const GroupAddIconImport = () => import('./GroupAddIcon');
const LazyGroupAddIcon = lazy(() => GroupAddIconImport().then(module => ({ default: module.GroupAddIcon })));
export const GroupAddIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupAddIcon />
  </Suspense>
);

const GroupIconImport = () => import('./GroupIcon');
const LazyGroupIcon = lazy(() => GroupIconImport().then(module => ({ default: module.GroupIcon })));
export const GroupIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupIcon />
  </Suspense>
);

const GroupsIconImport = () => import('./GroupsIcon');
const LazyGroupsIcon = lazy(() => GroupsIconImport().then(module => ({ default: module.GroupsIcon })));
export const GroupsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyGroupsIcon />
  </Suspense>
);

const HardDriveIconImport = () => import('./HardDriveIcon');
const LazyHardDriveIcon = lazy(() => HardDriveIconImport().then(module => ({ default: module.HardDriveIcon })));
export const HardDriveIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHardDriveIcon />
  </Suspense>
);

const HelpIconImport = () => import('./HelpIcon');
const LazyHelpIcon = lazy(() => HelpIconImport().then(module => ({ default: module.HelpIcon })));
export const HelpIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHelpIcon />
  </Suspense>
);

const HistoryIconImport = () => import('./HistoryIcon');
const LazyHistoryIcon = lazy(() => HistoryIconImport().then(module => ({ default: module.HistoryIcon })));
export const HistoryIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHistoryIcon />
  </Suspense>
);

const HomeIconImport = () => import('./HomeIcon');
const LazyHomeIcon = lazy(() => HomeIconImport().then(module => ({ default: module.HomeIcon })));
export const HomeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeIcon />
  </Suspense>
);

const HomeStorageIconImport = () => import('./HomeStorageIcon');
const LazyHomeStorageIcon = lazy(() => HomeStorageIconImport().then(module => ({ default: module.HomeStorageIcon })));
export const HomeStorageIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeStorageIcon />
  </Suspense>
);

const InfoIIconImport = () => import('./InfoIIcon');
const LazyInfoIIcon = lazy(() => InfoIIconImport().then(module => ({ default: module.InfoIIcon })));
export const InfoIIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInfoIIcon />
  </Suspense>
);

const InkEraserIconImport = () => import('./InkEraserIcon');
const LazyInkEraserIcon = lazy(() => InkEraserIconImport().then(module => ({ default: module.InkEraserIcon })));
export const InkEraserIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInkEraserIcon />
  </Suspense>
);

const InvertColorsIconImport = () => import('./InvertColorsIcon');
const LazyInvertColorsIcon = lazy(() => InvertColorsIconImport().then(module => ({ default: module.InvertColorsIcon })));
export const InvertColorsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInvertColorsIcon />
  </Suspense>
);

const LanguageIconImport = () => import('./LanguageIcon');
const LazyLanguageIcon = lazy(() => LanguageIconImport().then(module => ({ default: module.LanguageIcon })));
export const LanguageIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLanguageIcon />
  </Suspense>
);

const LeaderboardIconImport = () => import('./LeaderboardIcon');
const LazyLeaderboardIcon = lazy(() => LeaderboardIconImport().then(module => ({ default: module.LeaderboardIcon })));
export const LeaderboardIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLeaderboardIcon />
  </Suspense>
);

const LibraryBooksIconImport = () => import('./LibraryBooksIcon');
const LazyLibraryBooksIcon = lazy(() => LibraryBooksIconImport().then(module => ({ default: module.LibraryBooksIcon })));
export const LibraryBooksIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLibraryBooksIcon />
  </Suspense>
);

const LightModeIconImport = () => import('./LightModeIcon');
const LazyLightModeIcon = lazy(() => LightModeIconImport().then(module => ({ default: module.LightModeIcon })));
export const LightModeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLightModeIcon />
  </Suspense>
);

const LinkIconImport = () => import('./LinkIcon');
const LazyLinkIcon = lazy(() => LinkIconImport().then(module => ({ default: module.LinkIcon })));
export const LinkIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkIcon />
  </Suspense>
);

const LinkOffIconImport = () => import('./LinkOffIcon');
const LazyLinkOffIcon = lazy(() => LinkOffIconImport().then(module => ({ default: module.LinkOffIcon })));
export const LinkOffIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkOffIcon />
  </Suspense>
);

const ListIconImport = () => import('./ListIcon');
const LazyListIcon = lazy(() => ListIconImport().then(module => ({ default: module.ListIcon })));
export const ListIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyListIcon />
  </Suspense>
);

const LoadingIconImport = () => import('./LoadingIcon');
const LazyLoadingIcon = lazy(() => LoadingIconImport().then(module => ({ default: module.LoadingIcon })));
export const LoadingIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoadingIcon />
  </Suspense>
);

const LocationCityIconImport = () => import('./LocationCityIcon');
const LazyLocationCityIcon = lazy(() => LocationCityIconImport().then(module => ({ default: module.LocationCityIcon })));
export const LocationCityIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationCityIcon />
  </Suspense>
);

const LocationOnIconImport = () => import('./LocationOnIcon');
const LazyLocationOnIcon = lazy(() => LocationOnIconImport().then(module => ({ default: module.LocationOnIcon })));
export const LocationOnIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLocationOnIcon />
  </Suspense>
);

const LockIconImport = () => import('./LockIcon');
const LazyLockIcon = lazy(() => LockIconImport().then(module => ({ default: module.LockIcon })));
export const LockIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockIcon />
  </Suspense>
);

const LockPersonIconImport = () => import('./LockPersonIcon');
const LazyLockPersonIcon = lazy(() => LockPersonIconImport().then(module => ({ default: module.LockPersonIcon })));
export const LockPersonIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLockPersonIcon />
  </Suspense>
);

const LoginIconImport = () => import('./LoginIcon');
const LazyLoginIcon = lazy(() => LoginIconImport().then(module => ({ default: module.LoginIcon })));
export const LoginIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLoginIcon />
  </Suspense>
);

const LogoutIconImport = () => import('./LogoutIcon');
const LazyLogoutIcon = lazy(() => LogoutIconImport().then(module => ({ default: module.LogoutIcon })));
export const LogoutIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLogoutIcon />
  </Suspense>
);

const MailIconImport = () => import('./MailIcon');
const LazyMailIcon = lazy(() => MailIconImport().then(module => ({ default: module.MailIcon })));
export const MailIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMailIcon />
  </Suspense>
);

const ManageAccountsIconImport = () => import('./ManageAccountsIcon');
const LazyManageAccountsIcon = lazy(() => ManageAccountsIconImport().then(module => ({ default: module.ManageAccountsIcon })));
export const ManageAccountsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageAccountsIcon />
  </Suspense>
);

const ManageSearchIconImport = () => import('./ManageSearchIcon');
const LazyManageSearchIcon = lazy(() => ManageSearchIconImport().then(module => ({ default: module.ManageSearchIcon })));
export const ManageSearchIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManageSearchIcon />
  </Suspense>
);

const ManufacturingIconImport = () => import('./ManufacturingIcon');
const LazyManufacturingIcon = lazy(() => ManufacturingIconImport().then(module => ({ default: module.ManufacturingIcon })));
export const ManufacturingIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyManufacturingIcon />
  </Suspense>
);

const MenuBookIconImport = () => import('./MenuBookIcon');
const LazyMenuBookIcon = lazy(() => MenuBookIconImport().then(module => ({ default: module.MenuBookIcon })));
export const MenuBookIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuBookIcon />
  </Suspense>
);

const MenuIconImport = () => import('./MenuIcon');
const LazyMenuIcon = lazy(() => MenuIconImport().then(module => ({ default: module.MenuIcon })));
export const MenuIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMenuIcon />
  </Suspense>
);

const MoreTimeIconImport = () => import('./MoreTimeIcon');
const LazyMoreTimeIcon = lazy(() => MoreTimeIconImport().then(module => ({ default: module.MoreTimeIcon })));
export const MoreTimeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMoreTimeIcon />
  </Suspense>
);

const MoreVertIconImport = () => import('./MoreVertIcon');
const LazyMoreVertIcon = lazy(() => MoreVertIconImport().then(module => ({ default: module.MoreVertIcon })));
export const MoreVertIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMoreVertIcon />
  </Suspense>
);

const NavigateBeforeIconImport = () => import('./NavigateBeforeIcon');
const LazyNavigateBeforeIcon = lazy(() => NavigateBeforeIconImport().then(module => ({ default: module.NavigateBeforeIcon })));
export const NavigateBeforeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateBeforeIcon />
  </Suspense>
);

const NavigateNextIconImport = () => import('./NavigateNextIcon');
const LazyNavigateNextIcon = lazy(() => NavigateNextIconImport().then(module => ({ default: module.NavigateNextIcon })));
export const NavigateNextIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNavigateNextIcon />
  </Suspense>
);

const NewReleasesIconImport = () => import('./NewReleasesIcon');
const LazyNewReleasesIcon = lazy(() => NewReleasesIconImport().then(module => ({ default: module.NewReleasesIcon })));
export const NewReleasesIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNewReleasesIcon />
  </Suspense>
);

const NoteAddIconImport = () => import('./NoteAddIcon');
const LazyNoteAddIcon = lazy(() => NoteAddIconImport().then(module => ({ default: module.NoteAddIcon })));
export const NoteAddIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteAddIcon />
  </Suspense>
);

const NoteIconImport = () => import('./NoteIcon');
const LazyNoteIcon = lazy(() => NoteIconImport().then(module => ({ default: module.NoteIcon })));
export const NoteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNoteIcon />
  </Suspense>
);

const NotificationsActiveIconImport = () => import('./NotificationsActiveIcon');
const LazyNotificationsActiveIcon = lazy(() => NotificationsActiveIconImport().then(module => ({ default: module.NotificationsActiveIcon })));
export const NotificationsActiveIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyNotificationsActiveIcon />
  </Suspense>
);

const OpenInNewIconImport = () => import('./OpenInNewIcon');
const LazyOpenInNewIcon = lazy(() => OpenInNewIconImport().then(module => ({ default: module.OpenInNewIcon })));
export const OpenInNewIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyOpenInNewIcon />
  </Suspense>
);

const PageInfoIconImport = () => import('./PageInfoIcon');
const LazyPageInfoIcon = lazy(() => PageInfoIconImport().then(module => ({ default: module.PageInfoIcon })));
export const PageInfoIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPageInfoIcon />
  </Suspense>
);

const PaletteIconImport = () => import('./PaletteIcon');
const LazyPaletteIcon = lazy(() => PaletteIconImport().then(module => ({ default: module.PaletteIcon })));
export const PaletteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPaletteIcon />
  </Suspense>
);

const PanToolIconImport = () => import('./PanToolIcon');
const LazyPanToolIcon = lazy(() => PanToolIconImport().then(module => ({ default: module.PanToolIcon })));
export const PanToolIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPanToolIcon />
  </Suspense>
);

const PauseCircleIconImport = () => import('./PauseCircleIcon');
const LazyPauseCircleIcon = lazy(() => PauseCircleIconImport().then(module => ({ default: module.PauseCircleIcon })));
export const PauseCircleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPauseCircleIcon />
  </Suspense>
);

const PendingActionsIconImport = () => import('./PendingActionsIcon');
const LazyPendingActionsIcon = lazy(() => PendingActionsIconImport().then(module => ({ default: module.PendingActionsIcon })));
export const PendingActionsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingActionsIcon />
  </Suspense>
);

const PendingIconImport = () => import('./PendingIcon');
const LazyPendingIcon = lazy(() => PendingIconImport().then(module => ({ default: module.PendingIcon })));
export const PendingIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPendingIcon />
  </Suspense>
);

const PersonIconImport = () => import('./PersonIcon');
const LazyPersonIcon = lazy(() => PersonIconImport().then(module => ({ default: module.PersonIcon })));
export const PersonIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPersonIcon />
  </Suspense>
);

const PhotoLibraryIconImport = () => import('./PhotoLibraryIcon');
const LazyPhotoLibraryIcon = lazy(() => PhotoLibraryIconImport().then(module => ({ default: module.PhotoLibraryIcon })));
export const PhotoLibraryIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPhotoLibraryIcon />
  </Suspense>
);

const PictureAsPdfIconImport = () => import('./PictureAsPdfIcon');
const LazyPictureAsPdfIcon = lazy(() => PictureAsPdfIconImport().then(module => ({ default: module.PictureAsPdfIcon })));
export const PictureAsPdfIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPictureAsPdfIcon />
  </Suspense>
);

const PlayArrowIconImport = () => import('./PlayArrowIcon');
const LazyPlayArrowIcon = lazy(() => PlayArrowIconImport().then(module => ({ default: module.PlayArrowIcon })));
export const PlayArrowIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayArrowIcon />
  </Suspense>
);

const PlayCircleIconImport = () => import('./PlayCircleIcon');
const LazyPlayCircleIcon = lazy(() => PlayCircleIconImport().then(module => ({ default: module.PlayCircleIcon })));
export const PlayCircleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPlayCircleIcon />
  </Suspense>
);

const PostAddIconImport = () => import('./PostAddIcon');
const LazyPostAddIcon = lazy(() => PostAddIconImport().then(module => ({ default: module.PostAddIcon })));
export const PostAddIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPostAddIcon />
  </Suspense>
);

const PreviewIconImport = () => import('./PreviewIcon');
const LazyPreviewIcon = lazy(() => PreviewIconImport().then(module => ({ default: module.PreviewIcon })));
export const PreviewIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPreviewIcon />
  </Suspense>
);

const PriorityHighIconImport = () => import('./PriorityHighIcon');
const LazyPriorityHighIcon = lazy(() => PriorityHighIconImport().then(module => ({ default: module.PriorityHighIcon })));
export const PriorityHighIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPriorityHighIcon />
  </Suspense>
);

const PublicIconImport = () => import('./PublicIcon');
const LazyPublicIcon = lazy(() => PublicIconImport().then(module => ({ default: module.PublicIcon })));
export const PublicIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublicIcon />
  </Suspense>
);

const PublishIconImport = () => import('./PublishIcon');
const LazyPublishIcon = lazy(() => PublishIconImport().then(module => ({ default: module.PublishIcon })));
export const PublishIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPublishIcon />
  </Suspense>
);

const RedoIconImport = () => import('./RedoIcon');
const LazyRedoIcon = lazy(() => RedoIconImport().then(module => ({ default: module.RedoIcon })));
export const RedoIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRedoIcon />
  </Suspense>
);

const RefreshIconImport = () => import('./RefreshIcon');
const LazyRefreshIcon = lazy(() => RefreshIconImport().then(module => ({ default: module.RefreshIcon })));
export const RefreshIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyRefreshIcon />
  </Suspense>
);

const ReplyAllIconImport = () => import('./ReplyAllIcon');
const LazyReplyAllIcon = lazy(() => ReplyAllIconImport().then(module => ({ default: module.ReplyAllIcon })));
export const ReplyAllIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyAllIcon />
  </Suspense>
);

const ReplyIconImport = () => import('./ReplyIcon');
const LazyReplyIcon = lazy(() => ReplyIconImport().then(module => ({ default: module.ReplyIcon })));
export const ReplyIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyReplyIcon />
  </Suspense>
);

const SaveIconImport = () => import('./SaveIcon');
const LazySaveIcon = lazy(() => SaveIconImport().then(module => ({ default: module.SaveIcon })));
export const SaveIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySaveIcon />
  </Suspense>
);

const ScheduleIconImport = () => import('./ScheduleIcon');
const LazyScheduleIcon = lazy(() => ScheduleIconImport().then(module => ({ default: module.ScheduleIcon })));
export const ScheduleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyScheduleIcon />
  </Suspense>
);

const SchoolIconImport = () => import('./SchoolIcon');
const LazySchoolIcon = lazy(() => SchoolIconImport().then(module => ({ default: module.SchoolIcon })));
export const SchoolIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySchoolIcon />
  </Suspense>
);

const SearchIconImport = () => import('./SearchIcon');
const LazySearchIcon = lazy(() => SearchIconImport().then(module => ({ default: module.SearchIcon })));
export const SearchIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySearchIcon />
  </Suspense>
);

const SendIconImport = () => import('./SendIcon');
const LazySendIcon = lazy(() => SendIconImport().then(module => ({ default: module.SendIcon })));
export const SendIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySendIcon />
  </Suspense>
);

const SettingsAlertIconImport = () => import('./SettingsAlertIcon');
const LazySettingsAlertIcon = lazy(() => SettingsAlertIconImport().then(module => ({ default: module.SettingsAlertIcon })));
export const SettingsAlertIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsAlertIcon />
  </Suspense>
);

const SettingsIconImport = () => import('./SettingsIcon');
const LazySettingsIcon = lazy(() => SettingsIconImport().then(module => ({ default: module.SettingsIcon })));
export const SettingsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsIcon />
  </Suspense>
);

const SettingsSuggestIconImport = () => import('./SettingsSuggestIcon');
const LazySettingsSuggestIcon = lazy(() => SettingsSuggestIconImport().then(module => ({ default: module.SettingsSuggestIcon })));
export const SettingsSuggestIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySettingsSuggestIcon />
  </Suspense>
);

const ShareIconImport = () => import('./ShareIcon');
const LazyShareIcon = lazy(() => ShareIconImport().then(module => ({ default: module.ShareIcon })));
export const ShareIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyShareIcon />
  </Suspense>
);

const SideNavigationIconImport = () => import('./SideNavigationIcon');
const LazySideNavigationIcon = lazy(() => SideNavigationIconImport().then(module => ({ default: module.SideNavigationIcon })));
export const SideNavigationIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySideNavigationIcon />
  </Suspense>
);

const SpeedIconImport = () => import('./SpeedIcon');
const LazySpeedIcon = lazy(() => SpeedIconImport().then(module => ({ default: module.SpeedIcon })));
export const SpeedIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySpeedIcon />
  </Suspense>
);

const StepIntoIconImport = () => import('./StepIntoIcon');
const LazyStepIntoIcon = lazy(() => StepIntoIconImport().then(module => ({ default: module.StepIntoIcon })));
export const StepIntoIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStepIntoIcon />
  </Suspense>
);

const StepOutIconImport = () => import('./StepOutIcon');
const LazyStepOutIcon = lazy(() => StepOutIconImport().then(module => ({ default: module.StepOutIcon })));
export const StepOutIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStepOutIcon />
  </Suspense>
);

const StopCircleIconImport = () => import('./StopCircleIcon');
const LazyStopCircleIcon = lazy(() => StopCircleIconImport().then(module => ({ default: module.StopCircleIcon })));
export const StopCircleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStopCircleIcon />
  </Suspense>
);

const StorageIconImport = () => import('./StorageIcon');
const LazyStorageIcon = lazy(() => StorageIconImport().then(module => ({ default: module.StorageIcon })));
export const StorageIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStorageIcon />
  </Suspense>
);

const StylusLaserPointerIconImport = () => import('./StylusLaserPointerIcon');
const LazyStylusLaserPointerIcon = lazy(() => StylusLaserPointerIconImport().then(module => ({ default: module.StylusLaserPointerIcon })));
export const StylusLaserPointerIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStylusLaserPointerIcon />
  </Suspense>
);

const StylusNoteIconImport = () => import('./StylusNoteIcon');
const LazyStylusNoteIcon = lazy(() => StylusNoteIconImport().then(module => ({ default: module.StylusNoteIcon })));
export const StylusNoteIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyStylusNoteIcon />
  </Suspense>
);

const SupportAgentIconImport = () => import('./SupportAgentIcon');
const LazySupportAgentIcon = lazy(() => SupportAgentIconImport().then(module => ({ default: module.SupportAgentIcon })));
export const SupportAgentIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySupportAgentIcon />
  </Suspense>
);

const SyncIconImport = () => import('./SyncIcon');
const LazySyncIcon = lazy(() => SyncIconImport().then(module => ({ default: module.SyncIcon })));
export const SyncIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySyncIcon />
  </Suspense>
);

const TableEyeIconImport = () => import('./TableEyeIcon');
const LazyTableEyeIcon = lazy(() => TableEyeIconImport().then(module => ({ default: module.TableEyeIcon })));
export const TableEyeIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTableEyeIcon />
  </Suspense>
);

const TableIconImport = () => import('./TableIcon');
const LazyTableIcon = lazy(() => TableIconImport().then(module => ({ default: module.TableIcon })));
export const TableIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTableIcon />
  </Suspense>
);

const TaskIconImport = () => import('./TaskIcon');
const LazyTaskIcon = lazy(() => TaskIconImport().then(module => ({ default: module.TaskIcon })));
export const TaskIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTaskIcon />
  </Suspense>
);

const TimerIconImport = () => import('./TimerIcon');
const LazyTimerIcon = lazy(() => TimerIconImport().then(module => ({ default: module.TimerIcon })));
export const TimerIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimerIcon />
  </Suspense>
);

const TrendingUpIconImport = () => import('./TrendingUpIcon');
const LazyTrendingUpIcon = lazy(() => TrendingUpIconImport().then(module => ({ default: module.TrendingUpIcon })));
export const TrendingUpIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrendingUpIcon />
  </Suspense>
);

const TrophyIconImport = () => import('./TrophyIcon');
const LazyTrophyIcon = lazy(() => TrophyIconImport().then(module => ({ default: module.TrophyIcon })));
export const TrophyIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTrophyIcon />
  </Suspense>
);

const UndoIconImport = () => import('./UndoIcon');
const LazyUndoIcon = lazy(() => UndoIconImport().then(module => ({ default: module.UndoIcon })));
export const UndoIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUndoIcon />
  </Suspense>
);

const UpdateIconImport = () => import('./UpdateIcon');
const LazyUpdateIcon = lazy(() => UpdateIconImport().then(module => ({ default: module.UpdateIcon })));
export const UpdateIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyUpdateIcon />
  </Suspense>
);

const VerticalSplitIconImport = () => import('./VerticalSplitIcon');
const LazyVerticalSplitIcon = lazy(() => VerticalSplitIconImport().then(module => ({ default: module.VerticalSplitIcon })));
export const VerticalSplitIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVerticalSplitIcon />
  </Suspense>
);

const ViewCozyIconImport = () => import('./ViewCozyIcon');
const LazyViewCozyIcon = lazy(() => ViewCozyIconImport().then(module => ({ default: module.ViewCozyIcon })));
export const ViewCozyIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewCozyIcon />
  </Suspense>
);

const ViewHeadlineIconImport = () => import('./ViewHeadlineIcon');
const LazyViewHeadlineIcon = lazy(() => ViewHeadlineIconImport().then(module => ({ default: module.ViewHeadlineIcon })));
export const ViewHeadlineIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewHeadlineIcon />
  </Suspense>
);

const ViewModuleIconImport = () => import('./ViewModuleIcon');
const LazyViewModuleIcon = lazy(() => ViewModuleIconImport().then(module => ({ default: module.ViewModuleIcon })));
export const ViewModuleIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyViewModuleIcon />
  </Suspense>
);

const VisibilityIconImport = () => import('./VisibilityIcon');
const LazyVisibilityIcon = lazy(() => VisibilityIconImport().then(module => ({ default: module.VisibilityIcon })));
export const VisibilityIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityIcon />
  </Suspense>
);

const VisibilityOffIconImport = () => import('./VisibilityOffIcon');
const LazyVisibilityOffIcon = lazy(() => VisibilityOffIconImport().then(module => ({ default: module.VisibilityOffIcon })));
export const VisibilityOffIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVisibilityOffIcon />
  </Suspense>
);

const VoidIconImport = () => import('./VoidIcon');
const LazyVoidIcon = lazy(() => VoidIconImport().then(module => ({ default: module.VoidIcon })));
export const VoidIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyVoidIcon />
  </Suspense>
);

const WarningIconImport = () => import('./WarningIcon');
const LazyWarningIcon = lazy(() => WarningIconImport().then(module => ({ default: module.WarningIcon })));
export const WarningIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWarningIcon />
  </Suspense>
);

const WidgetsIconImport = () => import('./WidgetsIcon');
const LazyWidgetsIcon = lazy(() => WidgetsIconImport().then(module => ({ default: module.WidgetsIcon })));
export const WidgetsIcon = () => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyWidgetsIcon />
  </Suspense>
);

export const preloadAtomsIconsGoogle = async () => {
  await AcUnitIconImport();
  await AccountCircleIconImport();
  await AcuteIconImport();
  await AddColumnLeftIconImport();
  await AddColumnRightIconImport();
  await AddIconImport();
  await AddPhotoAlternateIconImport();
  await AddReactionIconImport();
  await AddRowAboveIconImport();
  await AddRowBelowIconImport();
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
  await InkEraserIconImport();
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
  await PanToolIconImport();
  await PauseCircleIconImport();
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
  await StylusLaserPointerIconImport();
  await StylusNoteIconImport();
  await SupportAgentIconImport();
  await SyncIconImport();
  await TableEyeIconImport();
  await TableIconImport();
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
  await WidgetsIconImport();
};
