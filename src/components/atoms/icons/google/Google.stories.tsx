import { Meta } from "@storybook/react";
import React, { FC, useState } from "react";
import { ColorResult } from "react-color";
import { MockupJukiProvider } from "../../../mockup";
import { InputColor } from "../../../molecules";
import { Input } from "../../inputs";
import { T } from "../../T";
import { BasicIconProps } from "../types";

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
  BubbleChartIcon,
  BuildIcon,
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
  ExtensionIcon,
  FilterListIcon,
  FolderIcon,
  FolderManagedIcon,
  FolderOpenIcon,
  ForwardIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  GlobeIcon,
  GroupAddIcon,
  GroupIcon,
  HardDriveIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  HomeStorageIcon,
  InfoIcon,
  InvertColorsIcon,
  LanguageIcon,
  LeaderboardIcon,
  LibraryBooksIcon,
  LightModeIcon,
  LinkIcon,
  ListIcon,
  LoadingIcon,
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
  MoreTimeIcon,
  NavigateBeforeIcon,
  NavigateNextIcon,
  NewReleasesIcon,
  NoteAddIcon,
  NoteIcon,
  OpenInNewIcon,
  PageInfoIcon,
  PaletteIcon,
  PendingActionsIcon,
  PendingIcon,
  PersonIcon,
  PhotoLibraryIcon,
  PictureAsPdfIcon,
  PlayArrowIcon,
  PlayCircleIcon,
  PostAddIcon,
  PreviewIcon,
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
  StopCircleIcon,
  StorageIcon,
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
  VoidIcon,
  WarningIcon,
} from "./";

const meta: Meta<typeof AccountCircleIcon> = {
  component: AccountCircleIcon,
  argTypes: {
    size: {
      options: ["huge", "large", "regular", "small", "tiny"],
      control: {
        type: "select",
        labels: {
          huge: "huge (48px)", // 12
          large: "large (36px)", // 12
          regular: "regular (24px)", // 6
          small: "small (18px)", // 6
          tiny: "tiny (12px)",
        },
      },
    },
    filledCircle: { control: { type: "boolean" } },
    filledSquare: { control: { type: "boolean" } },
    strikethrough: { control: { type: "boolean" } },
    rotate: { control: { type: "number", value: 0 } },
    letter: { control: { type: "text" } },
    onClick: {},
    style: {},
    className: { control: { type: "text" } },
  },
};

export default meta;

export const Google: FC<BasicIconProps> = (args) => {
  const icons = {
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
    BuildIcon,
    ArrowUpwardIcon,
    ArticleIcon,
    AssignmentIcon,
    AttachFileIcon,
    AttachmentIcon,
    AutorenewIcon,
    BadgeIcon,
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
    ExtensionIcon,
    FilterListIcon,
    FolderIcon,
    FolderOpenIcon,
    ForwardIcon,
    StorageIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    GroupAddIcon,
    GroupIcon,
    HardDriveIcon,
    HelpIcon,
    HistoryIcon,
    HomeStorageIcon,
    InfoIcon,
    InvertColorsIcon,
    LanguageIcon,
    LeaderboardIcon,
    LibraryBooksIcon,
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
    OpenInNewIcon,
    PaletteIcon,
    PendingActionsIcon,
    PendingIcon,
    PersonIcon,
    PhotoLibraryIcon,
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
    SearchIcon,
    PublicIcon,
    PublishIcon,
    LockPersonIcon,
    HomeIcon,
    ManufacturingIcon,
    PageInfoIcon,
    FolderManagedIcon,
    BubbleChartIcon,
    GlobeIcon,
    VoidIcon,
  };

  const [color, setColor] = useState<ColorResult>({
    hex: "",
    hsl: { h: 0, s: 0, l: 0 },
    rgb: { r: 0, g: 0, b: 0 },
  });
  const [filter, setFilter] = useState("");

  return (
    <MockupJukiProvider>
      <h3>icons</h3>
      <div className="jk-row extend">
        <InputColor
          color={color}
          onChange={setColor}
          label={<T className="tt-se">color</T>}
        />
        <Input
          value={filter}
          onChange={setFilter}
          label={<T className="tt-se">filter</T>}
        />
      </div>
      <div className="jk-row block gap" style={{ color: color.hex }}>
        {Object.entries(icons)
          .filter(([iconName]) =>
            filter
              ? iconName.toLowerCase().includes(filter.toLowerCase())
              : true,
          )
          .sort(([iconName1], [iconName2]) =>
            iconName1.localeCompare(iconName2),
          )
          .map(([iconName, Component]) => (
            <div className="jk-row gap nowrap center">
              <Component {...args} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>
                {iconName}
              </div>
            </div>
          ))}
      </div>
    </MockupJukiProvider>
  );
};
