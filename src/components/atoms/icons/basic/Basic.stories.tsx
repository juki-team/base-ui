import { Meta } from '@storybook/react';
import React, { FC, useState } from 'react';
import { ColorResult } from 'react-color';
import { MockupJukiProvider } from '../../../mockup';
import { InputColor } from '../../../molecules';
import { GmailIcon, TelegramIcon } from '../specials';
import { BasicIconProps } from '../types';

import {
  AssignmentIcon_,
  AtSignIcon,
  BugIcon,
  _BuildIcon,
  CityIcon,
  ClockIcon,
  CloudDownloadIcon,
  CloudUploadIcon_,
  ConstructionIcon,
  CopyFileIcon,
  CopyIcon,
  CupIcon,
  CurvedArrowIcon,
  CutIcon,
  DeleteIcon_,
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
  GroupIcon_,
  HeadlineIcon_,
  HeadsetMicIcon,
  HomeIcon_,
  LeaderboardIcon_,
  LightBulbIcon,
  LinkedInIcon,
  LockIcon_,
  MailIcon_,
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
  SaveIcon_,
  SchoolIcon_,
  SearchIcon_,
  SettingIcon_,
  ShareIcon_,
  SnowflakeIcon,
  StarIcon,
  ThumbUpIcon,
  TodayIcon,
  UnorderedListIcon,
  ViewModuleIcon,
  ViewSideIcon,
} from './';

const meta: Meta<typeof AtSignIcon> = {
  component: AtSignIcon,
  argTypes: {
    circle: { control: { type: 'boolean' } },
    square: { control: { type: 'boolean' } },
    filledCircle: { control: { type: 'boolean' } },
    filledSquare: { control: { type: 'boolean' } },
    strikethrough: { control: { type: 'boolean' } },
  },
};

export default meta;

export const Regular: FC<BasicIconProps> = (args) => {
  const icons = {
    AssignmentIcon_,
    AtSignIcon,
    BugIcon,
    BuildIcon: _BuildIcon,
    CityIcon,
    ClockIcon,
    CloudDownloadIcon,
    CloudUploadIcon_,
    ConstructionIcon,
    CopyFileIcon,
    CopyIcon,
    CupIcon,
    CurvedArrowIcon,
    CutIcon,
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
    HomeIcon_,
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
    GroupIcon_,
  };
  
  const [ color, setColor ] = useState<ColorResult>({ hex: '', hsl: { h: 0, s: 0, l: 0 }, rgb: { r: 0, g: 0, b: 0 } });
  
  return (
    <MockupJukiProvider>
      <div className="jk-row extend">
        <InputColor color={color} onChange={setColor} />
      </div>
      <div className="jk-row block gap" style={{ color: color.hex }}>
        {Object.entries(icons)
          .sort(([ iconName1 ], [ iconName2 ]) => iconName1.localeCompare(iconName2))
          .map(([ iconName, Component ]) => (
            <div className="jk-row nowrap center">
              <Component {...args} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>{iconName}</div>
            </div>
          ))}
      </div>
    </MockupJukiProvider>
  );
};
