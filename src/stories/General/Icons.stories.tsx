import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  AppsIcon,
  AppstoreIcon,
  BalloonIcon,
  CaretLeftIcon,
  CodeIcon,
  CopyIcon,
  DoubleArrowIcon,
  DragIndicatorIcon,
  FacebookIcon,
  FileDoneIcon,
  IconProps,
  LayoutIcon,
  LinkIcon,
  MessagePlusIcon,
  MessageQuestionIcon,
  NoteCodeIcon,
  NoteIcon,
  PlayCircleIcon,
  ReadIcon,
  TaskIcon,
  UploadIcon,
  WarningIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '../../index';

export default {
  title: 'Components/General/Icons',
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
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
    circle: {
      control: {
        type: 'boolean',
        // value: false,
      },
    },
    square: {
      control: {
        type: 'boolean',
        // value: false,
      },
    },
    filled: {
      control: {
        type: 'boolean',
        // value: false,
      },
    },
    rotate: {
      control: {
        type: 'number',
        value: 0,
      },
    },
    onClick: {},
    style: {},
    className: {
      control: {
        type: 'text',
      },
    },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Icons: Story<IconProps> = ({ ...props }) => {
  return (
    <>
      <table style={{ color: 'green' }}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Icon</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>AppsIcon</td>
          <td><AppsIcon {...props} /></td>
        </tr>
        <tr>
          <td>AppstoreIcon</td>
          <td><AppstoreIcon {...props} /></td>
        </tr>
        <tr>
          <td>BalloonIcon</td>
          <td><BalloonIcon {...props} /></td>
        </tr>
        <tr>
          <td>CaretLeftIcon</td>
          <td><CaretLeftIcon {...props} /></td>
        </tr>
        <tr>
          <td>CodeIcon</td>
          <td><CodeIcon {...props} /></td>
        </tr>
        <tr>
          <td>CopyIcon</td>
          <td><CopyIcon {...props} /></td>
        </tr>
        <tr>
          <td>DoubleArrowIcon</td>
          <td><DoubleArrowIcon {...props} /></td>
        </tr>
        <tr>
          <td>DragIndicatorIcon</td>
          <td><DragIndicatorIcon {...props} /></td>
        </tr>
        <tr>
          <td>FacebookIcon</td>
          <td><FacebookIcon {...props} /></td>
        </tr>
        <tr>
          <td>FileDoneIcon</td>
          <td><FileDoneIcon {...props} /></td>
        </tr>
        <tr>
          <td>LayoutIcon</td>
          <td><LayoutIcon {...props} /></td>
        </tr>
        <tr>
          <td>LinkIcon</td>
          <td><LinkIcon {...props} /></td>
        </tr>
        <tr>
          <td>MessagePlusIcon</td>
          <td><MessagePlusIcon {...props} /></td>
        </tr>
        <tr>
          <td>MessageQuestionIcon</td>
          <td><MessageQuestionIcon {...props} /></td>
        </tr>
        <tr>
          <td>NoteIcon</td>
          <td><NoteIcon {...props} /></td>
        </tr>
        <tr>
          <td>NoteCodeIcon</td>
          <td><NoteCodeIcon {...props} /></td>
        </tr>
        <tr>
          <td>PlayCircleIcon</td>
          <td><PlayCircleIcon {...props} /></td>
        </tr>
        <tr>
          <td>ReadIcon</td>
          <td><ReadIcon {...props} /></td>
        </tr>
        <tr>
          <td>TaskIcon</td>
          <td><TaskIcon {...props} /></td>
        </tr>
        <tr>
          <td>UploadIcon</td>
          <td><UploadIcon {...props} /></td>
        </tr>
        <tr>
          <td>WarningIcon</td>
          <td><WarningIcon {...props} /></td>
        </tr>
        <tr>
          <td>ZoomInIcon</td>
          <td><ZoomInIcon {...props} /></td>
        </tr>
        <tr>
          <td>ZoomOutIcon</td>
          <td><ZoomOutIcon {...props} /></td>
        </tr>
        </tbody>
      </table>
    </>
  );
};

Icons.args = {
  onClick: action('onClick'),
};