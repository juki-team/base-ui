import { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';
import { MockupJukiProvider } from '../components/mockup';
import { useUIStore } from '../stores/ui/useUIStore';

const Image = () => <div></div>;

const meta: Meta<typeof Image> = {
  component: Image,
};

export default meta;

type Story = StoryObj<typeof Image>;

const Images = ({ src }: { src: string }) => {
  const { Image } = useUIStore(store => store.components);
  return (
    <Image src={src} alt="juki-hello" fill />
  );
};

export const Regular: Story = {
  render: (_) => {
    const images = [
      'https://images.juki.pub/assets/image-es.png',
      'https://images.juki.pub/assets/image-us.png',
      'https://images.juki.pub/assets/juki-app-horizontal-white-logo.svg',
      'https://images.juki.pub/assets/juki-coach-horizontal-color-logo.png',
      'https://images.juki.pub/assets/juki-coach-horizontal-white-logo.png',
      'https://images.juki.pub/assets/juki-coach-vertical-color-logo.png',
      'https://images.juki.pub/assets/juki-coach-vertical-white-logo.png',
      'https://images.juki.pub/assets/juki-complete-laptop.png',
      'https://images.juki.pub/assets/juki-head.png',
      'https://images.juki.pub/assets/juki-head.svg',
      'https://images.juki.pub/assets/juki-hello.png',
      'https://images.juki.pub/assets/juki-image-hello.png',
      'https://images.juki.pub/assets/juki-image-judge.png',
      'https://images.juki.pub/assets/juki-image-laptop.png',
      'https://images.juki.pub/assets/juki-image-surprised.png',
      'https://images.juki.pub/assets/juki-judge-court.png',
      'https://images.juki.pub/assets/juki-judge-horizontal-color-logo.png',
      'https://images.juki.pub/assets/juki-judge-horizontal-white-logo.png',
      'https://images.juki.pub/assets/juki-judge-vertical-color-logo.png',
      'https://images.juki.pub/assets/juki-judge-vertical-white-logo.png',
      'https://images.juki.pub/assets/juki-utils-horizontal-color-logo.png',
      'https://images.juki.pub/assets/juki-utils-horizontal-white-logo.png',
      'https://images.juki.pub/assets/juki-utils-vertical-color-logo.png',
      'https://images.juki.pub/assets/juki-utils-vertical-white-logo.png',
      'https://images.juki.pub/assets/leetcode-logo-color.svg',
    ];
    
    return (
      <MockupJukiProvider>
        <div
          style={{ color: '#164066', backgroundColor: '#F0F2F5' }}
          className="jk-col"
        >
          {images
            .sort()
            .map((src) => (
              <div className="jk-row nowrap center block">
                <div style={{ width: '200px', height: '200px' }}>
                  <Images src={src} />
                </div>
                <div className="tx-t cr-g1" style={{ width: 140 }}>
                  {src}
                </div>
              </div>
            ))}
        </div>
      </MockupJukiProvider>
    );
  },
};

Regular.args = {
  onClick: action('onClick'),
};
