import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  AssignmentIcon,
  AtSignIcon,
  BasicIconProps,
  BugIcon,
  BuildIcon,
  CityIcon,
  ClockIcon,
  CloudUploadIcon,
  ConstructionIcon,
  CopyFileIcon,
  CopyIcon,
  CopyToClipboard,
  CupIcon,
  CurvedArrowIcon,
  CutIcon,
  DeleteIcon,
  DownloadIcon,
  DragIcon,
  EditIcon,
  EnterFullScreenIcon,
  ErlenmeyerFlaskIcon,
  ExitFullScreenIcon,
  ExtensionIcon,
  ExternalIcon,
  EyeIcon,
  EyeInvisibleIcon,
  FileIcon,
  FilterIcon,
  GavelIcon,
  GearsIcon,
  GroupIcon,
  HeadlineIcon,
  HomeIcon,
  LeaderboardIcon,
  LightBulbIcon,
  LinkedInIcon,
  LoadingIcon,
  LockIcon,
  MailIcon,
  MailOpenedIcon,
  MenuIcon,
  NotificationProvider,
  NotificationsActiveIcon,
  NotificationsIcon,
  NotificationsPausedIcon,
  PasteIcon,
  PeopleIcon,
  PersonIcon,
  PhoneIcon,
  PlaceIcon,
  PlayIcon,
  QuestionAnswerIcon,
  ReloadIcon,
  SaveIcon,
  SchoolIcon,
  SearchIcon,
  SettingIcon,
  ShareIcon,
  SnowflakeIcon,
  SpinIcon,
  StarIcon,
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
    AssignmentIcon,
    AtSignIcon,
    BugIcon,
    BuildIcon,
    CityIcon,
    ClockIcon,
    CloudUploadIcon,
    ConstructionIcon,
    CopyFileIcon,
    CopyIcon,
    CupIcon,
    CurvedArrowIcon,
    CutIcon,
    DeleteIcon,
    DownloadIcon,
    DragIcon,
    EditIcon,
    EnterFullScreenIcon,
    ErlenmeyerFlaskIcon,
    ExitFullScreenIcon,
    ExtensionIcon,
    ExternalIcon,
    EyeIcon,
    EyeInvisibleIcon,
    FileIcon,
    FilterIcon,
    GavelIcon,
    GearsIcon,
    GroupIcon,
    HeadlineIcon,
    HomeIcon,
    LeaderboardIcon,
    LightBulbIcon,
    LinkedInIcon,
    LoadingIcon,
    LockIcon,
    MailIcon,
    MailOpenedIcon,
    MenuIcon,
    NotificationsActiveIcon,
    NotificationsIcon,
    NotificationsPausedIcon,
    PasteIcon,
    PeopleIcon,
    PersonIcon,
    PhoneIcon,
    PlaceIcon,
    PlayIcon,
    QuestionAnswerIcon,
    ReloadIcon,
    SaveIcon,
    SchoolIcon,
    SearchIcon,
    SettingIcon,
    ShareIcon,
    SnowflakeIcon,
    SpinIcon,
    StarIcon,
    ThumbUpIcon,
    TodayIcon,
    UnorderedListIcon,
    ViewModuleIcon,
    ViewSideIcon,
  };
  return (
    <NotificationProvider>
      <div className="jk-row block gap" style={{ color }}>
        {Object.entries(icons).sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2)).map(([iconName, Component]) => (
          <div className="jk-row nowrap center">
            <Component {...props} />
            <div className="tx-xs cr-g1" style={{ width: 140 }}>{iconName}</div>
          </div>
        ))}
        <CopyToClipboard text={'texto copiado'}><CopyIcon /></CopyToClipboard>
      </div>
    </NotificationProvider>
  );
};
