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
          <div className="jk-row gap">
            {[
              'jk-row',
              'jk-row left',
              'jk-row center',
              'jk-row right',
              'jk-row space-between',
              'jk-row block',
              'jk-row stretch',
              'jk-row block stretch',
              'jk-row left top',
              'jk-row left bottom',
              'jk-row center top',
              'jk-row center bottom',
              'jk-row right top',
              'jk-row right bottom',
            ].map(col => (
              <div className="jk-row gap jk-shadow jk-pad jk-border-radius-inline text-bold color-white" style={{ width: '420px' }}>
                <pre className="color-gray-1">{col}</pre>
                <div className={col} style={{ width: '240px', height: '50px', background: 'var(--t-color-gray-6)' }}>
                  <div style={{ border: '2px solid red' }}>
                    <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                  </div>
                  <div style={{ border: '2px solid blue' }}>
                    <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                  </div>
                  <div style={{ border: '2px solid green' }}>
                    <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="jk-row gap">
            {[
              'jk-col',
              'jk-col top',
              'jk-col center',
              'jk-col bottom',
              'jk-col space-between',
              'jk-col block',
              'jk-col stretch',
              'jk-col block stretch',
              'jk-col top left',
              'jk-col top right',
              'jk-col center left',
              'jk-col center right',
              'jk-col bottom left',
              'jk-col bottom right',
            ].map(col => (
              <div className="jk-row gap jk-shadow jk-pad jk-border-radius-inline text-bold color-white" style={{ width: '320px' }}>
                <pre className="color-gray-1">{col}</pre>
                <div className={col} style={{ width: '80px', height: '150px', background: 'var(--t-color-gray-6)' }}>
                  <div style={{ border: '2px solid red' }}>
                    <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                  </div>
                  <div style={{ border: '2px solid blue' }}>
                    <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                  </div>
                  <div style={{ border: '2px solid green' }}>
                    <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
                  </div>
                </div>
              </div>
            ))}
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
