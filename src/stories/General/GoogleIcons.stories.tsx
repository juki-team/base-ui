import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  AccountCircleIcon,
  AcuteIcon,
  AddIcon,
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
  BasicIconProps,
  CalendarMonthIcon,
  CalendarTodayIcon,
  CheckIcon,
  ChecklistIcon,
  CloseIcon,
  CloudUploadIcon,
  CodeIcon,
  ContactsIcon,
  ContentCopyIcon,
  DarkModeIcon,
  DashboardIcon,
  DeleteIcon,
  DemographyIcon,
  DescriptionIcon,
  DownloadIcon,
  DraftIcon,
  DragIndicatorIcon,
  EditIcon,
  EditNoteIcon,
  ErrorIcon,
  EventIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  FilterListIcon,
  FolderIcon,
  FolderOpenIcon,
  ForwardIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  GroupAddIcon,
  GroupIcon,
  HelpIcon,
  HistoryIcon,
  InfoIcon,
  InvertColorsIcon,
  LanguageIcon,
  LeaderboardIcon,
  LightModeIcon,
  LinkIcon,
  ListIcon,
  LoadingIcon,
  LocationOnIcon,
  LockIcon,
  LoginIcon,
  LogoutIcon,
  MailIcon,
  ManageAccountsIcon,
  ManageSearchIcon,
  MenuBookIcon,
  MoreTimeIcon,
  NavigateBeforeIcon,
  NavigateNextIcon,
  NewReleasesIcon,
  NoteAddIcon,
  NoteIcon,
  NotificationProvider,
  OpenInNewIcon,
  PaletteIcon,
  PendingActionsIcon,
  PersonIcon,
  PictureAsPdfIcon,
  PlayArrowIcon,
  PlayCircleIcon,
  PostAddIcon,
  PreviewIcon,
  RedoIcon,
  RefreshIcon,
  ReplyAllIcon,
  ReplyIcon,
  SaveIcon,
  ScheduleIcon,
  SchoolIcon,
  SendIcon,
  SettingsAlertIcon,
  SettingsIcon,
  SettingsSuggestIcon,
  ShareIcon,
  StopCircleIcon,
  SupportAgentIcon,
  SyncIcon,
  TaskIcon,
  TimerIcon,
  TrendingUpIcon,
  UndoIcon,
  UpdateIcon,
  VerticalSplitIcon,
  ViewCozyIcon,
  ViewHeadlineIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  WarningIcon,
} from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/General/Icons',
  argTypes: {
    color: { control: { type: 'color' } },
    size: {
      options: ['huge', 'large', 'regular', 'small', 'tiny'],
      control: {
        type: 'select',
        labels: {
          huge: 'huge (48px)', // 12
          large: 'large (36px)', // 12
          regular: 'regular (24px)', // 6
          small: 'small (18px)', // 6
          tiny: 'tiny (12px)',
        },
      },
    },
    filledCircle: { control: { type: 'boolean' } },
    filledSquare: { control: { type: 'boolean' } },
    strikethrough: { control: { type: 'boolean' } },
    rotate: { control: { type: 'number', value: 0 } },
    onClick: {},
    style: {},
    className: { control: { type: 'text' } },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Google: Story<BasicIconProps & { color: string }> = ({ color, ...props }) => {
  const icons = {
    LeaderboardIcon,
    SettingsIcon,
    AppsIcon,
    SyncIcon,
    AutorenewIcon,
    AddIcon,
    ArrowDownwardIcon,
    ArrowUpwardIcon,
    AttachFileIcon,
    AttachmentIcon,
    DownloadIcon,
    ExpandMoreIcon,
    FilterListIcon,
    InfoIcon,
    LinkIcon,
    ListIcon,
    LocationOnIcon,
    LockIcon,
    MailIcon,
    NavigateBeforeIcon,
    NavigateNextIcon,
    OpenInNewIcon,
    PlayArrowIcon,
    SchoolIcon,
    SupportAgentIcon,
    VisibilityIcon,
    ContentCopyIcon,
    DeleteIcon,
    DraftIcon,
    SaveIcon,
    EditIcon,
    DragIndicatorIcon,
    CheckIcon,
    RefreshIcon,
    LoadingIcon,
    ErrorIcon,
    WarningIcon,
    CloseIcon,
    VisibilityOffIcon,
    PreviewIcon,
    VerticalSplitIcon,
    ViewHeadlineIcon,
    FolderOpenIcon,
    ViewCozyIcon,
    FullscreenIcon,
    FullscreenExitIcon,
    RedoIcon,
    ForwardIcon,
    ReplyIcon,
    ReplyAllIcon,
    UndoIcon,
    SendIcon,
    AssignmentIcon,
    DemographyIcon,
    GroupAddIcon,
    GroupIcon,
    PlayCircleIcon,
    StopCircleIcon,
    SettingsAlertIcon,
    SettingsSuggestIcon,
    LightModeIcon,
    DarkModeIcon,
    LanguageIcon,
    LogoutIcon,
    LoginIcon,
    ExpandLessIcon,
    InvertColorsIcon,
    PaletteIcon,
    PictureAsPdfIcon,
    NewReleasesIcon,
    HelpIcon,
    CalendarMonthIcon,
    CalendarTodayIcon,
    EventIcon,
    CodeIcon,
    AccountCircleIcon,
    PersonIcon,
    BadgeIcon,
    ManageAccountsIcon,
    AdminPanelSettingsIcon,
    ContactsIcon,
    ArrowBackIcon,
    ArrowForwardIcon,
    ArrowDropDownIcon,
    TrendingUpIcon,
    ArrowDropUpIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ScheduleIcon,
    HistoryIcon,
    TimerIcon,
    UpdateIcon,
    AlarmIcon,
    PendingActionsIcon,
    MoreTimeIcon,
    AcuteIcon,
    DescriptionIcon,
    DashboardIcon,
    EditNoteIcon,
    MenuBookIcon,
    FolderIcon,
    ArticleIcon,
    ManageSearchIcon,
    TaskIcon,
    ChecklistIcon,
    CloudUploadIcon,
    NoteAddIcon,
    PostAddIcon,
    NoteIcon,
    ShareIcon,
  };
  
  return (
    <NotificationProvider>
      <div className="jk-row block gap" style={{ color }}>
        {Object.entries(icons)
          .sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2))
          .map(([iconName, Component]) => (
            <div className="jk-row gap nowrap center">
              <Component {...props} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>{iconName}</div>
            </div>
          ))}
        {/*<CopyToClipboard text={'texto copiado'}><CopyIcon /></CopyToClipboard>*/}
        <ToggleThemeButton />
      </div>
    </NotificationProvider>
  );
};
