import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  AddIcon,
  AppsIcon,
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  AssignmentIcon,
  AttachFileIcon,
  AttachmentIcon,
  AutorenewIcon,
  BasicIconProps,
  CheckIcon,
  CloseIcon,
  ContentCopyIcon,
  DeleteIcon, DemographyIcon,
  DownloadIcon,
  DraftIcon,
  DragIndicatorIcon,
  EditIcon,
  ErrorIcon,
  ExpandMoreIcon,
  FilterListIcon,
  FolderOpenIcon,
  ForwardIcon,
  FullscreenExitIcon,
  FullscreenIcon, GroupAddIcon, GroupIcon,
  InfoIcon,
  LeaderboardIcon,
  LinkIcon,
  ListIcon,
  LoadingIcon,
  LocationOnIcon,
  LockIcon,
  MailIcon,
  NavigateBeforeIcon,
  NavigateNextIcon,
  NotificationProvider,
  OpenInNewIcon,
  PlayArrowIcon,
  PreviewIcon,
  RedoIcon,
  RefreshIcon,
  ReplyAllIcon,
  ReplyIcon,
  SaveIcon,
  SchoolIcon,
  SendIcon,
  SettingsIcon,
  SupportAgentIcon,
  SyncIcon,
  UndoIcon,
  VerticalSplitIcon,
  ViewCozyIcon,
  ViewHeadlineIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  WarningIcon,
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
      </div>
    </NotificationProvider>
  );
};
