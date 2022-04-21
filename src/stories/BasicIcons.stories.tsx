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
  CutIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ErlenmeyerFlaskIcon,
  ExtensionIcon,
  ExternalIcon,
  EyeIcon,
  EyeInvisibleIcon,
  FileIcon,
  FilterIcon,
  GavelIcon,
  GroupIcon,
  HeadlineIcon,
  HomeIcon,
  LeaderboardIcon,
  LightbulbIcon,
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
  SettingIcon,
  ShareIcon,
  SpinIcon,
  StarIcon,
  ThumbUpIcon,
  TodayIcon,
  UnorderedListIcon,
  ViewModuleIcon,
} from '../index';

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
    BugIcon,
    BuildIcon,
    CityIcon,
    ClockIcon,
    CloudUploadIcon,
    ConstructionIcon,
    CupIcon,
    DeleteIcon,
    DownloadIcon,
    EditIcon,
    ErlenmeyerFlaskIcon,
    PlayIcon,
    ExtensionIcon,
    EyeIcon,
    EyeInvisibleIcon,
    FileIcon,
    FilterIcon,
    GavelIcon,
    GroupIcon,
    HeadlineIcon,
    HomeIcon,
    LeaderboardIcon,
    LightbulbIcon,
    LoadingIcon,
    MailIcon,
    MailOpenedIcon,
    MenuIcon,
    NotificationsIcon,
    NotificationsActiveIcon,
    NotificationsPausedIcon,
    PeopleIcon,
    PersonIcon,
    PlaceIcon,
    QuestionAnswerIcon,
    ReloadIcon,
    SaveIcon,
    SchoolIcon,
    SettingIcon,
    ShareIcon,
    SpinIcon,
    StarIcon,
    ThumbUpIcon,
    TodayIcon,
    UnorderedListIcon,
    ViewModuleIcon,
    PhoneIcon,
    AtSignIcon,
    LinkedInIcon,
    AssignmentIcon,
    ExternalIcon,
    CopyIcon,
    CopyFileIcon,
    PasteIcon,
    CutIcon,
    LockIcon,
  };
  return (
    <NotificationProvider>
      <div className="jk-row block gap" style={{ color }}>
        {Object.entries(icons).sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2)).map(([iconName, Component]) => (
          <div className="jk-row nowrap center">
            <Component {...props} />
            <div className="text-xs color-gray-1" style={{ width: 140 }}>{iconName}</div>
          </div>
        ))}
        <CopyToClipboard text={'texto copiado'}><CopyIcon /></CopyToClipboard>
      </div>
    </NotificationProvider>
  );
};
