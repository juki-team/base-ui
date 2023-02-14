import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  AppsIcon,
  AppstoreIcon,
  BalloonIcon,
  CaretLeftIcon,
  CodeIcon_,
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
  PlayCircleIcon_,
  ReadIcon,
  TaskIcon_,
  UploadIcon,
  WarningIcon_,
  ZoomInIcon,
  ZoomOutIcon,
} from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';

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
            <td>BalloonIcon 20%</td>
            <td><BalloonIcon {...props} percent={20} /></td>
          </tr>
          <tr>
            <td>BalloonIcon 60%</td>
            <td><BalloonIcon {...props} percent={60} /></td>
          </tr>
          <tr>
            <td>BalloonIcon 90%</td>
            <td><BalloonIcon {...props} percent={90} /></td>
          </tr>
          <tr>
            <td>CaretLeftIcon</td>
            <td><CaretLeftIcon {...props} /></td>
          </tr>
          <tr>
            <td>CodeIcon_</td>
            <td><CodeIcon_ {...props} /></td>
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
            <td>PlayCircleIcon_</td>
            <td><PlayCircleIcon_ {...props} /></td>
          </tr>
          <tr>
            <td>ReadIcon</td>
            <td><ReadIcon {...props} /></td>
          </tr>
          <tr>
            <td>TaskIcon_</td>
            <td><TaskIcon_ {...props} /></td>
          </tr>
          <tr>
            <td>UploadIcon</td>
            <td><UploadIcon {...props} /></td>
          </tr>
          <tr>
            <td>ZoomInIcon</td>
            <td><ZoomInIcon {...props} /></td>
          </tr>
          <tr>
            <td>ZoomOutIcon</td>
            <td><ZoomOutIcon {...props} /></td>
          </tr>
          <tr>
            <td>WarningIcon_</td>
            <WarningIcon_ {...props} />
          </tr>
        </tbody>
      </table>
      <ToggleThemeButton />
    </>
  );
};

Icons.args = {
  onClick: action('onClick'),
};
