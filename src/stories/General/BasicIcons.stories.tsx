import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { ToggleThemeButton } from '../ToggleThemeButton';

import {
  AssignmentIcon_,
  AtSignIcon,
  BasicIconProps,
  BugIcon,
  BuildIcon,
  CityIcon,
  ClockIcon,
  CloudDownloadIcon,
  CloudUploadIcon_,
  ConstructionIcon,
  CopyFileIcon,
  CopyIcon_,
  CopyToClipboard,
  CupIcon,
  CurvedArrowIcon,
  CutIcon,
  DeleteIcon_,
  DownloadIcon,
  DownloadIcon_,
  DragIcon,
  EditIcon_,
  EnterFullScreenIcon,
  ErlenmeyerFlaskIcon,
  ExitFullScreenIcon,
  ExtensionIcon,
  ExternalIcon_,
  EyeIcon_,
  EyeInvisibleIcon,
  FileIcon,
  FilterIcon_,
  GavelIcon,
  GearsIcon,
  GmailIcon,
  GroupIcon_,
  HeadlineIcon_,
  HeadsetMicIcon,
  HomeIcon,
  LeaderboardIcon_,
  LightBulbIcon,
  LinkedInIcon,
  LoadingIcon_,
  LockIcon_,
  MailIcon_,
  MailOpenedIcon,
  MenuIcon,
  NotificationProvider,
  NotificationsActiveIcon,
  NotificationsIcon,
  NotificationsPausedIcon,
  PasteIcon,
  PeopleIcon,
  PersonIcon_,
  PhoneIcon,
  PlaceIcon,
  PlayIcon_,
  QuestionAnswerIcon,
  ReloadIcon,
  SaveIcon_,
  SchoolIcon_,
  SearchIcon_,
  SettingIcon_,
  ShareIcon_,
  SnowflakeIcon,
  SpinIcon,
  StarIcon,
  TelegramIcon,
  ThumbUpIcon,
  TodayIcon,
  UnorderedListIcon,
  ViewModuleIcon,
  ViewSideIcon,
} from '../../index';

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

export const Basic: Story<BasicIconProps & { color: string }> = ({ color, ...props }) => {
  const icons = {
    AssignmentIcon_,
    AtSignIcon,
    BugIcon,
    BuildIcon,
    CityIcon,
    ClockIcon,
    CloudDownloadIcon,
    CloudUploadIcon_,
    ConstructionIcon,
    CopyFileIcon,
    CopyIcon_,
    CupIcon,
    CurvedArrowIcon,
    CutIcon,
    DownloadIcon,
    DragIcon,
    EnterFullScreenIcon,
    ErlenmeyerFlaskIcon,
    ExitFullScreenIcon,
    ExtensionIcon,
    ExternalIcon_,
    EyeIcon_,
    EyeInvisibleIcon,
    FileIcon,
    FilterIcon_,
    GavelIcon,
    GearsIcon,
    HeadlineIcon_,
    HomeIcon,
    LightBulbIcon,
    LinkedInIcon,
    MailOpenedIcon,
    MenuIcon,
    NotificationsActiveIcon,
    NotificationsIcon,
    NotificationsPausedIcon,
    PasteIcon,
    PeopleIcon,
    PersonIcon_,
    PhoneIcon,
    PlaceIcon,
    PlayIcon_,
    QuestionAnswerIcon,
    ReloadIcon,
    SearchIcon_,
    SettingIcon_,
    ShareIcon_,
    SnowflakeIcon,
    SpinIcon,
    StarIcon,
    ThumbUpIcon,
    TodayIcon,
    UnorderedListIcon,
    ViewModuleIcon,
    ViewSideIcon,
    HeadsetMicIcon,
    TelegramIcon,
    GmailIcon,
    DownloadIcon_,
    LeaderboardIcon_,
    MailIcon_,
    LockIcon_,
    DeleteIcon_,
    SchoolIcon_,
    SaveIcon_,
    EditIcon_,
    LoadingIcon_,
    GroupIcon_,
  };
  return (
    <NotificationProvider>
      <div className="jk-row block gap" style={{ color }}>
        {Object.entries(icons)
          .sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2))
          .map(([iconName, Component]) => (
            <div className="jk-row nowrap center">
              <Component {...props} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>{iconName}</div>
            </div>
          ))}
        <CopyToClipboard text={'texto copiado'}><CopyIcon_ /></CopyToClipboard>
        <ToggleThemeButton />
      </div>
    </NotificationProvider>
  );
};
