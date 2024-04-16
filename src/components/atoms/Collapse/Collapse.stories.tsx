import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { UpIcon } from '../icons';

import { Collapse } from './Collapse';

const meta: Meta<typeof Collapse> = {
  component: Collapse,
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div>
        <Collapse
          {...args}
          header={({ isOpen, toggle, isFullyOpened, isFullyClosed }) => (
            <div className="jk-row center gap bc-ss">
              Collapse Header
              <div>
                {!isFullyClosed && !isFullyOpened ? 'transition' : null}
                {isFullyClosed ? 'fully-closed' : null}
                {isFullyOpened ? 'fully-opened' : null}
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
    </MockupJukiProvider>
  ),
};
