import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { UpIcon } from '../server';
import { Collapse } from './Collapse';

const meta: Meta<typeof Collapse> = {
  component: Collapse,
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Regular: Story = {
  play: waitForLoadingToDisappear,
  render: (args) => (
    <MockupJukiProvider>
      <div>
        <Collapse
          {...args}
          header={({ isOpen, toggle/* isFullyOpened, isFullyClosed*/ }) => (
            <div className="jk-row center gap bc-ss">
              Collapse Header
              <div>
                {/*{!isFullyClosed && !isFullyOpened ? 'transition' : null}*/}
                {/*{isFullyClosed ? 'fully-closed' : null}*/}
                {/*{isFullyOpened ? 'fully-opened' : null}*/}
              </div>
              <div onClick={toggle} className="bc-er jk-row">
                Click me
                <UpIcon rotate={isOpen ? 0 : 180} className="link" />
              </div>
            </div>
          )}
        >
          <div style={{ background: 'blue' }}>
            Texto Collapsable
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
          </div>
        </Collapse>
      </div>
      <div className="jk-row left">
        <Collapse
          {...args}
          header={({ isOpen, toggle/* isFullyOpened, isFullyClosed*/ }) => (
            <div className="jk-row center gap bc-ss">
              Collapse ROW Header
              <div>
                {/*{!isFullyClosed && !isFullyOpened ? 'transition' : null}*/}
                {/*{isFullyClosed ? 'fully-closed' : null}*/}
                {/*{isFullyOpened ? 'fully-opened' : null}*/}
              </div>
              <div onClick={toggle} className="bc-er jk-row">
                Click me
                <UpIcon rotate={isOpen ? 0 : 180} className="link" />
              </div>
            </div>
          )}
          direction="row"
        >
          <div style={{ background: 'blue' }}>
            Texto Collapsable
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
            <div>Texto Collapsable</div>
          </div>
        </Collapse>
      </div>
    </MockupJukiProvider>
  ),
};
