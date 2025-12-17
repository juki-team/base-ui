import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { MockupToggleThemeButton } from '../../mockup';
import { MdMathViewer } from '../../organisms';
import { SAMPLE_MD_CONTENT } from '../../organisms/MdMathViewer/constants';
import { Drawer as DrawerComponent } from './Drawer';

const meta: Meta<typeof DrawerComponent> = {
  component: DrawerComponent,
};

export default meta;

type Story = StoryObj<typeof DrawerComponent>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ height: '500px' }}>
      <DrawerComponent
        {...args}
        content={
          <div style={{ width: 250 }}>
            <MdMathViewer source={SAMPLE_MD_CONTENT} />
          </div>
        }
      >
        <Button>click me</Button>
        <MockupToggleThemeButton />
      </DrawerComponent>
    </div>
  ),
};
