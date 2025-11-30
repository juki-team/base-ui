import { Meta, StoryObj } from '@storybook/react-webpack5';
import { T } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { DownloadIcon, OpenInNewIcon } from '../../server';
import { FloatToolbar } from './FloatToolbar';

const meta: Meta<typeof FloatToolbar> = {
  component: FloatToolbar,
};

export default meta;

type Story = StoryObj<typeof FloatToolbar>;

export const Regular: Story = {
  render: () => {
    const actionButtons = [
      {
        icon: <DownloadIcon />,
        buttons: [
          {
            icon: <DownloadIcon />,
            label: <T>pdf</T>,
            onClick: () => null,
          },
          {
            icon: <OpenInNewIcon />,
            label: <T>md</T>,
            onClick: () => null,
          },
        ],
      },
      {
        icon: <DownloadIcon />,
        buttons: [
          {
            icon: <DownloadIcon />,
            label: <T>pdf</T>,
            onClick: () => null,
          },
          {
            icon: <OpenInNewIcon />,
            label: <T>md</T>,
            onClick: () => null,
          },
        ],
      },
    ];
    
    return (
      <MockupJukiProvider>
        <div
          style={{
            background: 'red',
            width: 300,
            height: 300,
            position: 'relative',
          }}
        >
          <FloatToolbar actionButtons={actionButtons} placement="left-start" />
        </div>
      </MockupJukiProvider>
    );
  },
};
