import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { JukiBaseUiProvider, Popover, PopoverProps } from '../../packages/base-ui';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    visible: {
      control: {
        type: 'radio',
        options: [false, true, undefined],
        // value: undefined,
      },
    },
    triggerOn: {
      control: {
        type: 'select',
        options: ['hover', 'click', ['hover', 'click']],
        // value: 'hover',
      },
    },
    triggerOff: {
      control: {
        type: 'select',
        options: [
          'hover',
          'click',
          'escape',
          ['hover', 'click'],
          ['hover', 'escape'],
          ['click', 'escape'],
          ['hover', 'click', 'escape'],
        ],
        // value: 'hover',
      },
    },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<PopoverProps> = (args) => {
  
  const content = (
    <>
      <h3>title</h3>
      <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit, LoremLoremLoremLoremLoremLorem,
        LoremLoremLoremLoremLoremLorem, LoremLoremLoremLoremLoremLorem
      </div>
    </>
  );
  
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://prod-v1-utils-back.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
    >
      <div style={{ height: '500px', padding: '400px', width: '1000px' }}>
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="topLeft"
        >
          <div style={{ background: 'gray', width: '200px' }}>topLeft</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="top"
        >
          <div style={{ background: 'gray', width: '200px' }}>top</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="topRight"
        >
          <div style={{ background: 'gray', width: '200px' }}>topRight</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="rightTop"
        >
          <div style={{ background: 'gray', width: '200px' }}>rightTop</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="right"
        >
          <div style={{ background: 'gray', width: '200px' }}>right</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="rightBottom"
        >
          <div style={{ background: 'gray', width: '200px' }}>rightBottom</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="bottomRight"
        >
          <div style={{ background: 'gray', width: '200px' }}>bottomRight</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="bottom"
        >
          <div style={{ background: 'gray', width: '200px' }}>bottom</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="bottomLeft"
        >
          <div style={{ background: 'gray', width: '200px' }}>bottomLeft</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="leftBottom"
        >
          <div style={{ background: 'gray', width: '200px' }}>leftBottom</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="left"
        >
          <div style={{ background: 'gray', width: '200px' }}>left</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={<>
            <h3>title</h3>
            <div>Lorem ipsum dolor sit amet, LoremLoremLoremLoremLoremLorem, consectetur adipiscing elit</div>
          </>}
          placement="leftTop"
        >
          <div style={{ background: 'gray', width: '200px' }}>leftTop</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={content}
          placement="center"
        >
          <div style={{ background: 'gray', width: '200px' }}>center</div>
        </Popover>
        <br />
        <Popover
          {...args}
          content={content}
          placement="centerScreen"
        >
          <div style={{ background: 'gray', width: '200px' }}>centerScreen</div>
        </Popover>
      </div>
    </JukiBaseUiProvider>
  );
};

export const PopoverNormal = Template.bind({});

PopoverNormal.args = {
  // readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<Popover Props, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};
