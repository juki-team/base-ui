import type { Meta } from '@storybook/react-vite';
import { type FC, useState } from 'react';
import type { ColorResult } from 'react-color';
import { MockupJukiProvider } from '../../../../mockup/MockupJukiProvider';
import { InputColor } from '../../../../molecules';
import { Input } from '../../../Input/Input';
import { T } from '../../../T/T';
import type { BasicIconProps } from '../types';
import { AddPhotoAlternateIcon } from './AddPhotoAlternateIcon';
import { AcUnitIcon } from './AcUnitIcon';
import { AccountCircleIcon } from './AccountCircleIcon';
import { AcuteIcon } from './AcuteIcon';
import { AddColumnLeftIcon } from './AddColumnLeftIcon';
import { AddColumnRightIcon } from './AddColumnRightIcon';
import { AddIcon } from './AddIcon';
import { AddReactionIcon } from './AddReactionIcon';
import { AddRowAboveIcon } from './AddRowAboveIcon';
import { AddRowBelowIcon } from './AddRowBelowIcon';
import { AdminPanelSettingsIcon } from './AdminPanelSettingsIcon';
import { AlarmIcon } from './AlarmIcon';
import { AppsIcon } from './AppsIcon';
import { ArrowBackIcon } from './ArrowBackIcon';
import { ArrowDownwardIcon } from './ArrowDownwardIcon';
import { ArrowDropDownIcon } from './ArrowDropDownIcon';
import { ArrowDropUpIcon } from './ArrowDropUpIcon';
import { ArrowForwardIcon } from './ArrowForwardIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowUpwardIcon } from './ArrowUpwardIcon';
import { ArticleIcon } from './ArticleIcon';
import { AssignmentIcon } from './AssignmentIcon';
import { AttachFileIcon } from './AttachFileIcon';
import { AttachmentIcon } from './AttachmentIcon';
import { AutorenewIcon } from './AutorenewIcon';
import { BadgeIcon } from './BadgeIcon';
import { BoltIcon } from './BoltIcon';
import { BubbleChartIcon } from './BubbleChartIcon';
import { BuildIcon } from './BuildIcon';
import { CalendarMonthIcon } from './CalendarMonthIcon';
import { CalendarTodayIcon } from './CalendarTodayIcon';
import { CalendarViewWeekIcon } from './CalendarViewWeekIcon';
import { CheckIcon } from './CheckIcon';
import { ChecklistIcon } from './ChecklistIcon';
import { CloseIcon } from './CloseIcon';
import { CloudDownloadIcon } from './CloudDownloadIcon';
import { CloudUploadIcon } from './CloudUploadIcon';
import { CodeBlocksIcon } from './CodeBlocksIcon';
import { CodeIcon } from './CodeIcon';
import { CommentIcon } from './CommentIcon';
import { ContactPhoneIcon } from './ContactPhoneIcon';
import { ContactsIcon } from './ContactsIcon';
import { ContentCopyIcon } from './ContentCopyIcon';
import { DarkModeIcon } from './DarkModeIcon';
import { DashboardIcon } from './DashboardIcon';
import { DeleteIcon } from './DeleteIcon';
import { DemographyIcon } from './DemographyIcon';
import { DescriptionIcon } from './DescriptionIcon';
import { DesignServicesIcon } from './DesignServicesIcon';
import { DoneAllIcon } from './DoneAllIcon';
import { DownloadIcon } from './DownloadIcon';
import { DraftIcon } from './DraftIcon';
import { DragIndicatorIcon } from './DragIndicatorIcon';
import { EditIcon } from './EditIcon';
import { EditNoteIcon } from './EditNoteIcon';
import { ErrorIcon } from './ErrorIcon';
import { EventIcon } from './EventIcon';
import { EventListIcon } from './EventListIcon';
import { ExclamationIcon } from './ExclamationIcon';
import { ExpandLessIcon } from './ExpandLessIcon';
import { ExpandMoreIcon } from './ExpandMoreIcon';
import { ExtensionIcon } from './ExtensionIcon';
import { FileCopyIcon } from './FileCopyIcon';
import { FileOpenIcon } from './FileOpenIcon';
import { FilterListIcon } from './FilterListIcon';
import { FitnessCenterIcon } from './FitnessCenterIcon';
import { FolderIcon } from './FolderIcon';
import { FolderManagedIcon } from './FolderManagedIcon';
import { FolderOpenIcon } from './FolderOpenIcon';
import { FormatBoldIcon } from './FormatBoldIcon';
import { FormatH1Icon } from './FormatH1Icon';
import { FormatH2Icon } from './FormatH2Icon';
import { FormatH3Icon } from './FormatH3Icon';
import { FormatH4Icon } from './FormatH4Icon';
import { FormatH5Icon } from './FormatH5Icon';
import { FormatH6Icon } from './FormatH6Icon';
import { FormatInkHighlighterIcon } from './FormatInkHighlighterIcon';
import { FormatItalicIcon } from './FormatItalicIcon';
import { FormatListBulletedIcon } from './FormatListBulletedIcon';
import { FormatListNumberedIcon } from './FormatListNumberedIcon';
import { FormatQuoteIcon } from './FormatQuoteIcon';
import { FormatStrikethroughIcon } from './FormatStrikethroughIcon';
import { ForwardIcon } from './ForwardIcon';
import { FullscreenExitIcon } from './FullscreenExitIcon';
import { FullscreenIcon } from './FullscreenIcon';
import { GlobeIcon } from './GlobeIcon';
import { GroupAddIcon } from './GroupAddIcon';
import { GroupIcon } from './GroupIcon';
import { GroupsIcon } from './GroupsIcon';
import { HardDriveIcon } from './HardDriveIcon';
import { HelpIcon } from './HelpIcon';
import { HistoryIcon } from './HistoryIcon';
import { HomeIcon } from './HomeIcon';
import { HomeStorageIcon } from './HomeStorageIcon';
import { InfoIIcon } from './InfoIIcon';
import { InkEraserIcon } from './InkEraserIcon';
import { InvertColorsIcon } from './InvertColorsIcon';
import { LanguageIcon } from './LanguageIcon';
import { LeaderboardIcon } from './LeaderboardIcon';
import { LibraryBooksIcon } from './LibraryBooksIcon';
import { LightModeIcon } from './LightModeIcon';
import { LinkIcon } from './LinkIcon';
import { LinkOffIcon } from './LinkOffIcon';
import { ListIcon } from './ListIcon';
import { LoadingIcon } from './LoadingIcon';
import { LocationCityIcon } from './LocationCityIcon';
import { LocationOnIcon } from './LocationOnIcon';
import { LockClockIcon } from './LockClockIcon';
import { LockIcon } from './LockIcon';
import { LockPersonIcon } from './LockPersonIcon';
import { LoginIcon } from './LoginIcon';
import { LogoutIcon } from './LogoutIcon';
import { MailIcon } from './MailIcon';
import { ManageAccountsIcon } from './ManageAccountsIcon';
import { ManageSearchIcon } from './ManageSearchIcon';
import { ManufacturingIcon } from './ManufacturingIcon';
import { MenuBookIcon } from './MenuBookIcon';
import { MenuIcon } from './MenuIcon';
import { MoreTimeIcon } from './MoreTimeIcon';
import { MoreVertIcon } from './MoreVertIcon';
import { NavigateBeforeIcon } from './NavigateBeforeIcon';
import { NavigateNextIcon } from './NavigateNextIcon';
import { NewReleasesIcon } from './NewReleasesIcon';
import { NoteAddIcon } from './NoteAddIcon';
import { NoteIcon } from './NoteIcon';
import { NotificationsActiveIcon } from './NotificationsActiveIcon';
import { OpenInNewIcon } from './OpenInNewIcon';
import { PageInfoIcon } from './PageInfoIcon';
import { PaletteIcon } from './PaletteIcon';
import { PanToolIcon } from './PanToolIcon';
import { PauseCircleIcon } from './PauseCircleIcon';
import { PendingActionsIcon } from './PendingActionsIcon';
import { PendingIcon } from './PendingIcon';
import { PersonIcon } from './PersonIcon';
import { PhotoLibraryIcon } from './PhotoLibraryIcon';
import { PictureAsPdfIcon } from './PictureAsPdfIcon';
import { PlayArrowIcon } from './PlayArrowIcon';
import { PlayCircleIcon } from './PlayCircleIcon';
import { PostAddIcon } from './PostAddIcon';
import { PreviewIcon } from './PreviewIcon';
import { PriorityHighIcon } from './PriorityHighIcon';
import { PublicIcon } from './PublicIcon';
import { PublishIcon } from './PublishIcon';
import { RedoIcon } from './RedoIcon';
import { RefreshIcon } from './RefreshIcon';
import { ReplyAllIcon } from './ReplyAllIcon';
import { ReplyIcon } from './ReplyIcon';
import { SaveIcon } from './SaveIcon';
import { ScheduleIcon } from './ScheduleIcon';
import { SchoolIcon } from './SchoolIcon';
import { SearchIcon } from './SearchIcon';
import { SendIcon } from './SendIcon';
import { SettingsAlertIcon } from './SettingsAlertIcon';
import { SettingsIcon } from './SettingsIcon';
import { SettingsSuggestIcon } from './SettingsSuggestIcon';
import { ShareIcon } from './ShareIcon';
import { SideNavigationIcon } from './SideNavigationIcon';
import { SmartToyIcon } from './SmartToyIcon';
import { SpeedIcon } from './SpeedIcon';
import { StepIntoIcon } from './StepIntoIcon';
import { StepOutIcon } from './StepOutIcon';
import { StopCircleIcon } from './StopCircleIcon';
import { StorageIcon } from './StorageIcon';
import { StylusLaserPointerIcon } from './StylusLaserPointerIcon';
import { StylusNoteIcon } from './StylusNoteIcon';
import { SupportAgentIcon } from './SupportAgentIcon';
import { SyncIcon } from './SyncIcon';
import { TableEyeIcon } from './TableEyeIcon';
import { TableIcon } from './TableIcon';
import { TaskIcon } from './TaskIcon';
import { TimerIcon } from './TimerIcon';
import { TrendingUpIcon } from './TrendingUpIcon';
import { TrophyIcon } from './TrophyIcon';
import { UndoIcon } from './UndoIcon';
import { UpdateIcon } from './UpdateIcon';
import { VerticalSplitIcon } from './VerticalSplitIcon';
import { ViewCozyIcon } from './ViewCozyIcon';
import { ViewHeadlineIcon } from './ViewHeadlineIcon';
import { ViewModuleIcon } from './ViewModuleIcon';
import { VisibilityIcon } from './VisibilityIcon';
import { VisibilityOffIcon } from './VisibilityOffIcon';
import { VoidIcon } from './VoidIcon';
import { WarningIcon } from './WarningIcon';
import { WidgetsIcon } from './WidgetsIcon';

