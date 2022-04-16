import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { JukiBaseUiProvider, Tabs, TabsProps } from '../index';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<TabsProps> = () => {
  const tabs = [
    {
      children: <div>JK-ROW</div>,
    },
    {
      children: <div>JK-COL</div>,
    },
    {
      children: <div>3</div>,
    },
  ];
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://prod-v1-utils-back.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
    >
      <div style={{ height: '500px' }}>
        <Tabs tabHeaders={tabs}>
          <div>
            <div style={{ width: '500px', height: '500px', background: 'gray' }}>
              jk-row
              <div className="jk-row" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row start
              <div className="jk-row start" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row center
              <div className="jk-row center" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row end
              <div className="jk-row end" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row block
              <div className="jk-row block" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row space-between
              <div className="jk-row space-between" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-row filled
              <div className="jk-row filled" style={{ height: '40px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
            </div>
          </div>
          <div>
            <div className="jk-row" style={{ width: '1200px', height: '400px', background: 'gray' }}>
              jk-col
              <div className="jk-col" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col start
              <div className="jk-col start" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col center
              <div className="jk-col center" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col end
              <div className="jk-col end" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col block
              <div className="jk-col block" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col space-between
              <div className="jk-col space-between" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
              jk-col filled
              <div className="jk-col filled" style={{ width: '60px', height: '100px', background: 'dimgray' }}>
                <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
              </div>
            </div>
          </div>
          <div> CONTENT 3</div>
        </Tabs>
      </div>
    </JukiBaseUiProvider>
  );
};

export const TabsNormal = Template.bind({});

TabsNormal.args = {
  // readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<TabsProps, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};
