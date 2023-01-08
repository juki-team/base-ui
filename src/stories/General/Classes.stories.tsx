import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { ToggleThemeButton } from '../ToggleThemeButton';
import { Tabs as TabsComponent, TabsProps } from '../../index';

export default {
  title: 'Components/General/Classes',
  component: TabsComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Classes: Story<TabsProps<string>> = () => {
  const tabs = [
    {
      key: '1',
      header: <div>rows</div>,
      body: (
        <div className="jk-col gap">
          <h1>displaying rows</h1>
          <p>works correctly when container has height and width defined</p>
          <div className="jk-row gap">
            {[
              'jk-row',
              'jk-row extend',
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
              <div className="jk-col elevation-1 jk-pad-md jk-border-radius-inline cr-we" style={{ width: '420px' }}>
                <pre className="cr-g1">"{col}"</pre>
                <div style={{ width: 250, height: 60 }} className="bc-g6 fw-br">
                  <div className={col} style={{ outline: '2px solid red', width: 220, height: 50 }}>
                    <div style={{ border: '4px solid red' }}>
                      <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                    </div>
                    <div style={{ border: '4px solid blue' }}>
                      <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                    </div>
                    <div style={{ border: '4px solid green' }}>
                      <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '2',
      header: <div>columns</div>,
      body: (
        <div className="jk-col gap">
          <h1>displaying columns</h1>
          <p>works correctly when container has height and width defined</p>
          <div className="jk-row gap">
            {[
              'jk-col',
              'jk-col extend',
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
              <div className="jk-row gap elevation-1 jk-pad-md jk-border-radius-inline cr-we" style={{ width: '320px' }}>
                <pre className="cr-g1">"{col}"</pre>
                <div style={{ width: 80, height: 150 }} className="bc-g6 fw-br">
                  <div className={col} style={{ outline: '2px solid red', width: 70, height: 120 }}>
                    <div style={{ border: '4px solid red' }}>
                      <div style={{ width: '50px', height: '20px', background: 'red' }}>1</div>
                    </div>
                    <div style={{ border: '4px solid blue' }}>
                      <div style={{ width: '50px', height: '20px', background: 'blue' }}>2</div>
                    </div>
                    <div style={{ border: '4px solid green' }}>
                      <div style={{ width: '50px', height: '20px', background: 'green' }}>2</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '3',
      header: <div>color</div>,
      body: (
        <div className="jk-col gap">
          <h1>color</h1>
          <div className="jk-row gap">
            {[
              'cr-g1',
              'cr-g2',
              'cr-g3',
              'cr-g4',
              'cr-g5',
              'cr-g6',
              'cr-we',
              'cr-io',
              'cr-ss',
              'cr-wg',
              'cr-er',
              'cr-pl',
              'cr-py',
              'cr-pd',
              'cr-sy',
              'cr-al',
              'cr-at',
              'cr-ad',
            ].map(color => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: '140px' }}>
                <pre>"{color}"</pre>
                <div className={'fw-br ' + color}>text</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '4',
      header: <div>background color</div>,
      body: (
        <div className="jk-col gap">
          <h1>background color</h1>
          <div className="jk-row gap">
            {[
              'bc-g1',
              'bc-g2',
              'bc-g3',
              'bc-g4',
              'bc-g5',
              'bc-g6',
              'bc-we',
              'bc-io',
              'bc-ss',
              'bc-wg',
              'bc-er',
              'bc-pl',
              'bc-py',
              'bc-pd',
              'bc-sy',
              'bc-al',
              'bc-at',
              'bc-ad',
            ].map(color => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: '140px' }}>
                <pre>"{color}"</pre>
                <div className={color}>&nbsp;text&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '5',
      header: <div>font size</div>,
      body: (
        <div className="jk-col gap">
          <h1>font size</h1>
          <div className="jk-row gap">
            {[
              'tx-h',
              'tx-l',
              'tx-m',
              'tx-s',
              'tx-t',
            ].map(size => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: '140px' }}>
                <pre>"{size}"</pre>
                <div className={size}>&nbsp;text&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '6',
      header: <div>font width</div>,
      body: (
        <div className="jk-col gap">
          <h1>font size</h1>
          <div className="jk-col gap">
            {[
              'fw-lr',
              'fw-nl',
              'fw-bd',
              'fw-br',
            ].map(width => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: '140px' }}>
                <pre>"{width}"</pre>
                <div className={width}>&nbsp;text&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '7',
      header: <div>text transform</div>,
      body: (
        <div className="jk-col gap">
          <h1>text transform</h1>
          <div className="jk-col gap">
            {[
              'tt-se',
              'tt-ce',
              'tt-ue',
              'tt-le',
            ].map(tt => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: 350 }}>
                <pre>"{tt}"</pre>
                <div className={'ws-np ' + tt}>&nbsp;Lorem ipsum dolor sit amet&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '8',
      header: <div>text-align</div>,
      body: (
        <div className="jk-col gap">
          <h1>text-align</h1>
          <div className="jk-col gap">
            {[
              'ta-cr',
              'ta-st',
              'ta-ed',
            ].map(tt => (
              <div className="jk-row gap nowrap elevation-1 jk-pad-md jk-border-radius-inline" style={{ width: 420 }}>
                <pre>"{tt}"</pre>
                <div className={'ws-np ' + tt} style={{ width: 400 }}>&nbsp;Lorem ipsum dolor sit amet&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '9',
      header: <div>box-shadow</div>,
      body: (
        <div className="jk-col gap">
          <h1>text-align</h1>
          <div className="jk-col gap">
            {[
              'jk-shadow huge',
              'jk-shadow large',
              'jk-shadow regular',
              'jk-shadow small',
              'jk-shadow tiny',
            ].map(tt => (
              <div className="jk-row gap nowrap jk-pad-md jk-border-radius-inline" style={{ width: 420 }}>
                <pre>"{tt}"</pre>
                <div className={'ws-np ' + tt} style={{ width: 400 }}>&nbsp;Lorem ipsum dolor sit amet&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '10',
      header: <div>elevation</div>,
      body: (
        <div className="jk-col gap">
          <h1>text-align</h1>
          <div className="jk-col gap">
            {[
              'elevation-1',
              'elevation-2',
              'elevation-3',
              'elevation-4',
              'elevation-5',
              'elevation-6'
            ].map(tt => (
              <div className="jk-row gap nowrap jk-pad-md jk-border-radius-inline" style={{ width: 420 }}>
                <pre>"{tt}"</pre>
                <div className={'ws-np ' + tt} style={{ width: 400 }}>&nbsp;Lorem ipsum dolor sit amet&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div style={{ height: '500px' }}>
      <TabsComponent tabs={tabs} />
      <ToggleThemeButton />
    </div>
  );
};
