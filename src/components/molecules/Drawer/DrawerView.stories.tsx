import { Meta, StoryObj } from '@storybook/react-webpack5';
import { DrawerView as DrawerViewComponent, MdMathViewer } from '../../../index';
import { MockupToggleThemeButton } from '../../mockup';
import { SAMPLE_MD_CONTENT } from '../../organisms/mdMath/constants';

const meta: Meta<typeof DrawerViewComponent> = {
  component: DrawerViewComponent,
};

export default meta;

type Story = StoryObj<typeof DrawerViewComponent>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ height: '500px' }}>
      <DrawerViewComponent {...args}>
        <div style={{ width: 250 }}>
          <MdMathViewer source={SAMPLE_MD_CONTENT} />
        </div>
      </DrawerViewComponent>
      <MockupToggleThemeButton />
    </div>
  ),
};