const meta: Meta<typeof AccountCircleIcon> = {
  component: AccountCircleIcon,
  argTypes: {
    size: {
      options: ['huge', 'large', 'regular', 'small', 'tiny'],
      control: {
        type: 'select',
        labels: {
          huge: 'huge (30px)', // 12
          large: 'large (27px)', // 12
          regular: 'regular (24px)', // 6
          small: 'small (21px)', // 6
          tiny: 'tiny (18px)',
        },
      },
    },
    filledCircle: { control: { type: 'boolean' } },
    filledSquare: { control: { type: 'boolean' } },
    circle: { control: { type: 'boolean' } },
    square: { control: { type: 'boolean' } },
    strikethrough: { control: { type: 'boolean' } },
    rotate: { control: { type: 'number', value: 0 } },
    letter: { control: { type: 'text' } },
    onClick: {},
    style: {},
    className: { control: { type: 'text' } },
  },
};

export default meta;

export const Google: FC<BasicIconProps> = (args) => {
  const icons = {
    AcUnitIcon,
    AccountCircleIcon,
    AcuteIcon,
    AddColumnLeftIcon,
    AddColumnRightIcon,
    AddIcon,
    AddPhotoAlternateIcon,
    AddReactionIcon,
    AddRowAboveIcon,
    AddRowBelowIcon,
    AdminPanelSettingsIcon,
    AlarmIcon,
    AppsIcon,
    ArrowBackIcon,
    ArrowDownwardIcon,
    ArrowDropDownIcon,
    ArrowDropUpIcon,
    ArrowForwardIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpwardIcon,
    ArticleIcon,
    AssignmentIcon,
    AttachFileIcon,
    AttachmentIcon,
    AutorenewIcon,
    BadgeIcon,
    BoltIcon,
    BubbleChartIcon,
    BuildIcon,
    CalendarMonthIcon,
    CalendarTodayIcon,
    CalendarViewWeekIcon,
    CheckIcon,
    ChecklistIcon,
    CloseIcon,
    CloudDownloadIcon,
    CloudUploadIcon,
    CodeBlocksIcon,
    CodeIcon,
    CommentIcon,
    ContactPhoneIcon,
    ContactsIcon,
    ContentCopyIcon,
    DarkModeIcon,
    DashboardIcon,
    DeleteIcon,
    DemographyIcon,
    DescriptionIcon,
    DesignServicesIcon,
    DownloadIcon,
    DraftIcon,
    DragIndicatorIcon,
    EditIcon,
    EditNoteIcon,
    ErrorIcon,
    EventIcon,
    EventListIcon,
    ExclamationIcon,
    ExpandLessIcon,
    ExpandMoreIcon,
    ExtensionIcon,
    FileCopyIcon,
    FileOpenIcon,
    FilterListIcon,
    FolderIcon,
    FolderManagedIcon,
    FolderOpenIcon,
    FormatBoldIcon,
    FormatH1Icon,
    FormatH2Icon,
    FormatH3Icon,
    FormatH4Icon,
    FormatH5Icon,
    FormatH6Icon,
    FormatInkHighlighterIcon,
    FormatItalicIcon,
    FormatListBulletedIcon,
    FormatListNumberedIcon,
    FormatQuoteIcon,
    FormatStrikethroughIcon,
    ForwardIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    GlobeIcon,
    GroupAddIcon,
    GroupIcon,
    GroupsIcon,
    HardDriveIcon,
    HelpIcon,
    HistoryIcon,
    HomeIcon,
    HomeStorageIcon,
    InfoIIcon,
    InkEraserIcon,
    InvertColorsIcon,
    LanguageIcon,
    LeaderboardIcon,
    LibraryBooksIcon,
    LightModeIcon,
    LinkIcon,
    LinkOffIcon,
    ListIcon,
    LoadingIcon,
    LocationCityIcon,
    LockClockIcon,
    LocationOnIcon,
    LockIcon,
    LockPersonIcon,
    LoginIcon,
    LogoutIcon,
    MailIcon,
    ManageAccountsIcon,
    ManageSearchIcon,
    ManufacturingIcon,
    MenuBookIcon,
    MenuIcon,
    MoreTimeIcon,
    MoreVertIcon,
    NavigateBeforeIcon,
    NavigateNextIcon,
    NewReleasesIcon,
    NoteAddIcon,
    NoteIcon,
    NotificationsActiveIcon,
    OpenInNewIcon,
    PageInfoIcon,
    PaletteIcon,
    PanToolIcon,
    PauseCircleIcon,
    PendingActionsIcon,
    PendingIcon,
    PersonIcon,
    PhotoLibraryIcon,
    PictureAsPdfIcon,
    PlayArrowIcon,
    PlayCircleIcon,
    PostAddIcon,
    PreviewIcon,
    PriorityHighIcon,
    PublicIcon,
    PublishIcon,
    RedoIcon,
    RefreshIcon,
    ReplyAllIcon,
    ReplyIcon,
    SaveIcon,
    ScheduleIcon,
    SchoolIcon,
    SearchIcon,
    SendIcon,
    SettingsAlertIcon,
    SettingsIcon,
    SettingsSuggestIcon,
    ShareIcon,
    SideNavigationIcon,
    SpeedIcon,
    StepIntoIcon,
    StepOutIcon,
    StopCircleIcon,
    StorageIcon,
    StylusLaserPointerIcon,
    StylusNoteIcon,
    SupportAgentIcon,
    SyncIcon,
    TableEyeIcon,
    TableIcon,
    TaskIcon,
    TimerIcon,
    TrendingUpIcon,
    TrophyIcon,
    UndoIcon,
    UpdateIcon,
    VerticalSplitIcon,
    ViewCozyIcon,
    ViewHeadlineIcon,
    ViewModuleIcon,
    VisibilityIcon,
    VisibilityOffIcon,
    VoidIcon,
    WarningIcon,
    WidgetsIcon,
    FitnessCenterIcon,
    SmartToyIcon,
    DoneAllIcon,
  };

  const [color, setColor] = useState<ColorResult>({
    hex: '',
    hsl: { h: 0, s: 0, l: 0 },
    rgb: { r: 0, g: 0, b: 0 },
  });
  const [filter, setFilter] = useState('');

  return (
    <MockupJukiProvider>
      <h3>icons</h3>
      <div className="jk-row extend">
        <InputColor value={color} onChange={setColor} label={<T className="tt-se">color</T>} />
        <Input value={filter} onChange={setFilter} label={<T className="tt-se">filter</T>} />
      </div>
      <div className="jk-row block gap" style={{ color: color.hex, height: '100%', width: '100%', overflow: 'auto' }}>
        {Object.entries(icons)
          .filter(([iconName]) => (filter ? iconName.toLowerCase().includes(filter.toLowerCase()) : true))
          .sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2))
          .map(([iconName, Component]) => (
            <div className="jk-row gap nowrap center" key={iconName}>
              <Component {...args} />
              <div className="tx-t" style={{ width: 140 }}>
                {iconName}
              </div>
            </div>
          ))}
      </div>
    </MockupJukiProvider>
  );
};
